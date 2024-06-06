# -*- encoding: utf-8 -*-
from datetime import datetime,timezone
import json


from werkzeug.security import generate_password_hash, check_password_hash

from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import Column, Integer, String, Date, TIMESTAMP, func, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

db = SQLAlchemy()

"""
class Users(db.Model):
    __tablename__ = 'users_v2'
    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    license_number = db.Column(db.String(50))
    date_of_birth = db.Column(db.Date, nullable=False)
    last_four_ssn = db.Column(db.String(4), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    security_question = db.Column(db.String(255), nullable=False)
    security_question_answer = db.Column(db.String(255), nullable=False)
    user_added_date = db.Column(db.TIMESTAMP, server_default=db.func.now())
    jwt_auth_active = db.Column(db.Boolean())
    user_details_updated_date = db.Column(db.TIMESTAMP, server_default=db.func.now(), onupdate=db.func.current_timestamp())
    pin = db.Column(db.String(4), nullable=True)
    is_authenticated = db.Column(db.Integer, nullable=True)
    is_user_loggedin = db.Column(db.Integer, nullable=True)
    user_id = db.Column(db.String(50), unique=True)
    user_type = db.Column(db.Integer, nullable=True)
    status = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"User {self.first_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_email_address(self, new_email):
        self.email_address = new_email

    # def update_username(self, new_username):
    #     self.username = new_username

    def update_first_name(self, new_first_name):
        self.first_name = new_first_name

    def update_last_name(self, new_last_name):
        self.last_name = new_last_name

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return db.session.query(cls).get_or_404(id)

    @classmethod
    def get_by_email_address(cls, email):
        return db.session.query(cls).filter_by(email_address=email).first()
        
    @classmethod
    def get_by_first_name(cls, first_name):
        return db.session.query(cls).filter_by(first_name=first_name).first()
    
    @classmethod
    def get_by_last_name(cls, last_name):
        return db.session.query(cls).filter_by(last_name=last_name).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['id'] = self.id
        cls_dict['first_name'] = self.first_name
        cls_dict['last_name'] = self.last_name
        cls_dict['email_address'] = self.email_address
        cls_dict['license_number'] = self.license_number
        cls_dict['last_four_ssn'] = self.last_four_ssn
        cls_dict['user_id'] = self.user_id
        cls_dict['status'] = self.status
        cls_dict['is_authenticated'] = self.is_authenticated
        cls_dict['user_type'] = self.user_type
        cls_dict['is_user_loggedin'] = self.is_user_loggedin
        return cls_dict

    def toJSON(self):

        return self.toDICT()
"""

class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20))
    company = db.Column(db.String(255))
    number_of_employees = db.Column(db.Enum('1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5001-10000', '10001+'))
    province = db.Column(db.Enum('Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'), nullable=False)
    profile_picture_url = db.Column(db.String(255))
    security_question = db.Column(db.Enum('What is your mother’s maiden name?', 'What was the name of your first pet?', 'What was the make of your first car?', 'What is your favorite color?', 'What city were you born in?'), nullable=False)
    security_answer = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Integer, nullable=False)  # To indicate the status of the user
    created_at = db.Column(db.TIMESTAMP, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.TIMESTAMP, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def update_email(self, new_email):
        self.email = new_email

    def update_first_name(self, new_first_name):
        self.first_name = new_first_name

    def update_last_name(self, new_last_name):
        self.last_name = new_last_name

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return db.session.query(cls).get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return db.session.query(cls).filter_by(email=email).first()

    @classmethod
    def get_by_username(cls, username):
        return db.session.query(cls).filter_by(username=username).first()

    def toDICT(self):
        cls_dict = {}
        cls_dict['user_id'] = self.user_id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email
        cls_dict['first_name'] = self.first_name
        cls_dict['last_name'] = self.last_name
        cls_dict['phone_number'] = self.phone_number
        cls_dict['company'] = self.company
        cls_dict['number_of_employees'] = self.number_of_employees
        cls_dict['province'] = self.province
        cls_dict['profile_picture_url'] = self.profile_picture_url
        cls_dict['security_question'] = self.security_question
        cls_dict['security_answer'] = self.security_answer
        cls_dict['created_at'] = self.created_at.isoformat() if self.created_at else None,
        cls_dict['updated_at'] = self.updated_at.isoformat() if self.updated_at else None,
        cls_dict['status'] = self.status
        return cls_dict
        
    def toJSON(self):

        return self.toDICT()

class JWTTokenBlocklist(Base):
    __tablename__ = 'users_session'
    id = db.Column(db.Integer, primary_key=True)
    jwt_token = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False)


    def __repr__(self):
        return f"Expired Token: {self.jwt_token}"

    def save(self):
        db.session.add(self)
        db.session.commit()


# CREATE TABLE users_session (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     jwt_token VARCHAR(200) NOT NULL,
#     created_at db.TIMESTAMP NOT NULL
# );