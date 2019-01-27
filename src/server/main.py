import smartcar
from flask import Flask, redirect, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# global variable to save our access_token
access = None

# dictionary that holds the vehicles in distance
vehicles = {}

client = smartcar.AuthClient(
    client_id='8eca448e-03f2-488f-98b1-31776e6c8662',
    client_secret='03206382-8351-429d-9f31-4ece3ce3c407',
    redirect_uri='http://localhost:80/exchange',
    scope=['read_vehicle_info', 'read_location'],
    test_mode=True
)


@app.route('/login', methods=['GET'])
def login():
    auth_url = client.get_auth_url()
    return redirect(auth_url)


@app.route('/exchange', methods=['GET'])
def exchange():
    code = request.args.get('code')

    # access our global variable and store our access tokens
    global access
    # in a production app you'll want to store this in some kind of
    # persistent storage
    access = client.exchange_code(code)
    return '', 200


@app.route('/get_vehicle_info', methods=['POST'])
def get_vehicle_info():
    # access our global variable to retrieve our access tokens
    global access

    # the list of vehicle ids
    vehicle_ids = smartcar.get_vehicle_ids(
        access['access_token'])['vehicles']

    # grab the vehicle that is closest to the latitude and longitude
    vehicle = get_closest_vehicle(vehicle_ids, latitude, longitude)

    vehicle = smartcar.Vehicle(response["vehicles"][0], access['access_token'])

    # return the vehicle information
    info = vehicle.info()
    return jsonify(info)


# return the closest vehicle to a latitude and longitude
def get_closest_vehicle(vehicle_ids, latitude, longitude):
    pass


if __name__ == '__main__':
    app.run(port=80)
