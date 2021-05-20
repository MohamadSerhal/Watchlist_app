from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask import jsonify
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask import abort
import enum


app = Flask(__name__)    # created a flask app
ma = Marshmallow(app)   # used for data serialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:<password>@localhost:3306/watchlist'
CORS(app)
db = SQLAlchemy(app)



## Table models in the database
class Anime(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    description = db.Column(db.Text, nullable=True)
    imgPath = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20))
    altPic = db.Column(db.String(50))

    def __init__(self, name, description, imgPath, status, altP):
        super(Anime, self).__init__(name= name,
                                    description= description,
                                    imgPath= imgPath,
                                    status= status, 
                                    altPic= altP)


class Manga(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    description = db.Column(db.Text, nullable=True)
    imgPath = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20))
    altPic = db.Column(db.String(50))

    def __init__(self, name, description, imgPath, status, altP):
        super(Manga, self).__init__(name= name,
                                    description= description,
                                    imgPath= imgPath,
                                    status= status,
                                    altPic= altP)


## Schemas to return after api call
class AnimeSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description", "imgPath", "status", "altPic")
        model = Anime
        

anime_schema = AnimeSchema()
animes_schema = AnimeSchema(many=True)


class MangaSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description", "imgPath", "status", "altPic")
        model = Manga

manga_schema = MangaSchema()
mangas_schema = MangaSchema(many=True)


## APIs
## routes:
# 'anime/watched', 'anime/toWatch', 'anime/watching', 
# 'manga/read' 'manga/toRead' 'manga/reading'
# 'anime/add', 'anime/edit/<id>, 'anime/delete/<id>', 'anime/status/<id>', /anime/details/<id> 
# 'manga/add', 'manga/edit/<id>, 'manga/delete/<id>', 'manga/status/<id>', /manga/details/<id> 


# Fetching Animes from database
@app.route('/anime/watched', methods=['GET'])
def getWatchedAnimes():
    watchedAnimes = Anime.query.filter_by(status= "watched").all()
    return jsonify(animes_schema.dump(watchedAnimes))

@app.route('/anime/toWatch', methods=['GET'])
def getToWatchAnimes():
    toWatchedAnimes = Anime.query.filter_by(status= "to watch").all()
    return jsonify(animes_schema.dump(toWatchedAnimes))

@app.route('/anime/watching', methods=['GET'])
def getWatchingAnimes():
    watchingAnimes = Anime.query.filter_by(status= "watching").all()
    return jsonify(animes_schema.dump(watchingAnimes))


# Fetching mangas from database
@app.route('/manga/read', methods=['GET'])
def getReadMangas():
    readManga = Manga.query.filter_by(status= "read").all()
    return jsonify(mangas_schema.dump(readManga))

@app.route('/manga/toRead', methods=['GET'])
def getToReadMangas():
    toReadManga = Manga.query.filter_by(status= "to read").all()
    return jsonify(mangas_schema.dump(toReadManga))

@app.route('/manga/reading', methods=['GET'])
def getReadingMangas():
    readingManga = Manga.query.filter_by(status= "reading").all()
    return jsonify(mangas_schema.dump(readingManga))


# Adding anime to database
@app.route('/anime/add', methods=['POST'])
def addAnime():
    name = request.json["name"]
    anime = Anime.query.filter_by(name= name).first()
    if anime is not None:
        abort(400, {"message": "Can't add to database, anime of this name already exists!"})
    description = request.json["description"]
    imgPath = request.json["path"]
    status = request.json["status"]
    altPic = request.json["altPic"]
    anime = Anime(name=name, description= description, imgPath= imgPath, status= status, altP=altPic)
    db.session.add(anime)
    db.session.commit()
    return jsonify(anime_schema.dump(anime))


# Adding manga to database
@app.route('/manga/add', methods=['POST'])
def addManga():
    name = request.json["name"]
    mn = Manga.query.filter_by(name= name).first()
    if mn is not None:
        abort(400, {"message": "Can't add to database, manga of this name already exists!"})
    description = request.json["description"]
    imgPath = request.json["path"]
    status = request.json["status"]
    altPic = request.json["altPic"]
    manga = Manga(name=name, description= description, imgPath= imgPath, status= status, altP= altPic)
    db.session.add(manga)
    db.session.commit()
    return jsonify(manga_schema.dump(manga))


# Edit anime (NOT used)
@app.route('/anime/edit/<id>', methods=['PATCH'])
def edit_anime(id):
    anime = Anime.query.filter_by(id= id).first()
    if anime is None:
        abort(400, {'message': 'Anime does not exist'})
    newName = request.json["name"]
    newDescription = request.json["description"]
    newIMG = request.json["imgPath"]
    newStatus = request.json["status"]
    newAlt = request.json["altPic"]
    anime.name = newName
    anime.description = newDescription
    anime.imgPath = newIMG
    anime.status = newStatus
    anime.altPic = newAlt
    db.session.commit()
    return "anime edited"

# Edit manga  (NOT used)
@app.route('/manga/edit/<id>', methods=['PATCH'])
def edit_manga(id):
    manga = Manga.query.filter_by(id= id).first()
    if manga is None:
        abort(400, {'message': 'Manga does not exist'})
    newName = request.json["name"]
    newDescription = request.json["description"]
    newIMG = request.json["imgPath"]
    newStatus = request.json["status"]
    newAlt = request.json["altPic"]
    manga.name = newName
    manga.description = newDescription
    manga.imgPath = newIMG
    manga.status = newStatus
    manga.altPic = newAlt
    db.session.commit()
    return "edited manga"


# Delete anime
@app.route("/anime/delete/<id>", methods=["DELETE"])
def anime_delete(id):
    anime = Anime.query.filter_by(id= id).first()
    if anime is None:
        abort(400, {'message': 'Anime does not exist'})
    db.session.delete(anime)
    db.session.commit()
    return "Anime was successfully deleted"

# Delete manga
@app.route("/manga/delete/<id>", methods=["DELETE"])
def manga_delete(id):
    manga = Manga.query.filter_by(id= id).first()
    if manga is None:
        abort(400, {'message': 'Manga does not exist'})
    db.session.delete(manga)
    db.session.commit()
    return "Manga was successfully deleted"


# update anime status
@app.route("/anime/status/<id>", methods=["PATCH"])
def edit_anime_status(id):
    anime = Anime.query.filter_by(id= id).first()
    if anime is None:
        abort(400, {'message': 'Anime does not exist'})
    newStatus = request.json["status"]
    anime.status = newStatus
    db.session.commit()
    return "Changed status successfully"

# update manga status
@app.route("/manga/status/<id>", methods=["PATCH"])
def edit_manga_status(id):
    manga = Manga.query.filter_by(id= id).first()
    if manga is None:
        abort(400, {'message': 'Manga does not exist'})
    newStatus = request.json["status"]
    manga.status = newStatus
    db.session.commit()
    return "Changed status successfully"

# open anime details page  (NOT used)
@app.route("/anime/details/<id>", methods=["GET"])
def anime_get(id):
    anime = Anime.query.filter_by(id= id).first()
    if anime is None:
        abort(400, {'message': 'Anime does not exist'})
    return jsonify(anime_schema(anime))


# open manga details page (NOT used)
@app.route("/manga/details/<id>", methods=["GET"])
def manga_get(id):
    manga = Manga.query.filter_by(id= id).first()
    if manga is None:
        abort(400, {'message': 'Manga does not exist'})
    return jsonify(manga_schema(manga))


