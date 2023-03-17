"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Region, Restoration, Accommodation, Experience, Patrimony , Comments, User_region , PatrimonyChoices, RestorationChoices, AccommodationChoices, ExperienceChoices, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import exc

import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "hello"
    }

    return jsonify(response_body), 200

@api.route('/patrimony_choice', methods=['GET'])
def patrimony_choice():
    patrimony_choice = [str(e.value) for e in PatrimonyChoices]
    return jsonify({"results": patrimony_choice}), 200

@api.route('/restoration_choice', methods=['GET'])
def restoration_choice():
    restoration_choice = [str(e.value) for e in RestorationChoices]
    return jsonify({"results": restoration_choice}), 200

@api.route('/accommodation_choice', methods=['GET'])
def accommodation_choice():
    accommodation_choice = [str(e.value) for e in AccommodationChoices]
    return jsonify({"results": accommodation_choice}), 200

@api.route('/experience_choice', methods=['GET'])
def experience_choice():
    experience_choice = [str(e.value) for e in ExperienceChoices]
    return jsonify({"results": experience_choice}), 200


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

@api.route('/regions/<int:region_id>', methods=['GET'])
def get_regions_by_id(region_id):
    region = Region.query.filter_by(id=region_id).first()
    return jsonify({"result": region.inforegion()}), 200

@api.route('/patrimonys/<int:patrimony_id>', methods=['GET'])
def get_patrimonys_by_id(patrimony_id):
    patrimony = Patrimony.query.filter_by(id=patrimony_id).first()
    return jsonify({"result": patrimony.serialize()}), 200

@api.route('/restorations/<int:restoration_id>', methods=['GET'])
def get_restorations_by_id(restoration_id):
    restoration = Restoration.query.filter_by(id=restoration_id).first()
    return jsonify({"result": restoration.serialize()}), 200

@api.route('/accommodations/<int:accommodation_id>', methods=['GET'])
def get_accommodations_by_id(accommodation_id):
    accommodation = Accommodation.query.filter_by(id=accommodation_id).first()
    return jsonify({"result": accommodation.serialize()}), 200

@api.route('/experiences/<int:experience_id>', methods=['GET'])
def get_experiences_by_id(experience_id):
    experience = Experience.query.filter_by(id=experience_id).first()
    return jsonify({"result": experience.serialize()}), 200


@api.route('/commentsrestoration/<int:id>', methods=['GET'])
def comments_restoration(id):
    comments = Comments.query.filter_by(restoration_id=id).all()
    result = [comments.serialize() for comments in comments]
    return jsonify(result), 200

@api.route('/commentsaccommodation/<int:id>', methods=['GET'])
def comments_accommodation(id):
    comments = Comments.query.filter_by(accommodation_id=id).all()
    result = [comments.serialize() for comments in comments]
    print(result)
    return jsonify(result), 200

@api.route('/commentspatrimony/<int:id>', methods=['GET'])
def comments_patrimony(id):
    comments = Comments.query.filter_by(patrimony_id=id).all()
    result = [comments.serialize() for comments in comments]
    print(result)
    return jsonify(result), 200


@api.route('/addcommentsrestoration/<int:id>', methods=['POST'])
def addcomments_restoration(id):
    request_data = request.get_json()
    result = Comments(user_id=request_data.get("user_id"), text=request_data.get("comment"),user_region=request_data.get("user_region"), restoration_id=request_data.get("restoration_id"))   
    print(result)
    db.session.add(result)
    db.session.commit()
    return "success", 200

@api.route('/addcommentspatrimony/<int:id>', methods=['POST'])
def addcomments_patrimony(id):
    request_data = request.get_json()
    result = Comments(user_id=request_data.get("user_id"), text=request_data.get("comment"),user_region=request_data.get("user_region"), patrimony_id=request_data.get("patrimony_id"))   
    print(result)
    db.session.add(result)
    db.session.commit()
    return "success", 200

@api.route('/addcommentsaccommodation/<int:id>', methods=['POST'])
def addcomments_accommodation(id):
    request_data = request.get_json()
    result = Comments(user_id=request_data.get("user_id"), text=request_data.get("comment"),user_region=request_data.get("user_region"), accommodation_id=request_data.get("accommodation_id"))
    print(result)   
    db.session.add(result)
    db.session.commit()
    return "success", 200

@api.route('/addcomments/<int:id>', methods=['POST'])
def addcomments_region(id):
    request_data = request.get_json()
    result = Comments(user_id=request_data.get("user_id"), text=request_data.get("comment"),user_region=request_data.get("user_region"), region_id=request_data.get("region_id"))   
    db.session.add(result)
    db.session.commit()
    return "success", 200


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
    body = json.loads(request.form["region"])
    body_name = body["name"]
    body_resume = body["resume"]
    body_photo = cloudinary.uploader.upload(request.files['photo'])
    body_logo = cloudinary.uploader.upload(request.files['logo'])
  
    new_region = Region(name=body_name, resume=body_resume, photo=body_photo['secure_url'], logo=body_logo['secure_url'], user_region_id=user_id)
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
    body = json.loads(request.form["patrimony"])
    body_name = body["name"]
    body_resume = body["resume"]
    body_time_open = body["time_open"]
    body_location = body["location"]
    body_latitud = body["latitud"]
    body_longitud = body["longitud"]
    body_contact = body["contact"]
    body_photo = cloudinary.uploader.upload(request.files['photo'])
    body_logo = cloudinary.uploader.upload(request.files['logo'])
    body_type_bussiness = body["type_bussiness"]
    
  
    new_patrimony = Patrimony(name=body_name, resume=body_resume, location = body_location, time_open = body_time_open, latitud = body_latitud, longitud = body_longitud, contact = body_contact, type_bussiness=PatrimonyChoices(body_type_bussiness), photo=body_photo['secure_url'], logo=body_logo['secure_url'], region_id=region_id)
    db.session.add(new_patrimony)
    db.session.commit()
    return jsonify({"response": "Patrimony registered successfully"}), 200

