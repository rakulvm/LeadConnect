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
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    security_question = db.Column(db.String(255), nullable=False)
    security_answer_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.TIMESTAMP, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    def __repr__(self):
        return f"User {self.name}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def set_security_answer(self, answer):
        self.security_answer_hash = generate_password_hash(answer)

    def check_security_answer(self, answer):
        return check_password_hash(self.security_answer_hash, answer)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()


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