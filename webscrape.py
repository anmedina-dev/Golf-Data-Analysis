#libraries
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup
import csv

#data: year, event, event scoring average, rankTW, rankLW, name, rounds, avg, totalStrokes, totalAdjustment, totalRounds
stats = []

try:
    html = urlopen("https://www.pgatour.com/stats/stat.120.y2020.eoff.t013.html")
except HTTPError as e:
    #print HTTPError
    print(e)
else:

    soup = BeautifulSoup(html.read(),"html5lib")

    tournamentSeason = soup.find('select', attrs = {'class': 'statistics-details-select--season'})
    #print(table)
    #print(tournament)

    #get data from every tournament from every year
    #every year loop
    for szn in tournamentSeason.findAll('option'):
        golfX = {}
        golfX['year'] =
        tournamentEvent = soup.find('select', attrs = {'class': 'statistics-details-select--tournament'})
        table = soup.find('table', attrs = {'id': 'statsTable'}).tbody
        for tmnt in tournamentEvent.findAll('option'):
            golfX['urlValue'] = tmnt['value']
            #print(event['urlValue'])
            golfX['title'] = tmnt.text
"""
    for row in table.findAll('tr'):
        player = {}
        player['rankTW'] = row.td.text
        player['rankLW'] = row.td.text
        print(player['rankTW'])
"""
    #cats = soup.findAll("span", {"class": ["customSelectInner"]} )
    #tags = soup.findAll("tr")


    #for cat in cats:
    #   print(cat.getText())

    #for tag in tags:
     #   print(tag.getText())

    #print(soup.title)