@api.route('/patrimonys_user', methods=['GET'])
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
    body = json.loads(request.form["restoration"])
    body_name = body["name"]
    body_resume = body["resume"]
    body_time_open = body["time_open"]
    body_location = body["location"]
    body_latitud = body["latitud"]
    body_longitud = body["longitud"]
    body_contact = body["contact"]
    body_photo = cloudinary.uploader.upload(request.files['photo'])
    body_logo = cloudinary.uploader.upload(request.files['logo'])
    body_cart = cloudinary.uploader.upload(request.files['cart'])
    body_type_bussiness = body["type_bussiness"]
    
  
    new_restoration = Restoration(name=body_name, resume=body_resume, location = body_location, time_open = body_time_open, latitud = body_latitud, longitud = body_longitud, contact = body_contact, type_bussiness=RestorationChoices(body_type_bussiness), photo=body_photo['secure_url'], logo=body_logo['secure_url'], cart=body_cart['secure_url'], region_id=region_id)
    db.session.add(new_restoration)
    db.session.commit()
    return jsonify({"response": "Restoration registered successfully"}), 200


@api.route('/restorations_user', methods=['GET'])
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
    body = json.loads(request.form["accommodation"])
    body_name = body["name"]
    body_resume = body["resume"]
    body_time_open = body["time_open"]
    body_location = body["location"]
    body_latitud = body["latitud"]
    body_longitud = body["longitud"]
    body_contact = body["contact"]
    body_photo = cloudinary.uploader.upload(request.files['photo'])
    body_logo = cloudinary.uploader.upload(request.files['logo'])
    body_type_bussiness = body["type_bussiness"]
    
  
    new_accommodation = Accommodation(name=body_name, resume=body_resume, location = body_location, time_open = body_time_open, latitud = body_latitud, longitud = body_longitud, contact = body_contact, type_bussiness=AccommodationChoices(body_type_bussiness), photo=body_photo['secure_url'], logo=body_logo['secure_url'], region_id=region_id)
    db.session.add(new_accommodation)
    db.session.commit()
    return jsonify({"response": "Accommodation registered successfully"}), 200


@api.route('/accommodations_user', methods=['GET'])
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
    body = json.loads(request.form["experience"])
    body_name = body["name"]
    body_resume = body["resume"]
    body_time_open = body["time_open"]
    body_meeting_point = body["meeting_point"]
    body_latitud = body["latitud"]
    body_longitud = body["longitud"]
    body_contact = body["contact"]
    body_photo = cloudinary.uploader.upload(request.files['photo'])
    body_logo = cloudinary.uploader.upload(request.files['logo'])
    body_type_bussiness = body["type_bussiness"]
    
  
    new_experience = Experience(name=body_name, resume=body_resume, meeting_point = body_meeting_point, time_open = body_time_open, latitud = body_latitud, longitud = body_longitud, contact = body_contact, type_bussiness=ExperienceChoices(body_type_bussiness), photo=body_photo['secure_url'], logo=body_logo['secure_url'], region_id=region_id)
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



@api.route('/addfavorite', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    data = request.json
    print(data["id"], data["type"])
    if data["type"] == "region":
        favorite = Favorites.query.filter_by(user_id=user_id, region_id = data["id"]).first()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
        else: 
            new_favorite = Favorites(user_id = user_id, region_id = data["id"])
            print(new_favorite)
            db.session.add(new_favorite)
            db.session.commit()
    if data["type"] == "restoration":
        favorite = Favorites.query.filter_by(user_id=user_id, restoration_id = data["id"]).first()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
        else: 
            new_favorite = Favorites(user_id = user_id, restoration_id = data["id"])
            print(new_favorite)
            db.session.add(new_favorite)
            db.session.commit()
    if data["type"] == "accommodation":
        favorite = Favorites.query.filter_by(user_id=user_id, accommodation_id = data["id"]).first()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
        else: 
            new_favorite = Favorites(user_id = user_id, accommodation_id = data["id"])
            print(new_favorite)
            db.session.add(new_favorite)
            db.session.commit()
    if data["type"] == "patrimony":
        favorite = Favorites.query.filter_by(user_id=user_id, patrimony_id = data["id"]).first()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
        else: 
            new_favorite = Favorites(user_id = user_id, patrimony_id = data["id"])
            print(new_favorite)
            db.session.add(new_favorite)
            db.session.commit()
    if data["type"] == "experience":
        favorite = Favorites.query.filter_by(user_id=user_id, experience_id = data["id"]).first()
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
        else: 
            new_favorite = Favorites(user_id = user_id, experience_id = data["id"])
            print(new_favorite)
            db.session.add(new_favorite)
            db.session.commit()
    return jsonify({'message': 'Favorite added successfully'}), 201
