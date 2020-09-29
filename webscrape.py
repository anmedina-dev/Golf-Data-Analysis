#libraries
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup
import csv
import functions
import time

#data: year, event, event scoring average, rankTW, rankLW, name, rounds, avg, totalStrokes, totalAdjustment, totalRounds
stats = []

#t060 is the most recent and the last tournament of the year
soup = functions.eventURLChanger('y2020', 't060')
tournamentSeason = soup.find('select', attrs = {'class': 'statistics-details-select--season'})

#Timing how long it takes to scrape
start = time.time()

#get data from every tournament from every year
#every year loop
for szn in tournamentSeason.findAll('option'):
    golfX = {}
    golfX['year'] = szn.text
    golfX['yearURL'] = szn['value']
    soupY = functions.eventNoURLChanger(golfX['yearURL'])
    tournamentEvent = soupY.find('select', attrs = {'class': 'statistics-details-select--tournament'})
    for tmnt in tournamentEvent.findAll('option'):
        #golfX = {}
        golfX['eventURL'] = tmnt['value']
        golfX['title'] = tmnt.text
        #print(golfX['title'])
        print(golfX['year'] + ' ' + golfX['title'])
        soupT = functions.eventURLChanger(golfX['yearURL'], golfX['eventURL'])
        table = soupT.find('table', attrs = {'id': 'statsTable'}).tbody
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
            stats.append([golfX['year'], golfX['title'], golfX['rankTW'], golfX['rankLW'], golfX['name'], golfX['rounds'], golfX['avg'], golfX['totalStrokes'], golfX['totalAdjustment'], golfX['totalRounds']])
            #stats.append([golfX['eventURL'], golfX['title'], golfX['rankTW'], golfX['rankLW'], golfX['name'], golfX['rounds'], golfX['avg'], golfX['totalStrokes'], golfX['totalAdjustment'], golfX['totalRounds']])


end = time.time()
print()
print((end-start))


filename = 'golf_scoring_stats.csv'
#fields = ['eventURL','title','rankTW','rankLW','name', 'rounds', 'avg', 'totalStrokes', 'totalAdjustment', 'totalRounds']
fields = ['Year', 'Title','Rank This Week','Rank Last Week','Name', 'Rounds', 'Average', 'Total Strokes', 'Total Adjustment', 'Total Rounds']
with open(filename, 'w', newline = '') as f:
    w = csv.writer(f)
    w.writerow(fields)
    w.writerows(stats)
