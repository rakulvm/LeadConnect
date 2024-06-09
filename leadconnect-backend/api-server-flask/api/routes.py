# -*- encoding: utf-8 -*-

"""
export FLASK_APP=run.py
export FLASK_ENV=development
flask run

"""
import os
from datetime import datetime, timezone, timedelta

from functools import wraps

from flask import request, url_for,send_from_directory,send_file
from werkzeug.utils import secure_filename
from flask_restx import Api, Resource, fields

import pandas as pd
import jwt

from .models import db, Users, JWTTokenBlocklist, Contact, Experience,Connection
from .config import BaseConfig
import requests
import uuid
import random
# import json
from .smtp import send_email_to_admin,send_confirmation_link_to_user
import traceback
# from .mock import youth_data, split_youth_name
from io import BytesIO


rest_api = Api(version="1.0", title="Users API")

"""
    Flask-Restx models for api request and response data
"""
"""
signup_model = rest_api.model('SignUpModel', {"email_address": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16),
                                              "first_name": fields.String(required=True, min_length=2, max_length=32),
                                              "last_name": fields.String(required=True, min_length=2, max_length=32),
                                              "license_number": fields.String(required=False, min_length=1, max_length=50),
                                              "date_of_birth": fields.Date(required=True),
                                              "last_four_ssn": fields.String(required=True, min_length=4, max_length=4),
                                              "security_question": fields.String(required=True, min_length=2, max_length=255),
                                              "security_question_answer": fields.String(required=True, min_length=2, max_length=255),
                                              "user_type": fields.String(required=True, min_length=1, max_length=1)
                                              })
"""
signup_model = rest_api.model('SignupModel', {
    'username': fields.String(required=True, description='User login name'),
    'password': fields.String(required=True, description='User password'),
    'email': fields.String(required=True, description='User email address'),
    'first_name': fields.String(required=True, description='User first name'),
    'last_name': fields.String(required=True, description='User last name'),
    'phone_number': fields.String(description='User contact number'),
    'company': fields.String(description='User company name'),
    'number_of_employees': fields.String(description='Number of employees in the company', enum=['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001-10000', '10001+']),
    'province': fields.String(required=True, description='User province in Canada', enum=['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan']),
    'profile_picture_url': fields.String(description='URL to the user’s profile picture'),
    'security_question': fields.String(required=True, description='Security question for password recovery', enum=['What is your mother’s maiden name?', 'What was the name of your first pet?', 'What was the make of your first car?', 'What is your favorite color?', 'What city were you born in?']),
    'security_answer': fields.String(required=True, description='Answer to the security question')
})
login_model = rest_api.model('LoginModel', {"email": fields.String(required=True),
                                              "password": fields.String(required=True)
                                            })

user_edit_model = rest_api.model('UserEditModel', {"user_id": fields.String(required=True, min_length=1, max_length=50),
                                                   "first_name": fields.String(required=True, min_length=2, max_length=32),
                                                    "last_name": fields.String(required=True, min_length=2, max_length=32),
                                                   "email_address": fields.String(required=True, min_length=4, max_length=64)
                                                   })

contact_model = rest_api.model('Contact', {
    'contact_url': fields.String(required=True, description='Contact URL'),
    'name': fields.String(required=True, description='Name'),
    'current_location': fields.String(required=True, description='Current Location'),
    'headline': fields.String(required=True, description='Headline'),
    'about': fields.String(required=True, description='About'),
    'profile_pic_url': fields.String(required=True, description='Profile Picture URL')
})

experience_model = rest_api.model('Experience', {
    'id': fields.Integer(readOnly=True, description='The unique identifier of the experience'),
    'contact_url': fields.String(required=True, description='Contact URL'),
    'company_name': fields.String(required=True, description='Company Name'),
    'company_role': fields.String(required=True, description='Company Role'),
    'company_location': fields.String(required=True, description='Company Location'),
    'bulletpoints': fields.String(required=True, description='Bullet Points'),
    'company_duration': fields.String(required=True, description='Company Duration'),
    'company_total_duration': fields.String(required=True, description='Company Total Duration')
})

