import os
from flask_restful import Resource

class DockerId(Resource):
    def get(self):
        return {'ID': str(os.uname()[1])}
