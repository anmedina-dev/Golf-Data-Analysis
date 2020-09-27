#libraries
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup
import csv
import functions

#data: year, event, event scoring average, rankTW, rankLW, name, rounds, avg, totalStrokes, totalAdjustment, totalRounds
stats = []

#t060 is the most recent tournament
soup = functions.eventURLChanger('t060')
tournamentSeason = soup.find('select', attrs = {'class': 'statistics-details-select--season'})


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
        #functions.printGolfX(golfX)
        stats.append([golfX['eventURL'], golfX['title'], golfX['rankTW'], golfX['rankLW'], golfX['name'], golfX['rounds'], golfX['avg'], golfX['totalStrokes'], golfX['totalAdjustment'], golfX['totalRounds']])



filename = 'golf_scoring_stats.csv'
fields = ['eventURL','title','rankTW','rankLW','name', 'rounds', 'avg', 'totalStrokes', 'totalAdjustment', 'totalRounds']
with open(filename, 'w') as f:
    w = csv.writer(f)
    w.writerow(fields)
    w.writerows(stats)
