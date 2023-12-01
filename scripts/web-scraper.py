from bs4 import BeautifulSoup
import requests
import json
import mysql.connector
import datetime


URL = "https://hospitality.usc.edu/residential-dining-menus/"
HEADERS = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'}
ALLERGENS = ["Dairy", "Eggs", "Fish", "Food Not Analyzed for Allergens", "Halal Ingredients", "Peanuts", "Pork", "Sesame", "Shellfish", "Soy", "Tree Nuts", "Vegan", "Vegetarian", "Wheat / Gluten"]


def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='201Group',
            user='root',
            password='root'
        )
        return connection
    except mysql.connector.Error as e:
        print("Error while connecting to MySQL", e)
        return None

def insert_menu(dining_hall_name, menu_item, date):
    connection = get_connection()
    if connection is not None:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO Menu (diningHallName, menuItem, date) VALUES (%s, %s, %s)"
            cursor.execute(query, (dining_hall_name, menu_item, date))
            connection.commit()
            return 1
        except mysql.connector.Error as e:
            print("Failed to insert menu item:", e)
            return -2
        finally:
            connection.close()
    else:
        return -1

def clear_table():
    connection = get_connection()
    if connection is not None:
        try:
            cursor = connection.cursor()
            cursor.execute("TRUNCATE TABLE Menu")
            connection.commit()
            print("Table cleared successfully")
        except mysql.connector.Error as e:
            print("Error clearing table:", e)
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

def format_menu_item(item):
    for allergen in ALLERGENS:
        if allergen in item:
            item = item.split(allergen)[0].strip()
            break
    return item

def get_menu_data():
    response = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(response.content, "html.parser")
    meal_sections = soup.find_all('div', class_='hsp-accordian-container')

    menu_data = {}

    for meal_section in meal_sections:
        meal_time = meal_section.find('span', class_='fw-accordion-title-inner').text.split(" for today")[0]
        dining_halls = meal_section.find_all('div', class_='col-sm-6 col-md-4')

        for hall in dining_halls:
            hall_name = hall.find('h3', class_='menu-venue-title').text.strip()
            menu_items = hall.find_all('li')
            cleaned_items = [format_menu_item(item.text.strip()) for item in menu_items]

            if hall_name not in menu_data:
                menu_data[hall_name] = {}
            menu_data[hall_name][meal_time] = cleaned_items

    return menu_data

menu_data = get_menu_data()
clear_table()
count = 0

for dining_hall, meals in menu_data.items():
    for meal_time, items in meals.items():
        for item in items:
            if(item == ""):
                continue
            current_date = datetime.date.today()
            if(insert_menu(dining_hall, item, current_date) == 1):
                count += 1

print(count, "items inserted")