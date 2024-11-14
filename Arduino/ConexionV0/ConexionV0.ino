const int extractorPin = 2;
const int ventanaPin = 3;
const int ledRojoPin = 4;
const int sensorTrig = 11;
const int sensorEcho = 12;

float ppm, vpppm, Snr; //Snr = sensor 
bool estadoExtractor, estadoVentana, estadoLedRojo;

void setup() {
  pinMode(extractorPin, OUTPUT);
  pinMode(ventanaPin, OUTPUT);
  pinMode(ledRojoPin, OUTPUT);
  pinMode(sensorTrig, OUTPUT);
  pinMode(sensorEcho, INPUT);

  ppm = 0;
  vpppm = 1200;
  estadoExtractor = false;
  estadoVentana = false;
  estadoLedRojo = false;

/* con el echo y trig hay algunos cambios en la calibracion del sensor,
asi q ns si estara bn, hay q probar*/
  for (int i = 0; i < 100; i++) {
    Snr += analogRead(sensorEcho);
  }
  Snr /= 100;
}

void loop() {
  long tiempo = pulseIn(sensorEcho, HIGH);
  ppm = 343.0 * tiempo / 2.0 / 1000.0;

  if (ppm > vpppm) {
    estadoExtractor = true;
    estadoVentana = true;
    estadoLedRojo = true;
  } else {
    estadoExtractor = false;
    estadoVentana = false;
    estadoLedRojo = false;
  }

  digitalWrite(extractorPin, estadoExtractor ? HIGH : LOW);
  digitalWrite(ventanaPin, estadoVentana ? HIGH : LOW);
  digitalWrite(ledRojoPin, estadoLedRojo ? HIGH : LOW);
}