import os
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/hello/')

@app.route('/')
def home():
    return f'<center><h1>Hello, world</h1></center><br/><center>' +  str(os.uname()[1]) + '</center>'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')