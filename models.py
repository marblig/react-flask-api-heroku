from exts import db

class Film(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    director = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    
    def __repr__(self):
        return f"{self.title}, directed by {self.director} and released in {self.year}. {self.description}"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update(self, title, director, year, description):
        self.title = title
        self.director = director
        self.year = year
        self.description = description
        
        db.session.commit()


class Series(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    season = db.Column(db.Integer(), nullable=False)
    year = db.Column(db.Integer(), nullable=False)
    discs = db.Column(db.Integer(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    
    def __repr__(self):
        return f"{self.title} season {self.season}, released in {self.year}. {self.description}. The boxset contains {self.discs} discs"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update(self, title, season, year, discs, description):
        self.title = title
        self.season = season
        self.year = year
        self.discs = discs
        self.description = description
        
        db.session.commit()