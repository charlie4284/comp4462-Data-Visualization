from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import time
import random

# https://www.billboard.com/charts/billboard-200/2019-02-09
web_link = 'https://www.billboard.com/charts/hot-100/'
info_web_link ='https://tunebat.com/Search?q='
years = ['2015', '2016', '2017', '2018', '2019']
months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
date = '03'

def findCorrectInfo(soup_array, artist_name):
        for soup in soup_array:
                artist = soup.find('div', attrs={'class':'row search-artist-name'})
                if artist_name.split()[0] in artist.text :
                        imgurl = soup.find('img')['src']
                        hyperlink = soup.find('a')
                        link = 'https://tunebat.com' + hyperlink['href']
                        time.sleep(random.randint(0,3))
                        req = Request(link, headers={'User-Agent': 'Mozilla/5.0'})
                        page = urlopen(req).read()
                        song_soup = BeautifulSoup(page, 'html.parser')
                        song_info = song_soup.findAll('div', attrs={'class':'row main-attribute-value'})
                        key = song_info[0].text
                        camelot = song_info[1].text
                        duration = song_info[2].text
                        bpm = song_info[3].text
                        metadata = song_soup.findAll('td', attrs={'class':'attribute-table-element'})
                        energy = metadata[0].text
                        danceability = metadata[0].text
                        happiness = metadata[0].text
                        loudness = metadata[0].text
                        acousticness = metadata[0].text
                        instrumentalness = metadata[0].text
                        liveness = metadata[0].text
                        speechiness = metadata[0].text
                        return imgurl, key, camelot, duration, bpm, energy, danceability, happiness, loudness, acousticness, instrumentalness, liveness, speechiness 
                else:
                        print('not found: ', artist_name, ' ', artist)
                        continue
        print('no final results found')
        return 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'


for year in years: 
    for month in months:
        if year in ('2015', '2016', '2017'):
                print('skipping: ', year )
                continue
        f = open('./data/'+year+month+'.jsonl','a+')
        link = web_link + year + '-' + month + '-' + date
        req = Request(link, headers={'User-Agent': 'Mozilla/5.0'})
        page = urlopen(req).read()
        soup = BeautifulSoup(page, 'html.parser')
        items = soup.findAll('div', attrs={'class':'chart-list-item'})
        first_title = soup.find('div', attrs={'class':'chart-number-one__title'}).text
        first_artist = soup.find('div', attrs={'class':'chart-number-one__artist'}).text.strip('\n')
        info_link = info_web_link+first_title.replace(" ","+")
        info_req = Request(info_link, headers={'User-Agent': "Mozilla/5.0"})
        info_page = urlopen(info_req).read()
        info_soup = BeautifulSoup(info_page, 'html.parser')
        info_items = info_soup.findAll('div', attrs={'class':'searchResultNode col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'})
        imgurl, key, camelot, duration, bpm, energy, danceability, happiness, loudness, acousticness, instrumentalness, liveness, speechiness = findCorrectInfo(info_items, first_artist)
        first_string = '{ "rank":' + '"' +'1'+ '", ' + '"artist":' + '"'+ first_artist+ '", ' + '"title":' + '"'+ first_title + '", ' + '"bpm":' + '"' + bpm + '", ' + '"camelot":' + '"' + camelot +  '", ' + '"key":' + '"' + key + '", ' + '"duration":' + '"' + duration + '", ' + '"energy":' + '"' + energy + '", ' + '"danceability":' + '"' + danceability + '", ' + '"happiness":' + '"' + happiness + '", ' + '"loudness":' + '"' + loudness + '", ' + '"acousticness":' + '"' + acousticness + '", ' + '"instrumentalness":' + '"' + instrumentalness + '", ' + '"liveness":' + '"' + liveness + '", ' + '"speechiness":' + '"' + speechiness + '", ' + '"imgurl":' + '"' + imgurl +'"' + ' }\n'
        f.write(first_string)
        print(first_string)
        for item in items:
                info_link = info_web_link+item['data-title'].replace(" ","+")
                time.sleep(random.randint(0,3))
                info_req = Request(info_link, headers={'User-Agent': "Mozilla/5.0"})
                info_page = urlopen(info_req).read()
                info_soup = BeautifulSoup(info_page, 'html.parser')
                info_items = info_soup.findAll('div', attrs={'class':'searchResultNode col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'})
                imgurl, key, camelot, duration, bpm, energy, danceability, happiness, loudness, acousticness, instrumentalness, liveness, speechiness = findCorrectInfo(info_items, item['data-artist'])

                string = '{ "rank":' + '"' + item['data-rank']+ '", ' + '"artist":' + '"'+ item['data-artist']+ '", ' + '"title":' + '"'+ item['data-title'] + '", ' + '"bpm":' + '"' + bpm + '", ' + '"camelot":' + '"' + camelot +  '", ' + '"key":' + '"' + key + '", ' + '"duration":' + '"' + duration + '", ' + '"energy":' + '"' + energy + '", ' + '"danceability":' + '"' + danceability + '", ' + '"happiness":' + '"' + happiness + '", ' + '"loudness":' + '"' + loudness + '", ' + '"acousticness":' + '"' + acousticness + '", ' + '"instrumentalness":' + '"' + instrumentalness + '", ' + '"liveness":' + '"' + liveness + '", ' + '"speechiness":' + '"' + speechiness + '", ' + '"imgurl":' + '"' + imgurl +'"' + ' }\n'
                f.write(string)
                print(string)
        f.close()