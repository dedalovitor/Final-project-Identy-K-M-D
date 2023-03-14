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

# @api.route('/regions/<int:region_id>', methods=['GET'])
# def get_regions_by_id(region_id):
#     regions = Region.query.filter_by(region_id=region_id)
#     return jsonify({"result": [x.serialize()for x in regions]}), 200


@api.route('/regions_with_patrimony', methods=['GET'])
def get_regions_with_patrimony():
    regions = Region.query.all()
    regions_with_patrimony= []
    for region in regions:
        region_serialize=region.serialize()
        region_serialize["patrimonys"] = [x.serialize() for x in region.patrimonies]
        regions_with_patrimony.append(region_serialize)
    return jsonify({"result": regions_with_patrimony}), 200


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

@api.route('/region', methods=['POST'])
@jwt_required()
def create_region():
    user_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_resume = request.json.get("resume")
    body_photo = request.json.get("photo")
    body_logo = request.json.get("logo")
  
    new_region = Region(name=body_name, resume=body_resume, photo=body_photo, logo=body_logo, user_region_id=user_id)
    db.session.add(new_region)
    db.session.commit()
    return jsonify({"response": "Region registered successfully"}), 200


@api.route('/regions_user', methods=['GET'])
@jwt_required()
def get_all_current_user_regions():
    user_id = get_jwt_identity()
    regions = Region.query.filter_by(user_region_id= user_id)
    return jsonify({ "results": [x.serialize() for x in regions ]}), 200

@api.route('/region/<int:region_id>', methods=['DELETE'])
@jwt_required()
def delete_region(region_id):
    user_id = get_jwt_identity()
    region = Region.query.get(region_id)
    if user_id == user_id: 
     db.session.delete(region)
     db.session.commit()
     return jsonify({ "response": "Region deleted correctly"}), 200
     return jsonify({ "response": "Region not deleted"}), 400


@api.route('/patrimony', methods=['POST'])
@jwt_required()
def create_patrimony():
    region_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_resume = request.json.get("resume")
    body_photo = request.json.get("photo")
    body_logo = request.json.get("logo")
  
    new_patrimony = Patrimony(name=body_name, resume=body_resume, photo=body_photo, logo=body_logo, region_id=region_id)
    db.session.add(new_patrimony)
    db.session.commit()
    return jsonify({"response": "Patrimony registered successfully"}), 200

@api.route('/patrimonys', methods=['GET'])
@jwt_required()
def get_current_region_patrimonys():
    region_id = get_jwt_identity()
    patrimonys = Patrimony.query.filter_by(region_id= region_id)
    return jsonify({ "results": [x.serialize() for x in patrimonys ]}), 200

@api.route('/patrimony/<int:region_id>', methods=['DELETE'])
@jwt_required()
def delete_patrimony(region_id):
    user_id = get_jwt_identity()
    patrimony = Patrimony.query.get(region_id)
    if user_id == user_id: 
     db.session.delete(patrimony)
     db.session.commit()
     return jsonify({ "response": "Patrimony deleted correctly"}), 200
     return jsonify({ "response": "Patrimony not deleted"}), 400


@api.route('/restoration', methods=['POST'])
@jwt_required()
def create_restoration():
    region_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_resume = request.json.get("resume")
    body_photo = request.json.get("photo")
    body_logo = request.json.get("logo")
    body_type_bussiness = request.json.get("type_bussiness")
  
    new_restoration = Restoration(name=body_name, resume=body_resume, photo=body_photo, logo=body_logo, type_bussiness=body_type_bussiness, region_id=region_id)
    db.session.add(new_restoration)
    db.session.commit()
    return jsonify({"response": "Restoration registered successfully"}), 200


@api.route('/restorations', methods=['GET'])
@jwt_required()
def get_current_region_restorations():
    region_id = get_jwt_identity()
    restorations = Restoration.query.filter_by(region_id= region_id)
    return jsonify({ "results": [x.serialize() for x in restorations ]}), 200

@api.route('/restoration/<int:region_id>', methods=['DELETE'])
@jwt_required()
def delete_restoration(region_id):
    user_id = get_jwt_identity()
    restoration = Restoration.query.get(region_id)
    if user_id == user_id: 
     db.session.delete(restoration)
     db.session.commit()
     return jsonify({ "response": "Restoration deleted correctly"}), 200
     return jsonify({ "response": "Restoration not deleted"}), 400

