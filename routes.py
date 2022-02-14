from flask import request
from flask_restx import Resource, fields, Namespace
from models import Film, Series

film_ns=Namespace('film', description='Film Namespace')
series_ns=Namespace('series', description='Series Namespace')

#films

film_model=film_ns.model(
    'Film',
    {
        'id':fields.Integer(),
        'title':fields.String(),
        'director':fields.String(),
        'year':fields.Integer(),
        'description':fields.String(),
    }
)

@film_ns.route('/films')
class FilmsResource(Resource):
    
    
    @film_ns.marshal_list_with(film_model, code=200)
    def get(self):
        """GET ALL FILMS"""
        films=Film.query.all()
        return films
    
    
    
@film_ns.route('/add_film')
class AddFilm(Resource):    
    @film_ns.marshal_with(film_model, code=201)
    def post(self):
        """POST NEW FILM"""
        data=request.get_json()
        
        new_film=Film(
            title=data.get('title'),
            director=data.get('director'),
            year=data.get('year'),
            description=data.get('description')
        )
        
        new_film.save()
        return new_film, 201


@film_ns.route('/films/<int:id>')
class FilmResource(Resource):
    
    @film_ns.marshal_with(film_model, code=200)
    def get(self, id):
        """GET FILM BY ID"""
        film=Film.query.get_or_404(id)
        
        return film, 200   

    @film_ns.marshal_with(film_model, code=200)
    def put(self, id):
        """UPDATE FILM BY ID"""
        film_to_update=Film.query.get_or_404(id)
        data=request.get_json()
        
        film_to_update.update(data.get('title'), data.get('director'), data.get('year'), data.get('description'))
        
        return film_to_update, 200
    
    @film_ns.marshal_with(film_model, code=200)
    def delete(self, id):
        """DELETE FILM BY ID"""
        film_to_delete=Film.query.get_or_404(id)
        
        film_to_delete.delete()
        
        return film_to_delete, 200
    
#series

series_model=series_ns.model(
    'Series',
    {
        'id':fields.Integer(),
        'title':fields.String(),
        'season':fields.Integer(),
        'year':fields.Integer(),
        'discs':fields.Integer(),
        'description':fields.String(),
    }
)
    
@series_ns.route('/series')
class ShowsResource(Resource):
    
    
    @series_ns.marshal_list_with(series_model, code=200)
    def get(self):
        """GET ALL SERIES"""
        series = Series.query.all()
        return series
    


@series_ns.route('/add_series')
class AddSeriesResource(Resource):
        
    @series_ns.marshal_with(series_model, code=201)
    def post(self):
        """POST NEW SERIES"""
        data=request.get_json()
        
        new_series=Series(
        title=data.get('title'),
        season=data.get('season'),
        year=data.get('year'),
        discs=data.get('discs'),
        description=data.get('description')
        )
        
        new_series.save()
        return new_series, 201


@series_ns.route('/series/<int:id>')
class ShowResource(Resource):
    
    @series_ns.marshal_with(series_model, code=200)
    def get(self, id):
        """GET SERIES BY ID"""
        series=Series.query.get_or_404(id)
        
        return series, 200   

    @series_ns.marshal_with(series_model, code=200)
    def put(self, id):
        """UPDATE SERIES BY ID"""
        series_to_update=Series.query.get_or_404(id)
        data=request.get_json()
        
        series_to_update.update(data.get('title'), data.get('season'), data.get('year'), data.get('discs'), data.get('description'))
        
        return series_to_update, 200
    
    @series_ns.marshal_with(series_model, code=200)
    def delete(self, id):
        """DELETE SERIES BY ID"""
        series_to_delete=Series.query.get_or_404(id)
        
        series_to_delete.delete()
        
        return series_to_delete, 200