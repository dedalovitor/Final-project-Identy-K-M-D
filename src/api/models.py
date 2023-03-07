from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from enum import Enum
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    favorites= db.relationship('Favorites') 
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
            # do not serialize the password, its a security breach
        }
    def __repr__(self):
        return f'{self.name}'

    def create(self):
        db.session.add(self)
        db.session.commit()

class User_region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    contact_person_name = db.Column(db.String(100), unique=True, nullable=False)
    nif = db.Column(db.String(100), unique=True, nullable=False)
    contact_person_telf = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(100), unique=False, nullable=False)
    country= db.Column(db.String(100), unique=False, nullable=False)
    city = db.Column(db.String(100), unique=False, nullable=False)
    regions = db.relationship('Region', backref='user_region')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "contact_person_name": self.contact_person_name,
            "nif": self.nif,
            "contact_person_telf": self.contact_person_telf,
            "address": self.address,
            "country": self.country,
            "city": self.city
        

            # do not serialize the password, its a security breach
        }
    def __repr__(self):
        return f'{self.name}'

    def create(self):
        db.session.add(self)
        db.session.commit()

class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True,  nullable=False)
    resume = db.Column(db.Text, unique=False, nullable=False)
    photo = db.Column(db.String(255), nullable=False)
    logo = db.Column(db.String(255), nullable=False)
    user_region_id = db.Column(db.Integer, db.ForeignKey('user_region.id'))
    restorations = db.relationship('Restoration' ,backref='region')
    accomodation = db.relationship('Accommodation', backref='region')
    experiences = db.relationship('Experience' ,backref='region')
    patrimonies = db.relationship('Patrimony' ,backref='region')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "resume": self.resume,
            "photo": self.photo,
            "logo": self.logo

            # do not serialize the password, its a security breach
        }
    
    def __repr__(self):
        return f'{self.name}'

    def inforegion(self):
        return {
            "id": self.id,
            "name": self.name,
            "resume": self.resume,
            "photo": self.photo,
            "logo": self.logo,
            "restorations": [x.serialize()for x in self.restorations],
            "accomodation": [x.serialize()for x in self.accomodation],
            "experiences": [x.serialize()for x in self.experiences],
            "patrimonies": [x.serialize()for x in self.patrimonies]

            # do not serialize the password, its a security breach
        }

class RestorationChoices(Enum):
    bar= "bar"
    chiringuito= "chiringuito"
    restaurante= "restaurante"
    pub= "pub / discoteca"


class Restoration(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    resume = db.Column(db.Text, unique=False, nullable=True)
    photo = db.Column(db.String(255), nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    time_open = db.Column(db.String(255), nullable=True)
    cart = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    coordinates = db.Column(db.String(255), nullable=True)
    contact = db.Column(db.String(255), nullable=True)
    type_bussiness = db.Column(db.Enum(RestorationChoices), nullable=True, server_default="bar")
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "resume": self.resume,
            "photo": self.photo,
            "logo": self.logo,
            "time_open": self.time_open,
            "cart": self.cart,
            "location": self.location,
            "coordinates": self.coordinates,
            "contact": self.contact,
            "type_bussiness": self.type_bussiness.name
            # do not serialize the password, its a security breach
        }

    def __repr__(self):
        return f'{self.name}'

class AccommodationChoices(Enum):
    hotel= "hotel"
    hostal= "hostal"
    albergue= "albergue"
    casa_rural= "casa rural"

class Accommodation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    resume = db.Column(db.Text, unique=False, nullable=True)
    photo = db.Column(db.String(255), nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    time_open = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    coordinates = db.Column(db.String(255), nullable=True)
    contact = db.Column(db.String(255), nullable=True)
    type_bussiness = db.Column(db.Enum(AccommodationChoices), nullable=True, server_default="hotel")
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "resume": self.resume,
            "photo": self.photo,
            "logo": self.logo,
            "time_open": self.time_open,
            "location": self.location,
            "coordinates": self.coordinates,
            "contact": self.contact,
            "type_bussiness": self.type_bussiness.name

            # do not serialize the password, its a security breach
        }
    def __repr__(self):
        return f'{self.name}'

class ExperienceChoices(Enum):
    activo= "turismo activo"
    gastronomico= "turismo gastronómico"
    historico= "turismo histórico"
    cultural= "turismo cultural"

class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    resume = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String(255), nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    time_open = db.Column(db.String(255), nullable=True)
    meeting_point = db.Column(db.String(255), nullable=True)
    coordinates = db.Column(db.String(255), nullable=True)
    contact = db.Column(db.String(255), nullable=True)
    type_bussiness = db.Column(db.Enum(ExperienceChoices), nullable=True, server_default="activo")
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "resume": self.resume,
            "photo": self.photo,
            "logo": self.logo,
            "time_open": self.time_open,
            "meeting_point": self.meeting_point,
            "coordinates": self.coordinates,
            "contact": self.contact,
            "type_bussiness": self.type_bussiness.name
            
            # do not serialize the password, its a security breach
            }

    def __repr__(self):
        return f'{self.name}'

class PatrimonyChoices(Enum):
    natural= "patrimonio natural"
    cultural= "patrimonio cultural"
    historico= "patrimonio histórico"
    fiestas= "fiestas y eventos"

class Patrimony(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    resume = db.Column(db.Text, unique=False, nullable=False)
    photo = db.Column(db.String(255), nullable=False)
    logo = db.Column(db.String(255), nullable=False)
    time_open = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    coordinates = db.Column(db.String(255), nullable=True)
    contact = db.Column(db.String(255), nullable=True)
    type_bussiness = db.Column(db.Enum(PatrimonyChoices), nullable=True, server_default="cultural")
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "resume": self.resume,
            "photo": self.photo,
            "logo": self.logo,
            "time_open": self.time_open,
            "location": self.location,
            "coordinates": self.coordinates,
            "contact": self.contact,
            "type_bussiness": self.type_bussiness.name
            
            # do not serialize the password, its a security breach
            }
    def __repr__(self):
        return f'{self.name}'

class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    user= db.relationship('User')   
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    region = db.relationship('Region')
    restoration_id = db.Column(db.Integer, db.ForeignKey('restoration.id'))
    restoration = db.relationship('Restoration')
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodation.id'))
    accommodation = db.relationship('Accommodation')
    patrimony_id = db.Column(db.Integer, db.ForeignKey('patrimony.id'))
    patrimony = db.relationship('Patrimony')

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user= db.relationship('User')
    user_region= db.relationship('User_region')
    user_region_id =db.Column(db.Integer, db.ForeignKey('user_region.id'))
    text = db.Column(db.Text, nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'))
    region = db.relationship('Region')
    restoration_id = db.Column(db.Integer, db.ForeignKey('restoration.id'))
    restoration = db.relationship('Restoration')
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodation.id'))
    accommodation = db.relationship('Accommodation')
    patrimony_id = db.Column(db.Integer, db.ForeignKey('patrimony.id'))
    patrimony = db.relationship('Patrimony')
