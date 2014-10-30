from kodemon import kodemon
import requests
import json

#import RPi.GPIO as GPIO
import time

#GPIO.setmode(GPIO.BOARD)

#GPIO.setup(7,GPIO.OUT)

#p = GPIO.PWM(7,50)
# p.start(7.5)

city = "Orlando"

#tempature: servoPulse
tempMap = {
	"35": 3.0,
	"30": 4.0,
	"25": 5.0,
	"20": 6.0,
	"15": 7.5,
	"10": 8.0,
	"5": 9.0,
	"0": 10,
	"-5": 11,
	"-10": 12.5
}

@kodemon
def getTemp():

	r = requests.get(r'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric')

	data = r.json()

	currentTemp = data['main']['temp']

	print city, "   ", currentTemp, " degrees"

getTemp()
