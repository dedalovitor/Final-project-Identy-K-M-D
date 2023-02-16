"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Region, Restoration, User_region
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import exc


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "hello"
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
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")

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


@api.route('/regionregister', methods=['POST'])
def getting_region_register():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    contact_person_name = request.json.get("contactPersonName")
    contact_person_telf = request.json.get("contactPersonTelf")
    nif = request.json.get("nif")
    address = request.json.get("address")
    country = request.json.get("country")
    city = request.json.get("city")


    user_region = User_region(
        name = name,
        email = email,
        password = password,
        contact_person_name = contact_person_name,
        contact_person_telf = contact_person_telf,
        nif = nif,
        address = address,
        country = country,
        city = city,
    )
    
    try:
        user_region.create()
    except exc.IntegrityError: 
        return jsonify({"error": "This email already exist"}), 400


    return jsonify({"response": "Hola", "email": email}), 200

@api.route('/regionlogin', methods=['POST'])
def user_region_login():
     body_email = request.json.get("email")
     body_password = request.json.get("password")
     user = User_region.query.filter_by(email = body_email, password = body_password).first()
     if not user: 
            return jsonify({"error": "credenciales no válidas"}), 401
     token = create_access_token(identity=user.id)
     
     return jsonify({"response": "hola", "token": token}), 200

@api.route('/region', methods=['POST'])
@jwt_required()
def create_region():
    user_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_resume = request.json.get("resume")
    body_photo = request.json.get("photo")
    body_logo = request.json.get("logo")
  
    new_region = Region(name=body_name, resume=body_resume, photo=body_photo, logo=body_logo, user_id=user_id )
    db.session.add(new_region)
    db.session.commit()
    return jsonify({"response": "Region registered successfully"}), 200

@api.route('/regions', methods=['GET'])
@jwt_required()
def get_all_current_user_regions():
    user_id = get_jwt_identity()
    regions = Region.query.filter_by(user_id= user_id)
    return jsonify({"result": [x.serialize() for x in regions]}), 200


@api.route('/region/<int:region_id>', methods=['DELETE'])
@jwt_required()
def delete_region(region_id):
    user_id = get_jwt_identity()
    region = Region.query.get(region_id)
    if region.user_id == user_id: 
     db.session.delete(region)
     db.session.commit()
     return jsonify({ "response": "Region deleted correctly"}), 200
     return jsonify({ "response": "Region not deleted"}), 400