"""
   Helper function for JWT token required
"""
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email_address(data["email"])
            print(current_user)
            if not current_user:
                return {"success": False, "msg": "User does not exist"}, 400

            kwargs['current_user'] = current_user

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except jwt.ExpiredSignatureError:
            return {"success": False, "msg": "Token expired. Please log in again."}, 401
        except jwt.InvalidTokenError:
            return {"success": False, "msg": "Invalid token. Please log in again."}, 401
        except Exception as e:
            print(traceback.format_exc())
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(*args, **kwargs)

    return decorator


@rest_api.route('/api/auth/check')
class TokenCheck(Resource):
    @token_required
    def get(self, current_user):
        # If this point is reached, the token is valid
        return {"success": True, "msg": "Token is valid", "user_id": current_user.id}, 200
    
@rest_api.route('/api/users/register')
class Register(Resource):
    @rest_api.expect(signup_model, validate=True)
    def post(self):
        req_data = request.get_json()
        username = req_data.get("username")
        password = req_data.get("password")
        email = req_data.get("email")
        first_name = req_data.get("first_name")
        last_name = req_data.get("last_name")
        phone_number = req_data.get("phone_number")
        company = req_data.get("company")
        number_of_employees = req_data.get("number_of_employees")
        province = req_data.get("province")
        profile_picture_url = req_data.get("profile_picture_url")
        security_question = req_data.get("security_question")
        security_answer = req_data.get("security_answer")        
        user_exists = Users.get_by_email(email)
        if user_exists:
            return {"success": False, "msg": "User already exists"}, 400

        new_user = Users(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            company=company,
            number_of_employees=number_of_employees,
            province=province,
            profile_picture_url=profile_picture_url,
            security_question=security_question,
            security_answer=security_answer,
            status=1,  # Assuming 1 means 'active'
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        new_user.save()

        return {"status": "success", "userID": new_user.user_id, "msg": "The user was successfully registered"}, 201

    
"""
    Flask-Restx routes
"""

"""
@rest_api.route('/api/users/register')
class Register(Resource):
#       Creates a new user by taking 'signup_model' input

    def extract_date_components(date_str):
        return day, month, year
        
    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _first_name = req_data.get("first_name")
        _last_name = req_data.get("last_name")
        _email_address = req_data.get("email_address")
        _password = req_data.get("password")
        _license_number = req_data.get("license_number")
        _password = req_data.get("password")
        date_str = req_data.get("date_of_birth")
        year = date_str.split('-')[0]
        month = date_str.split('-')[1]
        day = date_str.split('-')[2]
        _date_of_birth = f"{year}-{month}-{day}"
        _last_four_ssn = req_data.get("last_four_ssn")
        _security_question = req_data.get("security_question")
        _security_question_answer = req_data.get("security_question_answer")
        _user_type = req_data.get("user_type")

        user_exists = Users.get_by_email_address(_email_address)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400      
        # Extract day, month, and year from the date of birth using the generic method
        _user_id = str(uuid.uuid4())
        _is_authenticated = str(0);
        _is_user_loggedin = str(0);
        _pin = ''.join([str(random.randint(0, 9)) for _ in range(4)])
        
        new_user = Users(email_address=_email_address, first_name=_first_name, last_name=_last_name, license_number=_license_number, date_of_birth=_date_of_birth, last_four_ssn=_last_four_ssn, security_question=_security_question, security_question_answer=_security_question_answer, user_id=_user_id, is_authenticated=_is_authenticated, is_user_loggedin=_is_user_loggedin, pin=_pin,user_type=_user_type)
        new_user.set_password(_password)
        
        db.session.add(new_user)
        db.session.commit()
        new_user.save()
        _verification_link = BaseConfig.VERIFICATION_LINK.format(user_id=_user_id)
        send_email_to_admin(_email_address, _first_name, _last_name, _pin)
        send_confirmation_link_to_user(_email_address, _first_name, _last_name, _verification_link)
        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200

"""

@rest_api.route('/api/user/forgot-password')
class ForgotPassword(Resource):

    def post(self):
        req_data = request.get_json()
        _email_address = req_data.get("email")
        user_exists = Users.get_by_email(_email_address)
        
        if user_exists:
            # Assuming your Users model has a security_question field
            return {"status": "success", "security_question": user_exists.security_question}
        else:
            return {"status": "failed", "msg": "User does not exist."}, 404
        
@rest_api.route('/api/user/reset-password')
class ResetPassword(Resource):

    @rest_api.expect(login_model, validate=True)
    def post(self):
        try:
            req_data = request.get_json()
            _email_address = req_data.get("email")
            _security_question = req_data.get("security_question")
            _security_question_answer = req_data.get("security_answer")
            _password = req_data.get("password")
            
            user_exists = Users.get_by_email_address(_email_address)
            
            if user_exists:
                # Validate security question and answer
                if user_exists.security_question == _security_question and user_exists.security_question_answer == _security_question_answer:
                    user_exists.is_authenticated = 0
                    _pin = ''.join([str(random.randint(0, 9)) for _ in range(4)])
                    user_exists.set_password(_password)

                    user_exists.pin = _pin
                    db.session.commit()

                    _verification_link = BaseConfig.VERIFICATION_LINK.format(user_id=user_exists.user_id)

                    send_email_to_admin(_email_address, user_exists.first_name, user_exists.last_name, _pin)
                    send_confirmation_link_to_user(_email_address, user_exists.first_name, user_exists.last_name, _verification_link)
                    return {"status": "success", "msg": "Password reset success. Please get the PIN from the admin to verify the authentication."}, 200
                else:
                    return {"status": "failed", "msg": "Invalid security question or answer."}, 401
            else:
                return {"status": "failed", "msg": "User does not exist."}, 404
        except Exception as e:
            # Handle database errors
            print(traceback.format_exc())
            return {"status": "failed", "msg": "Error occured contact the admin."}, 500

        
@rest_api.route('/api/users/verify')
class Verify(Resource):
    """
    Verify user by taking 'login_model' input and return JWT token
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email_address = req_data.get("email")
        _password = req_data.get("password")
        _pin = req_data.get("pin")
        user_exists = Users.get_by_email(_email_address)

        if not user_exists:
            return {"success": False, "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400
        
        if user_exists.is_authenticated == 0:
            if str(user_exists.pin) != str(_pin):
                return {"success": False, "msg": "You have entered an invalid PIN. Please check with the admin for a valid PIN."}, 401
            else:
                # Update the is_authenticated to 1 in the db
                user_exists.is_authenticated = 1
                db.session.commit()  # Make sure to commit the changes to the database

                # create access token using JWT
                token = jwt.encode({'email': _email_address, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

                user_exists.set_jwt_auth_active(True)
                user_exists.save()

                return {"success": True, "token": token, "user": user_exists.toJSON()}, 200
        else:
            return {"success": False, "msg": "You are already authenticated."}, 401

""""""
@rest_api.route('/api/users/login')
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """
    @rest_api.expect(login_model, validate=True)
    def post(self):
        req_data = request.get_json()

        email_address = req_data.get("email")
        password = req_data.get("password")
        user_exists = Users.get_by_email(email_address)
        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        # Add this check for is_authenticated
    #    if user_exists.is_authenticated == 0:
    #        return {"success": False, "msg": "You are not authenticated. Please verify your email by using the verification link sent to your email."}, 401

        if not user_exists.check_password(password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400
        
        
         # create access token uwing JWT
        token = jwt.encode({'email': email_address, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200
 


@rest_api.route('/api/users')
class UserList(Resource):
    """
       List all user names
    """
    def get(self):
        users = Users.query.all()
        user_names = [user.name for user in users]
        return {"success": True, "user_names": user_names}, 200
    
# Function to convert date to "mm/dd/yyyy" format
def format_date(dt):
    if pd.isnull(dt):
        return None  # Return None if the date is NaT
    return dt.strftime("%m/%d/%Y")  # Format datetime to "mm/dd/yyyy"

# Convert date strings to the 'YYYY-MM-DD' format
def convert_date(date_str):
    return datetime.strptime(date_str, '%m/%d/%Y').strftime('%Y-%m-%d')

"""
def store_to_mysql(json_data):
    # Iterate through the JSON data and insert into the table
    try:

        total_duplicates = 0
        total_inserted = 0
        total_failed = 0
        for row in json_data:
            try:
                # Create a new YouthServices object
                if not YouthServices.query.filter_by(auth_id=row["auth_id"]).first():
                    youth_service = YouthServices(
                        auth_id=row["auth_id"],
                        cyber_id=row["cyber_id"],
                        youth_name=row["youth_name"],
                        dob=convert_date(row["dob"]),
                        youth_county=row["youth_county"],
                        medicaid=row["medicaid"],
                        units=row["units"],
                        service_code=row["service_code"],
                        description=row["description"],
                        start_date=convert_date(row["start_date"]),
                        end_date=convert_date(row["end_date"]),
                        create_date=convert_date(row["create_date"]),
                        youth_first_name=row["youth_first_name"],
                        youth_last_name=row["youth_last_name"]
                    )
                    # Add the YouthServices object to the session
                    db.session.add(youth_service)
                    total_inserted += 1
                else:
                    total_duplicates += 1
            except Exception as e:
                print(traceback.format_exc())
                total_failed += 1
        # Commit changes to the database
        db.session.commit()
    except Exception as e:
        # Rollback changes if an error occurs
        db.session.rollback()

        total_failed = len(json_data)
        print(traceback.format_exc())
        return {
            "total_duplicates": total_duplicates,
            "total_inserted": total_inserted,
            "total_failed": total_failed
        }
"""

@rest_api.route('/api/sef/pdf_upload')
class upload_file(Resource):
    """
    Upload pdf
    """
    # @token_required
    def post(self, **kwargs):
        try:
            if 'file' not in request.files:
                return {'success': False, 'message': 'No file part in the request'}, 400

            file = request.files['file']
            if file.filename == '':
                return {'success': False, 'message': 'No selected file'}, 400

            if file and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in ['pdf']:
                filename = secure_filename(file.filename)
                basedir = os.path.abspath(os.path.dirname(__file__))
                upload_path = os.path.join(basedir, rest_api.app.config['UPLOAD_FOLDER'])
                file.save(os.path.join(upload_path, filename))  # Directly use 'upload_path' here
                file_url = url_for('static', filename=os.path.join('pdfs', filename), _external=True)
                return {'success': True, 'file_url': file_url}, 200
            else:
                return {'success': False, 'message': 'Invalid file type'}, 400
        except Exception as e:
            print(traceback.format_exc())
            return {"message": "Some error occured: {}".format(str(e))}, 500

@rest_api.route('/api/sef/pdf/<filename>', methods=['GET'])
class upload_file(Resource):
    """
    Download a pdf
    """
    # @token_required
    def get(self, filename):
        try:
            filename = filename+".pdf"
            # Ensure the file exists
            basedir = os.path.abspath(os.path.dirname(__file__))
            upload_path = os.path.join(basedir, rest_api.app.config['UPLOAD_FOLDER'])
            if not os.path.exists(os.path.join(upload_path, filename)):
                return {'success': False, 'message': 'File does not exist'}, 404

            # Check if the file is a PDF
            if '.' in filename and filename.rsplit('.', 1)[1].lower() == 'pdf':
                # Directly pass 'upload_path' and 'filename' to 'send_from_directory'
                return send_from_directory(upload_path, filename, as_attachment=False)
            else:
                return {'success': False, 'message': 'Invalid file type'}, 400
        except Exception as e:
            print(traceback.format_exc())
            print(f"An error occurred: {str(e)}")
            return {"success": False, "message": "An error occurred"}, 500
        
# end of the create SEF
@rest_api.route('/api/users/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    @token_required
    def post(self, current_user):

        req_data = request.get_json()

        _new_first_name = req_data.get("first_name")
        _new_last_name = req_data.get("last_name")
        _new_email_address = req_data.get("email_address")

        if _new_first_name:
            self.update_first_name(_new_first_name)

        if _new_last_name:
            self.update_last_name(_new_last_name)

        if _new_email_address:
            self.update_email_address(_new_email_address)

        self.save()

        return {"success": True}, 200


@rest_api.route('/api/users/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        current_user.set_jwt_auth_active(False)
        db.session.commit() 

        return {"success": True}, 200

@rest_api.route('/api/sessions/oauth/github/')
class GitHubLogin(Resource):
    def get(self):
        code = request.args.get('code')
        client_id = BaseConfig.GITHUB_CLIENT_ID
        client_secret = BaseConfig.GITHUB_CLIENT_SECRET
        root_url = 'https://github.com/login/oauth/access_token'

        params = { 'client_id': client_id, 'client_secret': client_secret, 'code': code }

        data = requests.post(root_url, params=params, headers={
            'Content-Type': 'application/x-www-form-urlencoded',
        })

        response = data._content.decode('utf-8')
        access_token = response.split('&')[0].split('=')[1]

        user_data = requests.get('https://api.github.com/user', headers={
            "Authorization": "Bearer " + access_token
        }).json()
        
        user_exists = Users.get_by_first_name(user_data['login'])
        if user_exists:
            user = user_exists
        else:
            try:
                user = Users(username=user_data['login'], email=user_data['email'])
                user.save()
            except:
                user = Users(username=user_data['login'])
                user.save()
        
        user_json = user.toJSON()

        token = jwt.encode({"username": user_json['username'], 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)
        user.set_jwt_auth_active(True)
        user.save()

        return {"success": True,
                "user": {
                    "_id": user_json['_id'],
                    "email": user_json['email'],
                    "username": user_json['username'],
                    "token": token,
                }}, 200

#--------------REDUNDANT CODE START----------------------------
#CONTACTS APIS
#CONTACTS ROUTE ge
@rest_api.route('/api/contacts')
class ContactList(Resource):
    @rest_api.marshal_list_with(contact_model)
    def get(self):
        """List all contacts"""
        contacts = Contact.get_all()
        return contacts, 200

    @rest_api.expect(contact_model, validate=True)
    @rest_api.marshal_with(contact_model, code=201)
    def post(self):
        """Create a new contact"""
        data = request.get_json()
        new_contact = Contact(
            contact_url=data['contact_url'],
            name=data['name'],
            current_location=data['current_location'],
            headline=data['headline'],
            about=data['about'],
            profile_pic_url=data['profile_pic_url']
        )
        # new_contact.save()
        return new_contact, 201
# wont work FOR NOW below three apis 
@rest_api.route('/api/contacts/<string:contact_url>')
class ContactResource(Resource):
    @rest_api.marshal_with(contact_model)
    def get(self, contact_url):
        """Get a contact by contact URL"""
        contact = Contact.get_by_contact_url(contact_url)
        if not contact:
            rest_api.abort(404, "Contact not found")
        return contact, 200

    @rest_api.expect(contact_model, validate=True)
    @rest_api.marshal_with(contact_model)
    def put(self, contact_url):
        """Update a contact by contact URL"""
        data = request.get_json()
        contact = Contact.get_by_contact_url(contact_url)
        if not contact:
            rest_api.abort(404, "Contact not found")
        contact.update_name(data.get('name'))
        contact.update_current_location(data.get('current_location'))
        contact.update_headline(data.get('headline'))
        contact.update_about(data.get('about'))
        contact.update_profile_pic_url(data.get('profile_pic_url'))
        return contact, 200

    def delete(self, contact_url):
        """Delete a contact by contact URL"""
        contact = Contact.get_by_contact_url(contact_url)
        if not contact:
            rest_api.abort(404, "Contact not found")
        contact.delete()
        return '', 204
# wont work till this section 
# CONTACTS API END

#Experience  model

# experience routes not tested mostly wont work
@rest_api.route('/api/experiences')
class ExperienceList(Resource):
    @rest_api.marshal_list_with(experience_model)
    def get(self):
        """List all experiences"""
        experiences = Experience.get_all()
        return experiences, 200

    @rest_api.expect(experience_model, validate=True)
    @rest_api.marshal_with(experience_model, code=201)
    def post(self):
        """Create a new experience"""
        data = request.get_json()
        new_experience = Experience(
            contact_url=data['contact_url'],
            company_name=data['company_name'],
            company_role=data['company_role'],
            company_location=data['company_location'],
            bulletpoints=data['bulletpoints'],
            company_duration=data['company_duration'],
            company_total_duration=data['company_total_duration']
        )
        new_experience.save()
        return new_experience, 201

@rest_api.route('/api/experiences/<int:id>')
class ExperienceResource(Resource):
    @rest_api.marshal_with(experience_model)
    def get(self, id):
        """Get an experience by ID"""
        experience = Experience.get_by_id(id)
        if not experience:
            rest_api.abort(404, "Experience not found")
        return experience, 200

    @rest_api.expect(experience_model, validate=True)
    @rest_api.marshal_with(experience_model)
    def put(self, id):
        """Update an experience by ID"""
        data = request.get_json()
        experience = Experience.get_by_id(id)
        if not experience:
            rest_api.abort(404, "Experience not found")
        experience.update_company_name(data.get('company_name'))
        experience.update_company_role(data.get('company_role'))
        experience.update_company_location(data.get('company_location'))
        experience.update_bulletpoints(data.get('bulletpoints'))
        experience.update_company_duration(data.get('company_duration'))
        experience.update_company_total_duration(data.get('company_total_duration'))
        return experience, 200

    def delete(self, id):
        """Delete an experience by ID"""
        experience = Experience.get_by_id(id)
        if not experience:
            rest_api.abort(404, "Experience not found")
        experience.delete()
        return '', 204
# experience routes not tested mostly wont work
#--------------REDUNDANT CODE END----------------------------

# route to add using a user id to all tables experiences.
@rest_api.route('/api/createcontact')
class ExtensionResource(Resource):
    # @rest_api.expect(contact_model, validate=True) -- if you keep this it expects that json object is exact model shape
    # @rest_api.marshal_with(contact_model, code=201)  # needed this for serializability
    @token_required
    def post(self,current_user):
        current_user_id = current_user.user_id
        data = request.get_json()
        # Hanlde contact if existin
        existing_contact = Contact.get_by_contact_url(data['url'])
        if(existing_contact):
            # Contact Exist
            existing_contact.update_name(data['name'])
            existing_contact.update_headline(data['headline'])
            existing_contact.update_current_location(data['location'])
            existing_contact.update_profile_pic_url(data['profilePicture'])
            existing_contact.update_about(data['about'])
        else:
            # Contact doesnt exist in the databse
            """Create a new contact"""
            new_contact = Contact(
                contact_url= data['url'],
                name=data['name'],
                headline=data['headline'],
                current_location=data['location'],
                profile_pic_url=data['profilePicture'],
                about=data['about'],
            )
            new_contact.save()

        # Connection doesnt exist in the database
        # update connection table 

        new_connection = Connection.get_by_connection(current_user_id, data['url'])
        if(not new_connection):
            new_connection=Connection(
                user_id = current_user_id,
                contact_url = data['url']
            )
            new_connection.save()



        # Clear exisitng experiences if any
        current_experiences = Experience.get_by_contact_url(data['url'])
        for current_experience in current_experiences:
            current_experience.delete()

        # Process the experience list
        experiences = data.get('experience', [])
        # Create experience table
        experience_object = []
        for company in experiences:
            # print(company)
            # break
            for position in company['companyPositions']:
                # print("JIVIN")
                # print(position)
                # break
                experience =Experience (
                    contact_url= new_connection.contact_url,
                    company_name = company.get("CompanyName") or company.get("companyName"),
                    company_role = position.get("CompanyRole") or position.get("companyRole"),
                    # company_role = position["CompanyRole"],
                    company_location = position["companyLocation"],
                    bulletpoints = position["bulletPoints"],
                    company_duration = position["companyDuration"],
                    company_total_duration = position["companyTotalDuration"]
                    
                )
                experience.save()
                
                experience_object.append(experience.toDICT())
                # print(experience_object)
        return experience_object, 201