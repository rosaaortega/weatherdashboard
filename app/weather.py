from flask import render_template
from app import app
import requests
from json import loads


@app.route('/', defaults={'city': 'Obregon','scale': 'M'})
@app.route('/<city>/<scale>/', methods=['GET'])
def index(city,scale):
    url = 'https://api.weatherbit.io/v2.0/forecast/daily?city=%s&country=MX&state=Sonora&days=15&units=%s&key=2203a9396b6a4d4cbb4d32a86bfc4320'%(city,scale)
    try:
        req = requests.get(url=url)
        response_text = req.text
    except URLError:
        raise ValidationError(_("Server not found."))
    response_dict = loads(response_text)
    data = [{'x': r['datetime'], 'y': r['temp']} for r in response_dict['data']]
    return render_template('index.html', city=city, scale=scale, data=data)

