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
Users model representing a user in the system.

Attributes:
    user_id: Unique identifier for the user.
    username: Username of the user.
    password_hash: Hashed password for the user.
    email: Email address of the user.
    first_name: First name of the user.
    last_name: Last name of the user.
    phone_number: Phone number of the user.
    company: Company name associated with the user.
    number_of_employees: Enum representing the number of employees in the user's company.
    province: Enum representing the province the user resides in.
    profile_picture_url: URL to the user's profile picture.
    security_question: Enum representing the security question for the user.
    security_answer: Answer to the security question.
    status: Status of the user.
    created_at: Timestamp when the user was created.
    updated_at: Timestamp when the user was last updated.
    connections: One-to-many relationship with the Connection model.
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
    my_resume_content = db.Column(db.Text, nullable=True, default='')  # New field added
    # One-to-many relationship with Connection
    connections = db.relationship('Connection', backref='user', lazy=True, cascade='all, delete')
    subscription = db.Column(
        db.Enum('Free Tier', 'Business Tier', 'Enterprise Tier'),
        nullable=False,
    )

    def __repr__(self):
        return f"User {self.username}"  # Return the username of the user   

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

    def check_status(self):
        return self.status

    def set_status(self, set_status):
        self.status = set_status

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
        cls_dict['status'] = self.status,
        cls_dict['my_resume_content'] = self.my_resume_content

        return cls_dict
        
    def toJSON(self):
        return self.toDICT()

"""
JWTTokenBlocklist model representing a blocklist of JWT tokens.

Attributes:
    id: Unique identifier for the blocklist entry.
    jwt_token: JWT token string.
    created_at: Timestamp when the token was created.
"""
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

"""
Contact model representing a contact person in the system.

Attributes:
    contact_url: URL to the contact's profile.
    name: Name of the contact.
    current_location: Current location of the contact.
    headline: Headline or title of the contact.
    about: About information for the contact.
    profile_pic_url: URL to the contact's profile picture.
"""
class Contact(db.Model):
    __tablename__ = 'contacts'
    contact_url = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    current_location = db.Column(db.String(255), nullable=False)
    headline = db.Column(db.String(255), nullable=False)
    about = db.Column(db.Text, nullable=False)
    profile_pic_url = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"Contact {self.contact_url}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update_name(self, new_name):
        self.name = new_name
        self.save()

    def update_current_location(self, new_location):
        self.current_location = new_location
        self.save()

    def update_headline(self, new_headline):
        self.headline = new_headline
        self.save()

    def update_about(self, new_about):
        self.about = new_about
        self.save()

    def update_profile_pic_url(self, new_profile_pic_url):
        self.profile_pic_url = new_profile_pic_url
        self.save()

    @classmethod
    def get_by_contact_url(cls, contact_url):
        return db.session.query(cls).get(contact_url)
    @classmethod
    def get_by_contact_name(cls, user_id, name):
        return db.session.query(cls).join(Contact).filter(Contact.name == name, cls.user_id == user_id).first()
    
    @classmethod
    def get_all(cls):
        return cls.query.all()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict['contact_url'] = self.contact_url
        cls_dict['name'] = self.name
        cls_dict['current_location'] = self.current_location
        cls_dict['headline'] = self.headline
        cls_dict['about'] = self.about
        cls_dict['profile_pic_url'] = self.profile_pic_url
        return cls_dict

    def toJSON(self):
        return self.toDICT()
    
"""
Experience model representing a professional experience of a contact.

Attributes:
    id: Unique identifier for the experience.
    contact_url: URL to the associated contact's profile.
    company_name: Name of the company.
    company_logo: URL to the company's logo.
    company_role: Role of the contact at the company.
    company_location: Location of the company.
    bulletpoints: Bullet points describing the experience.
    company_duration: Duration of the contact's role at the company.
    company_total_duration: Total duration of the contact's experience.
"""
class Experience(db.Model):
    __tablename__ = 'experiences'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    contact_url = db.Column(db.String(255), db.ForeignKey('contacts.contact_url', ondelete='CASCADE'), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    company_logo = db.Column(db.String(255), nullable=False)
    company_role = db.Column(db.String(255), nullable=False)
    company_location = db.Column(db.String(255), nullable=False)
    bulletpoints = db.Column(db.Text, nullable=False)
    company_duration = db.Column(db.String(255), nullable=False)
    company_total_duration = db.Column(db.String(255), nullable=False)
    
    # contact = db.relationship('Contact', backref=db.backref('contacts', lazy=True))

    def __repr__(self):
        return f"Experience {self.company_name} #at {self.contact_url}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_id(cls, id):
        return db.session.query(cls).get_or_404(id)

    @classmethod
    def get_all(cls):
        return cls.query.all()

    def update_company_name(self, new_company_name):
        self.company_name = new_company_name
        self.save()

    def update_company_role(self, new_company_role):
        self.company_role = new_company_role
        self.save()

    def update_company_location(self, new_company_location):
        self.company_location = new_company_location
        self.save()

    def update_bulletpoints(self, new_bulletpoints):
        self.bulletpoints = new_bulletpoints
        self.save()

    def update_company_duration(self, new_company_duration):
        self.company_duration = new_company_duration
        self.save()

    def update_company_total_duration(self, new_company_total_duration):
        self.company_total_duration = new_company_total_duration
        self.save()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_by_contact_url(cls, url):
        return db.session.query(cls).filter_by(contact_url=url)
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict['id'] = self.id
        cls_dict['contact_url'] = self.contact_url
        cls_dict['company_name'] = self.company_name
        cls_dict['company_logo'] = self.company_logo
        cls_dict['company_role'] = self.company_role
        cls_dict['company_location'] = self.company_location
        cls_dict['bulletpoints'] = self.bulletpoints
        cls_dict['company_duration'] = self.company_duration
        cls_dict['company_total_duration'] = self.company_total_duration
        return cls_dict

    def toJSON(self):
        return self.toDICT()

"""
Connection model representing a connection between a user and a contact.

Attributes:
    id: Unique identifier for the connection.
    user_id: ID of the associated user.
    contact_url: URL to the associated contact's profile.
    frequency: Enum representing the frequency of interaction.
    last_interacted: Date when the last interaction occurred.
    notes: Notes related to the connection.
"""

class Connection(db.Model):
    __tablename__ = 'connections'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    contact_url = db.Column(db.String(255), db.ForeignKey('contacts.contact_url', ondelete='CASCADE'), nullable=False)
    frequency = db.Column(db.Enum('Weekly', 'Biweekly', 'Monthly', 'Bimonthly', 'Once_in_3_months', 'Once_in_6_months'), default='Weekly', nullable=False)
    last_interacted = db.Column(db.Date, default=datetime.utcnow, nullable=False)
    notes = db.Column(db.Text, nullable=True)  # New field

    def __repr__(self):
        return f"Connection(User ID: {self.user_id}, Contact URL: {self.contact_url})"
   
    @classmethod
    def get_by_connection(cls, user_id, contact_url):
        return db.session.query(cls).filter_by(contact_url=contact_url, user_id=user_id).first()
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def toDICT(self):
        cls_dict = {}
        cls_dict['id'] = self.id
        cls_dict['user_id'] = self.user_id
        cls_dict['contact_url'] = self.contact_url
        cls_dict['frequency'] = self.frequency
        cls_dict['last_interacted'] = self.last_interacted
        cls_dict['notes'] = self.notes  # Add notes to dict
        return cls_dict

    def toJSON(self):
        return self.toDICT()

    def delete(self):
        db.session.delete(self)
        db.session.commit()