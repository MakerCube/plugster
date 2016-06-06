#include <Bridge.h>
#include <YunClient.h>
#define ARDUINO_PLATFORM
#include "M2XStreamClient.h"

char deviceId[] = "<FILL IN DEVICE ID HERE>"; // Device ID you want to push to
char plugStream[] = "<FILL IN PLUG STREAM NAME HERE>"; // Name of plug stream
char fireStream[] = "<FILL IN FIRE STREAM NAME HERE>"; // Name of fire stream
char m2xKey[] = "<FILL IN M2X ACCESS KEY HERE>"; // Your M2X access key


int ledPin = 13;
int plugDigitalInPin = 7;
int fireDigitalInPin = 3;
const int redPin = 11;
const int greenPin = 10;
const int bluePin = 9;
int fireChecker = 5;
int plugChecker = 5;
int buzzer = 2;
int buzzerChecker = 0;

YunClient client;
M2XStreamClient m2xClient(&client, m2xKey);

void setup() {
  Serial.begin(9600);
  
  // For debugging, wait until the serial console is connected
  delay(4000);
  while(!Serial);
  Bridge.begin();
  
  // Initialize pins
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(plugDigitalInPin, INPUT);
  pinMode(fireDigitalInPin, INPUT);
  pinMode(buzzer, OUTPUT);


  Serial.println("Setup complete.\n");
}

void loop() {
  boolean fireDetection = digitalRead(fireDigitalInPin);
  boolean plugDetection = digitalRead(plugDigitalInPin);
  
  if (fireChecker == 5) {
    fireChecker = digitalRead(fireDigitalInPin);
  }

  if (plugChecker == 5) {
    plugChecker = digitalRead(plugDigitalInPin);
  }

  if (fireDetection != fireChecker) {
    Serial.println("fireDetection not same as fireChecker");
    if (fireDetection == HIGH) {
      digitalWrite(ledPin, HIGH);
      int response = m2xClient.updateStreamValue(deviceId, fireStream, 1);
      Serial.println("M2x Client response code: ");
      Serial.println(response);
      fireChecker = fireDetection;
      buzzerChecker = 1;
    } else {
      digitalWrite(ledPin, LOW);
      digitalWrite(buzzer, LOW);
      int response = m2xClient.updateStreamValue(deviceId, fireStream, 0);
      Serial.println("M2x Client response code: ");
      Serial.println(response);
      fireChecker = fireDetection;
      buzzerChecker = 0;
    }
  }

  if (plugDetection != plugChecker) {
    Serial.println("plugDetection not same as plugChecker");
    if (plugDetection == HIGH) {
      color(0, 0, 0);
      int response = m2xClient.updateStreamValue(deviceId, plugStream, 0);
      Serial.println("M2x Client response code: ");
      Serial.println(response);
      plugChecker = plugDetection;
    } else {
      color(255, 0, 0);
      int response = m2xClient.updateStreamValue(deviceId, plugStream, 1);
      Serial.println("M2x Client response code: ");
      Serial.println(response);
      plugChecker = plugDetection;
    }
  }
  if (buzzerChecker == 1) {
    digitalWrite(buzzer, HIGH);
    digitalWrite(buzzer, LOW);
  }
}

void color (unsigned char red, unsigned char green, unsigned char blue) {    
  analogWrite(redPin, red);
  analogWrite(bluePin, blue);
  analogWrite(greenPin, green);
}
