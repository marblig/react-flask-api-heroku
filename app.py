from flask import Flask
from flask_restx import Api
from models import Film, Series
from exts import db
from flask_cors import CORS
from routes import film_ns, series_ns


def create_app(config):

    app = Flask(__name__, static_url_path='/',static_folder='./client/build')
    app.config.from_object(config)
    
    CORS(app)
    
    db.init_app(app)

    api = Api(app, doc='/docs')
    
    api.add_namespace(film_ns)
    api.add_namespace(series_ns)
    
    @app.route('/')
    def index():
        return app.send_static_file('index.html')
    
    @app.errorhandler(404)
    def not_found(err):
        return app.send_static_file('index.html')

    @app.shell_context_processor
    def make_shell_context():
        return {
        'db':db,
        'Film':Film,
        'Series': Series
        }
    
    
    
    return app
    