#libraries
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup

#changes the url to a different event in the same year
def eventURLChanger(eventURL):
    html = urlopen("https://www.pgatour.com/content/pgatour/stats/stat.120.y2020.eoff.{}.html".format(eventURL))
    soup = BeautifulSoup(html.read(),"html5lib")
    return(soup)

def printGolfX(golfX):
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
        print(golfX)
        return()
