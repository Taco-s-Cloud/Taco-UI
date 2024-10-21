from flask import Flask, jsonify
from flask_cors import CORS
import os
from google.cloud.sql.connector import Connector, IPTypes
import pg8000
import sqlalchemy
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from your frontend

# Database connection setup
def connect_to_db():
    instance_connection_name = "cloud-computing-439018:us-central1:prod2"
    db_user = "user"
    db_pass = "user"
    db_name = "postgres"
    ip_type = IPTypes.PRIVATE if os.getenv("PRIVATE_IP") else IPTypes.PUBLIC

    connector = Connector()

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            instance_connection_name,
            "pg8000",
            user=db_user,
            password=db_pass,
            db=db_name,
            ip_type=ip_type,
        )
        return conn

    pool = sqlalchemy.create_engine(
        "postgresql+pg8000://",
        creator=getconn,
    )
    return pool

# Endpoint to retrieve existing users
@app.route('/users', methods=['GET'])
def get_users():
    db = connect_to_db()
    try:
        with db.connect() as conn:
            query = sqlalchemy.text("SELECT * FROM users;")
            result = conn.execute(query)
            users = [dict(row) for row in result]
            print(users)
            return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
