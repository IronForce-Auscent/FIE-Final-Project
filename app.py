from flask import *
import logging
import sqlite3
import logging
import json

app = Flask(__name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
file_handler = logging.FileHandler('devenv.log')
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

DB_URL = "devenv.db"
TABLE_NAME = "userdata"
USERNAME_DEV = "N0t_zH0nG1is_4cc0uN7" # I'm not a fan of hardcoding, but this is a development environment, so it's fine

# Logical functions
def connect_db():
    conn = sqlite3.connect(DB_URL)
    cursor = conn.cursor()
    logger.debug("Connected to database")
    return conn, cursor

def add_todo(title: str, description: str):
    try:
        data = json.loads(query_data("todo")[0][0])
        new_id = len(data) + 1
        data[new_id] = {"id": new_id, "title": title, "description": description, "status": "incomplete"}
        update_data(data, "todo")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when adding todo: {e}")

def remove_todo(id):
    try:
        data: dict = json.loads(query_data("todo")[0][0])
        data.pop(id)
        update_data(data, "todo")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when removing todo: {e}")

def update_data(data: any, category: str):
    conn, cursor = connect_db()
    try:
        cursor.execute(f"UPDATE {TABLE_NAME} SET {category} = (?) WHERE username = (?)", (json.dumps(data), USERNAME_DEV))
        conn.commit()
        logger.info(f"Inserted data {data} into category {category}")
        conn.close()
        logger.info("Connection closed")
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when inserting data {data} into category {category}: {e}")

def query_data(category: str):
    conn, cursor = connect_db()
    try:
        cursor.execute(f"SELECT {category} FROM {TABLE_NAME} WHERE username = (?)", (USERNAME_DEV,)) # Please for the love of god, whoever sees this code, don't do this in production
        data = cursor.fetchall()
        logger.info(f"Queried data for category {category}")
        conn.close()
        logger.info("Connection closed")
        return data
    except sqlite3.OperationalError as e:
        logger.error(f"Error called when querying data for category {category}: {e}")
        return []

# Flask endpoints

@app.route("/")
@app.route("/index")
def index():
    todo_data = json.loads(query_data("todo")[0][0])
    calender_data = json.loads(query_data("calander")[0][0])
    print(todo_data)
    print(calender_data)
    return render_template("index.html", todo_response = [value for _, value in todo_data.items()] if todo_data else [], calender_response = [value for _, value in calender_data.items()] if calender_data else [])

@app.route("/calander")
def calander():
    return render_template("calander.html") 

@app.route("/todo")
def todo():
    todo_data = json.loads(query_data("todo")[0][0])
    response = [value for _, value in todo_data.items()]
    logger.debug(f"Data queried: {response}")
    return render_template("todo.html", response = response if response else [])

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

if __name__ == "__main__":
    app.run(
        debug=True
    )