import os
from flask_admin import Admin
from .models import db, User, User_region, Region, Restoration,Accommodation,Experience,Patrimony,Favorites,Comments
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class Mymodel(ModelView):
        column_display_pk = True

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(Mymodel(User, db.session))
    admin.add_view(Mymodel(User_region, db.session))
    admin.add_view(Mymodel(Region, db.session))
    admin.add_view(Mymodel(Restoration, db.session))
    admin.add_view(Mymodel(Accommodation, db.session))
    admin.add_view(Mymodel(Experience, db.session))
    admin.add_view(Mymodel(Patrimony, db.session))
    admin.add_view(Mymodel(Favorites, db.session))
    admin.add_view(Mymodel(Comments, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))