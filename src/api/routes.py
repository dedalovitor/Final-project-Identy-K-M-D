"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Region, Restoration, Accommodation, Experience, Patrimony , User_region 
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
    region = User_region.query.filter_by(email = body_email, password = body_password).first()
    if not user and not region: 
        return jsonify({"error": "credenciales no válidas"}), 401
    elif user: 
        token = create_access_token(identity=user.id)
        return jsonify({"user": "user", "token": token}), 200
    elif region: 
        token = create_access_token(identity=region.id)
        return jsonify({"user": "region", "token": token}), 200


@api.route('/user', methods=['POST'])
@jwt_required()
def current_user():
    user_type = request.json.get("user")
    user_id = get_jwt_identity()
    if user_type == "user":
        user = User.query.get(user_id)
        return jsonify({"data":user.serialize(), "user":"user"}), 200
    elif user_type == "region":
        user = User_region.query.get(user_id)
        return jsonify({"data":user.serialize(), "user":"region"}), 200
    return jsonify({"error": True}), 400


@api.route('/regions', methods=['POST'])
def population_regions():
    request_data = request.get_json()
    regions=[]
    for data in request_data:
        regions.append(Region(name=data["name"],
        resume=data["resume"],
        photo=data["photo"],
        logo=data["logo"],))
    db.session.bulk_save_objects(regions)    
    db.session.commit() 
    return "success", 200


@api.route('/regions', methods=['GET'])
def get_regions():
    regions = Region.query.all()
    return jsonify({"result": [x.serialize()for x in regions]}), 200

@api.route('/restorations', methods=['GET'])
def get_restorations():
    restorations = Restoration.query.all()
    return jsonify({"result": [x.serialize()for x in restorations]}), 200

@api.route('/patrimonys', methods=['GET'])
def get_patrimonys():
    patrimonys = Patrimony.query.all()
    return jsonify({"result": [x.serialize()for x in patrimonys]}), 200

@api.route('/accommodations', methods=['GET'])
def get_accommodations():
    accommodations = Accommodation.query.all()
    return jsonify({"result": [x.serialize()for x in accommodations]}), 200

@api.route('/experiences', methods=['GET'])
def get_experiences():
    experiences = Experience.query.all()
    return jsonify({"result": [x.serialize()for x in experiences]}), 200

@api.route('/register', methods=['POST'])
def getting_register():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    user_already_exist = User.query.filter_by(email=email).first()
    region_already_exist = User_region.query.filter_by(email=email).first()
    if user_already_exist or region_already_exist:
        return jsonify({"error": "This email already exist"}), 400

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
    user_already_exist = User.query.filter_by(email=email).first()
    region_already_exist = User_region.query.filter_by(email=email).first()
    if user_already_exist or region_already_exist:
        return jsonify({"error": "This email already exist"}), 400



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
     print(body_email)
     print(body_password)
     if not user: 
            return jsonify({"error": "credenciales no válidas"}), 401
     token = create_access_token(identity=user.id)
     
     return jsonify({"response": "hola", "token": token}), 200