@api.route('/accommodation', methods=['POST'])
@jwt_required()
def create_accommodation():
    region_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_resume = request.json.get("resume")
    body_photo = request.json.get("photo")
    body_logo = request.json.get("logo")
    body_type_bussiness = request.json.get("type_bussiness")
  
    new_accommodation = Accommodation(name=body_name, resume=body_resume, photo=body_photo, logo=body_logo, type_bussiness=body_type_bussiness, region_id=region_id)
    db.session.add(new_accommodation)
    db.session.commit()
    return jsonify({"response": "Accommodation registered successfully"}), 200


@api.route('/accommodations', methods=['GET'])
@jwt_required()
def get_current_region_accommodations():
    region_id = get_jwt_identity()
    accommodations = Accommodation.query.filter_by(region_id= region_id)
    return jsonify({ "results": [x.serialize() for x in accommodations]}), 200

@api.route('/accommodation/<int:region_id>', methods=['DELETE'])
@jwt_required()
def delete_accommodation(region_id):
    user_id = get_jwt_identity()
    accommodation = Accommodation.query.get(region_id)
    if user_id == user_id: 
     db.session.delete(accommodation)
     db.session.commit()
     return jsonify({ "response": "Accommodation deleted correctly"}), 200
     return jsonify({ "response": "Accommodation not deleted"}), 400

@api.route('/experience', methods=['POST'])
@jwt_required()
def create_experience():
    region_id = get_jwt_identity()
    body_name = request.json.get("name")
    body_resume = request.json.get("resume")
    body_photo = request.json.get("photo")
    body_logo = request.json.get("logo")
  
    new_experience = Experience(name=body_name, resume=body_resume, photo=body_photo, logo=body_logo, region_id=region_id)
    db.session.add(new_experience)
    db.session.commit()
    return jsonify({"response": "Experience registered successfully"}), 200


@api.route('/experiences_user', methods=['GET'])
@jwt_required()
def get_current_region_experiences():
    region_id = get_jwt_identity()
    experiences = Experience.query.filter_by(region_id= region_id)
    return jsonify({ "results": [x.serialize() for x in experiences]}), 200

@api.route('/experience/<int:region_id>', methods=['DELETE'])
@jwt_required()
def delete_experience(region_id):
    user_id = get_jwt_identity()
    experience = Experience.query.get(region_id)
    if user_id == user_id: 
     db.session.delete(experience)
     db.session.commit()
     return jsonify({ "response": "Experience deleted correctly"}), 200
     return jsonify({ "response": "Experience not deleted"}), 400


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = Favorites.query.filter_by(user_id=user_id).all()
    favorites_list = []
    for favorite in favorites:
        favorite_data = {}
        favorite_data['id'] = favorite.id
        favorite_data['user_id'] = favorite.user_id
        favorite_data['region_id'] = favorite.region_id
        favorite_data['restoration_id'] = favorite.restoration_id
        favorite_data['accommodation_id'] = favorite.accommodation_id
        favorite_data['patrimony_id'] = favorite.patrimony_id
        favorites_list.append(favorite_data)
    return jsonify(favorites_list), 200


@api.route('/addfavorite/<int:id>', methods=['POST'])
@jwt_required
def add_favorite():
    user_id = get_jwt_identity()
    data = request.json
    favorite = Favorites(user_id=user_id)
    if 'region_id' in data:
        favorite.region_id = data['region_id']
    if 'restoration_id' in data:
        favorite.restoration_id = data['restoration_id']
    if 'accommodation_id' in data:
        favorite.accommodation_id = data['accommodation_id']
    if 'patrimony_id' in data:
        favorite.patrimony_id = data['patrimony_id']
    db.session.add(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite added successfully'}), 201

@api.route('/deletefavorites/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    user_id = get_jwt_identity()
    favorite = Favorites.query.filter_by(id=id, user_id=user_id).first()
    if not favorite:
        return jsonify({'message': 'Favorite not found'}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite deleted successfully'}), 200

