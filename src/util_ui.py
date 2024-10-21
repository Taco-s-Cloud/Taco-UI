from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from google.cloud.sql.connector import Connector, IPTypes
import pg8000
import sqlalchemy

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

db = connect_to_db()

# Endpoint to retrieve existing events
@app.route('/events', methods=['GET'])
def get_events():
    try:
        with db.connect() as conn:
            query = sqlalchemy.text("SELECT * FROM events;")
            result = conn.execute(query)
            
            # Fetch all rows
            rows = result.fetchall()
            print(f"Raw rows: {rows}")  # Log the retrieved rows
            
            # Retrieve column names
            columns = result.keys()  # Get the column names
            # Convert rows to dictionaries
            events = [dict(zip(columns, row)) for row in rows]  # Zip columns with each row
            return jsonify(events), 200
    except Exception as e:
        print(f"Error retrieving events: {e}")  # Log the error
        return jsonify({"error": str(e)}), 500


@app.route('/events', methods=['POST'])
def save_event():
    event = request.get_json()
    try:
        with db.connect() as conn:
            query = sqlalchemy.text('''
                INSERT INTO events (user_id, title, description, start_time, end_time, location, reminder)
                VALUES (:user_id, :title, :description, :start_time, :end_time, :location, :reminder)
            ''')
            conn.execute(query, {
                'user_id': event['user_id'],
                'title': event['title'],
                'description': event.get('description'),
                'start_time': event['start_time'],
                'end_time': event['end_time'],
                'location': event.get('location'),
                'reminder': event.get('reminder')
            })
            conn.commit()  # Ensure to commit the transaction
            return jsonify({"message": "Event saved"}), 201
    except Exception as e:
        print(f"Error saving event: {e}")  # Log the error
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
