#libraries
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup
import csv
import functions

#data: year, event, event scoring average, rankTW, rankLW, name, rounds, avg, totalStrokes, totalAdjustment, totalRounds
stats = []
"""
try:
    html = urlopen("https://www.pgatour.com/stats/stat.120.y2020.eoff.t013.html")
except HTTPError as e:
    #print HTTPError
    print(e)
else:
"""
#soup = BeautifulSoup(html.read(),"html5lib")
soup = functions.eventURLChanger('t013')
tournamentSeason = soup.find('select', attrs = {'class': 'statistics-details-select--season'})
#print(table)
#print(tournament)


#get data from every tournament from every year
#every year loop
"""
for szn in tournamentSeason.findAll('option'):
    golfX = {}
    golfX['year'] = szn.text
    golfX['yearURL'] = szn['value']

"""
tournamentEvent = soup.find('select', attrs = {'class': 'statistics-details-select--tournament'})
table = soup.find('table', attrs = {'id': 'statsTable'}).tbody
for tmnt in tournamentEvent.findAll('option'):
    golfX = {}
    golfX['eventURL'] = tmnt['value']
    #print(event['urlValue'])
    golfX['title'] = tmnt.text
    #golfX['event']
    print(golfX['title'])
    table = soup.find('table', attrs = {'id': 'statsTable'}).tbody
    for row in table.findAll('tr'):
        golfX['rankTW'] = row.select('td')[0].text.strip()
        golfX['rankLW'] = row.select('td')[1].text.strip()
        golfX['name'] = row.select('td')[2].text.strip()
        golfX['rounds'] = row.select('td')[3].text
        golfX['avg'] = row.select('td')[4].text
        golfX['totalStrokes'] = row.select('td')[5].text
        golfX['totalAdjustment'] = row.select('td')[6].text
        golfX['totalRounds'] = row.select('td')[7].text
        print(golfX['rankTW'])
        print(golfX['rankLW'])
        print(golfX['name'])
        print(golfX['rounds'])
        print(golfX['avg'])
        print(golfX['totalStrokes'])
        print(golfX['totalAdjustment'])
        print(golfX['totalRounds'])
        print(golfX['eventURL'])
        print(golfX['title'])
        stats.append(golfX)
        break

filename = 'golf_stats.csv'
with open(filename, 'w', newline='') as f:
    w = csv.DictWriter(f,['eventURL','title','rankTW','rankLW','name', 'rounds', 'avg', 'totalStrokes', 'totalAdjustment', 'totalRounds'])
    w.writeheader()
    for stat in stats:
        w.writerow(stat)
