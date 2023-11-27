from bs4 import BeautifulSoup
import requests
import json


URL = "https://hospitality.usc.edu/residential-dining-menus/"
HEADERS = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36', 'Accept-Language': 'en-US, en;q=0.5'}
ALLERGENS = ["Dairy", "Eggs", "Fish", "Food Not Analyzed for Allergens", "Halal Ingredients", "Peanuts", "Pork", "Sesame", "Shellfish", "Soy", "Tree Nuts", "Vegan", "Vegetarian", "Wheat / Gluten"]


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
print(json.dumps(menu_data, indent=4))
