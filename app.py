from flask import Flask, render_template, url_for, redirect, request, session, g
from flask.json import jsonify
from flask_socketio import SocketIO, send
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random

'''
DATABASE_SCHEMA
    
SQLITE -> USER DATA
'''

app = Flask(__name__)
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Users.db'
app.config['SECRET_KEY'] = 'amJ`nH@}{~#1-..sd<.d":aJf2*4Mr6%OJt@h$9%*6$*-l'
socketio = SocketIO(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True)
    password = db.Column(db.String())

    like1 = db.Column(db.String())
    like2 = db.Column(db.String())
    like3 = db.Column(db.String())
    dislike = db.Column(db.String())

    def __repr__(self):
        return f'{self.id}.{self.username}'

app.secret_key = 'An4aa(and5}{\]d[f||Asdm14;kd-03L,LK*@#HD#!ah3DSFsad()u)(#$'

@app.before_request
def before_request():
    g.user = None

    if 'user_id' in session:
        for user in User.query.all():
            if session['user_id'] == user.id:
                g.user = user
                break


@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session.pop('user_id', None)
        username = request.form['username']
        password = request.form['password']
        for u in User.query.all():
            if u.username == username and u.password == password:
                session['user_id'] = u.id
                return redirect('/chat')
        return render_template('login.html', err="Invalid Credentials")
    else:
        return render_template('login.html', err='')

@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username=request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        for u in User.query.all():
            if username == u.username:
                return render_template('register.html', err="Sorry, username taken.")
            elif password != confirm_password:
                return render_template('register.html', err="Passwords do not match!")

        likes = request.form.getlist('likes')
        three_likes = random.sample(likes, 3)

        try:
            new_user = User(username=username, password=password, like1=three_likes[0], like2=three_likes[1], like3=three_likes[2])
            db.session.add(new_user)
            db.session.commit()
        except:
            return 'Something went wrong with the database!'
        return render_template('login.html', err='')
    else:
        return render_template('register.html', err='')

@socketio.on('message')
def handle_message(msg):
    print(msg)
    send(msg, broadcast=True)

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if not g.user:
        return redirect('/login')
    return render_template('chat.html')

@app.route('/getuser')
def getUser():
    if(g.user):
        userJSON = {
            'id':g.user.id,
            'username': g.user.username
        }
        return jsonify(userJSON)
    else:
        return redirect('/login')


@app.route('/i2')
def i_two():
    return render_template('temp.html')

if __name__ == '__main__':
    socketio.run(app)