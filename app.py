from flask import Flask
from flask_restful import Api
import resources
import STATIC

app = Flask(__name__)
api = Api(app)

api.add_resource(resources.HelloWorld, '/hello/')
api.add_resource(resources.DockerId, '/DID')

@app.route('/')
def home():
    return f'<center><h1>Hello, world</h1></center>'
if __name__ == '__main__':
    app.run(debug=STATIC.DEBUG, host=STATIC.HOST)