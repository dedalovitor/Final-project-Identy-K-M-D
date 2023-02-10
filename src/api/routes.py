"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import exc


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "karen"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def user_login():
     body_email = request.json.get("email")
     body_password = request.json.get("password")
     user = User.query.filter_by(email = body_email, password = body_password).first()
     if not user: 
            return jsonify({"error": "credenciales no válidas"}), 401
     token = create_access_token(identity=user.id)
     
     return jsonify({"response": "hola", "token": token}), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def current_user_email():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"response": "Hola", "email": user.email}), 200


@api.route('/register', methods=['POST'])
def getting_register():
    name = request.json.get("first_name")
    email = request.json.get("email")
    password = request.json.get("password")
    user_already_exist = User.query.filter( email = email).first()

    user = User(
        name = name,
        email = email,
        password = password
    )
    
    try:
        user.create()
    except exc.IntegrityError: 
        return jsonify({"error": "This email already exist"}), 400


    return jsonify({"response": "Hola", "email": email}), 200