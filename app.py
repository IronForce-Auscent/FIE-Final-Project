from datetime import datetime
from flask import *

import logging
import sqlite3
import json
import random
import string

app = Flask(__name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
file_handler = logging.FileHandler('devenv.log', mode="w")
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

DB_URL = "devenv.db"
TABLE_NAME = "userdata"
USERNAME_DEV = "N0t_zH0nG1is_4cc0uN7" # I'm not a fan of hardcoding, but this is a development environment, so it's fine

# Logical functions
def connect_db() -> tuple[sqlite3.Connection, sqlite3.Cursor]:
    conn = sqlite3.connect(DB_URL)
    cursor = conn.cursor()
    logger.debug("Connected to database")
    return conn, cursor

def update_data(data: any, category: str) -> None:
    conn, cursor = connect_db()
    try:
        cursor.execute(f"UPDATE {TABLE_NAME} SET {category} = (?) WHERE username = (?)", (json.dumps(data), USERNAME_DEV))
        conn.commit()
        logger.info(f"Inserted data {data} into category {category}")
        conn.close()
        logger.info("Connection closed")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when inserting data {data} into category {category}: {e}")

def query_data(category: str) -> dict | list:
    conn, cursor = connect_db()
    try:
        cursor.execute(f"SELECT {category} FROM {TABLE_NAME} WHERE username = (?)", (USERNAME_DEV,)) # Please for the love of god, whoever sees this code, don't do this in production
        data = cursor.fetchall()
        logger.info(f"Queried data for category {category}")
        conn.close()
        logger.info("Connection closed")
        return json.loads(data[0][0]) if data else {}
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when querying data for category {category}: {e}")
        return []
    
def generate_id(data: dict) -> str:
    random.seed(str(data).encode())
    return "".join(random.choices(string.ascii_letters + string.digits, k=8))

# Endpoint-specific functions

def add_todo(title: str, description: str):
    try:
        data = query_data("todo")
        new_id = len(data) + 1
        data[new_id] = {"id": new_id, "title": title, "description": description, "status": "incomplete"}
        update_data(data, "todo")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when adding todo: {e}")

def remove_todo(id):
    try:
        data = query_data("todo")
        data.pop(id)
        update_data(data, "todo")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when removing todo: {e}")

def add_calender(title: str, description: str, date: str | list[str], event_type: str):
    """
    Expected data format:
    
    [
      {
        id: 'bHay68s', // Event's ID (required)
        name: "New Year", // Event name (required)
        date: "January/1/2020", // Event date (required)
        type: "holiday", // Event type (required)
        everyYear: true // Same event every year (optional)
      },
      {
        name: "Vacation Leave",
        badge: "02/13 - 02/15", // Event badge (optional)
        date: ["February/13/2020", "February/15/2020"], // Date range
        description: "Vacation leave for 3 days.", // Event description (optional)
        type: "event",
        color: "#63d867" // Event custom color (optional)
      }
    ]
    """
    if type(date) == str:
        date = datetime.strptime(date, "%Y-%m-%d").strftime("%B/%d/%Y")
    try:
        data = query_data("calander")
        new_id = len(data) + 1
        new_entry = {
            "name": title,
            "date": date,
            "type": event_type,
            "description": description
        }
        entry_id = generate_id(new_entry)
        new_entry["id"] = entry_id
        data[new_id] = new_entry
        update_data(data, "calander")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when adding calander event: {e}")

def remove_calender(id):
    try:
        data = query_data("calander")
        data.pop(id)
        update_data(data, "calander")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when removing calander event: {e}")

def get_calender_events():
    try:
        data = query_data("calander")
        return [value for _, value in data.items()] if data else []
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when getting calander events: {e}")
        return []

# Data endpoints

@app.route("/query/<category>", methods=["GET"])
def query(category: str):
    try:
        data = query_data(category)
        response = [value for _, value in data.items()] if data else []
        return response
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when querying data for category {category}: {e}")
        return []

@app.route("/calander/<method>", methods=["POST", "GET"])
def calander_method(method: str):
    if request:
        if method == "add":
            title = request.form.get("eventName")
            description = request.form.get("eventDesc")
            date = request.form.get("eventDate")
            event_type = request.form.get("eventType")
            add_calender(title, description, date, event_type)
        elif method == "remove":
            id = request.form.get("id")
            remove_calender(str(id))
        elif method == "clear":
            # God bless all that data, hope you didn't need it
            update_data({}, "calander")
    return redirect(url_for("calander"))

@app.route("/todo/<method>", methods=["POST"])
def todo_method(method: str):
    if request:
        if method == "add":
            title = request.form.get("taskName")
            description = request.form.get("taskDesc")
            add_todo(title, description)
        elif method == "remove":
            id = request.form.get("id")
            remove_todo(str(id))
        elif method == "clear":
            # God bless all that data, hope you didn't need it
            update_data({}, "todo")
    return redirect(url_for("todo"))

# Flask endpoints

@app.route("/")
@app.route("/index")
def index():
    todo_data = query_data("todo")
    calender_data = query_data("calander")
    return render_template("index.html", todo_response = [value for _, value in todo_data.items()] if todo_data else [], calender_response = [value for _, value in calender_data.items()] if calender_data else [])

@app.route("/calender")
def calander():
    return render_template("calender.html") 

@app.route("/todo")
def todo():
    todo_data = query_data("todo")
    response = [value for _, value in todo_data.items()] if todo_data else []
    return render_template("todo.html", response = response)

@app.route("/pomodoro")
def pomodoro_timer():
    presets = query_data("tools")["pomodoro"]
    return render_template("pomodoro.html", presets=presets)

@app.route("/notes")
def notes():
    stored_notes = query_data("tools")["notes"]
    return render_template("notes.html", notes=stored_notes)  


if __name__ == "__main__":
    """ app.run(
        debug=True,
        host="0.0.0.0",
        port=12345
    ) """
    app.run(debug=True)
