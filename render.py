from jinja2 import Environment, FileSystemLoader, select_autoescape
from jinja2 import exceptions
import argparse
import os

"""
Utility script to render HTML files using Jinja2 templates.
I don't know why I decided to over-engineer this when I can just use
a Flask application, but whatever it was fun making this and
trying to debug
"""

def build(file: list):
    if len(file) < 1 or file[0] == None: 
        files = [f for f in os.listdir("templates") if f.endswith(".html") and f != "base.html"]
    else:
        files = file

    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=select_autoescape()
    )
    err_files = []
    for file in files:
        try:
            template = env.get_template(file)
            with open(file, "w") as f:
                f.write(template.render())
        except exceptions.TemplateNotFound as TemplateNotFound:
            print(f"Error: HTML file \'{file}\' not found. Continuing to render other files...")
            err_files.append(file)
            continue
    if len(err_files) <= 0:
        print(f"The following files were successfully rendered: {files}")
    else:
        print(f"The following files were not found/were not able to be rendered: {err_files}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Render HTML files using Jinja2 templates.")
    parser.add_argument("-f", "-file", dest="file_name", help="Name of the HTML file to render. Leave empty to render all", required=False)
    args = parser.parse_args()

    build([args.file_name])
