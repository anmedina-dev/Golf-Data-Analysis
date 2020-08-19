from urllib.request import urlopen

from urllib.error import HTTPError

import requests

from bs4 import BeautifulSoup
import csv

stats = []


try:

    html = urlopen("https://www.pgatour.com/content/pgatour/stats/stat.120.y2020.eoff.t013.html")
    url = "https://www.pgatour.com/content/pgatour/stats/stat.120.y2020.eoff.t013.html"
    r = requests.get(url)

except HTTPError as e:

    print(e)

else:

    res = BeautifulSoup(html.read(),"html5lib")
    start = 1

    table = res.find('tbody')

    for row in table.findAll('tr'):
        player = {}
        player['rankTW'] = row.td.text
        print(player['rankTW'])

    #cats = res.findAll("span", {"class": ["customSelectInner"]} )
    #tags = res.findAll("tr")
    

    #for cat in cats:
    #   print(cat.getText())
    
    #for tag in tags:
     #   print(tag.getText())

    #print(res.title)