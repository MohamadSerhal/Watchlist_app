# Watchlist and reading list web app
All code and files are written by me, Mohamad Serhal.     

Using this application, You, the user can add anime shows and movies to a list that is divided between 'Watching', 'Watched' and 'To Watch', move them around from one group to the other based on your preferences. You can also do the same with manga readings, divided between 'Read', 'Reading' and 'To Read'.        
NOTE: Anime and Manga terms where put by me since the app is first made for my personnal use, You can add any kind of media to watch in the Anime section like: Movies, Tv-shows, Series, Short Films ...etc . And You can add any kind of media to read in the Manga section like: Novels, short stories, comic books ...etc .    

## How to setup and run the Backend platform using Flask.     

1) Setting up and running Flask on your machine:  
    a) Create a python virtual environment called venv, using the command "py -3 -m venv venv" on windows or using "python3 -m venv venv" on Unix. Note that you need Python installed on your machine!       
    b) Activate the virtual environment: "venv\Scripts\activate" on windows, "venv/bin/activate" on Unix.    
    c) Download Flask in venv using pip: "pip install Flask"    
    d) Open a pyhton script called "app.py", import Flask (from flask import Flask) and create a flask app: "app = Flask(__name__)" - NOTE: You don't need to do that in this case, just pull the repo, it is already done, just open app.py and check it!       
    ----> NOTE: Steps e, f and g are made simpler by running 'run' windows command file on windows, just type run in the command prompt. This way you can skip these 3 parts.             
    e) Type "set FLASK_APP=app.py" in the terminal to set the python script that Flask will run.  
    f) Type "set FLASK_ENV=development" in the terminal to set environment to a development environment, if you skip this step, the flask app will run in production mode.   
    g) Now type "flask run" in the terminal and the app will be running! Proceed to part 2 to run the app inside the github repo.   


2) Running the current Flask project in the Github repo:  
    a) Activate the virtual environment through the command prompt      
    b) Make sure you installed all the requirements in the "requirements.txt" file using pip. For example, you will find "Flask-Bcrypt" in the file, in the command prompt while venv is active 
    write: "pip install Flask-Bcrypt"        
    c) Type "set FLASK_APP=app.py" in the terminal to set the python script that Flask will run.   
    d) Type "set FLASK_ENV=development" in the terminal to set environment to a development environment, if you skip this step, the flask app will run in production mode.   
    e) GOTO PART 3 TO SET UP THE MYSQL DATABASE AND CONTINUE FROM F AFTER DOING SO.   
    f) In the app.py script, fill in the correct place the following:   
    ```pyhton   
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://<mysql_username>:<mysql_password>@<mysql_host>:<mysql_port>/<mysql_db_name>'   
    db = SQLAlchemy(app)   
    ```     
    g) open a Python shell ad write the following:   
    ```python                               
    from app import db 
    db.create_all()    
    exit()      
    ```      
    That will create the tables on the MySQL server on your machine.   
    h) Now you are set, type "flask run" in the terminal and the backend will be running!      
    ----> NOTE: you can skip part c, d and h by running the 'run' windows command file on windows, just type run in the command prompt.       


3) Dowload and setup MySQL server:  
    a) Download and make sure that the "MySQL Community Server" is running.   
    b) Download "MySQL workbench" to visualize and help in creating the database.        
    c) Open MySQL Workbench and connect to your MySQL server, which will usually be running on port 3306, using the credentials you set when installing the MySQL server.   
    d) Create a new database named "watchlist" (Use MySQL Workbench for this)   


## How to setup and run the Frontend platform using React.   

1) Download NodeJS. You can do that from https://nodejs.org/en/download/       
2) Go to the watchlist-frontend folder ( its in the frontend folder) and write: 'npm install react-bootstrap bootstrap@4.6.0' in the command prompt window.      
3) Then run 'npm start' in the command prompt window to start the website. Note that you might need to run 'npm install' to install the dependinces needed for the project before npm start.        

## A brief description of the backend structure

a) Tables and database

The database is hosted on the MySQL server, it is called "watchlist". It is composed of the following Tables:

 - Anime     
    id:	                integer (int64)     
    name:   	        string     
    description:    	text       
    imgPath:            text         
    status:             string        
    altPic:             string            

 - Manga     
    id:	                integer (int64)     
    name:   	        string     
    description:    	text       
    imgPath:            text         
    status:             string        
    altPic:             string            


b) API routes        
All routes are in the 'app.py' file.        


c) Additional info
 - flask_marshmallow used for data serialization schemas
 - flask_bcrypt used for Bcrypt encryption algorithm used to create hashed passwords for users
 - flask_cors used to remove CORS restrictions
 - flask_sqlalchemy used to setup the SQL database

