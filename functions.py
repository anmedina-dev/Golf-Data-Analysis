#libraries
from urllib.request import urlopen
from urllib.error import HTTPError
import requests
from bs4 import BeautifulSoup

#changes the url to a different event in the same year
def eventURLChanger(eventURL):
    html = urlopen("https://www.pgatour.com/stats/stat.120.y2020.eoff.{}.html".format(eventURL))
    soup = BeautifulSoup(html.read(),"html5lib")
    return(soup)
