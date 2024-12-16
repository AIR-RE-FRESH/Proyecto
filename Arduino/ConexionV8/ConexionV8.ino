#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <WiFi.h>
#include <HTTPClient.h>
#include <MQUnifiedsensor.h>
#include <DHTesp.h>
#include <Adafruit_BMP085.h>

// Pines y definiciones
int pinDHT = 26;
DHTesp dht;
Adafruit_BMP085 bmp;

#define placa "ESP32"
#define Voltage_Resolution 3.3
#define pinAOUT 2
#define type "MQ-7"
#define ADC_Bit_Resolution 12
#define RatioMQ7CleanAir 27.5

MQUnifiedsensor MQ7(placa, Voltage_Resolution, ADC_Bit_Resolution, pinAOUT, type);

const char* serverName = "http://10.10.2.43:8000/api/guardar";

byte mac[6];
char mac_Id[18];

const int RELAY_PIN = 13;  // Ventilador

void setup() {
  Serial.begin(115200);

  // Configuración del pin del relé
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  dht.setup(pinDHT, DHTesp::DHT11);

  MQ7.setRegressionMethod(1);
  MQ7.setA(99.042);
  MQ7.setB(-1.518);
  MQ7.init();

  Serial.print("Calibrando...");
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ7.update();
    calcR0 += MQ7.calibrate(RatioMQ7CleanAir);
    Serial.print(".");
    delay(500);
  }
  calcR0 /= 10;
  MQ7.setR0(calcR0);
  Serial.println(" Calibración completada.");

  if (isinf(calcR0) || calcR0 == 0) {
    Serial.println("Error en la calibración. Verificar cableado.");
    while (1);
  }

  if (!bmp.begin()) {
    Serial.println("Error: Sensor BMP no encontrado.");
    while (1);
  }

  WiFiManager wm;
  wm.setConfigPortalTimeout(300);
  bool res = wm.autoConnect("pasantes", "pasantes");
  if (!res) {
    Serial.println("Fallo la conexión WiFi");
  } else {
    Serial.println("Conectado a WiFi");
  }
}

void loop() {
  controlarRele();
  EnvioDatos();
  delay(10000);
}

void controlarRele() {
  MQ7.update();
  float ppm = MQ7.readSensor();

  TempAndHumidity data = dht.getTempAndHumidity();
  float temperatura = data.temperature;
  float humedad = data.humidity + 19;

  float presion = bmp.readPressure() / 100.0;

  if ((temperatura < 12 || temperatura > 30) ||
      (humedad < 30 || humedad > 60) ||
      (ppm >= 1.0) ||
      (presion < 900 || presion > 1100)) {
    digitalWrite(RELAY_PIN, HIGH);
    Serial.println("Ventilador ACTIVADO");
  } else {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("Ventilador APAGADO");
  }
}

void EnvioDatos() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverName);
    http.addHeader("User-Agent", "insomina/2023.5.8");
    http.addHeader("content-type", "application/json");

    WiFi.macAddress(mac);
    snprintf(mac_Id, sizeof(mac_Id), "%02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
    Serial.println(mac_Id);

    MQ7.update();
    float ppm = MQ7.readSensor();

    TempAndHumidity data = dht.getTempAndHumidity();
    float temperatura = data.temperature;
    float humedad = data.humidity + 19;

    float presion = bmp.readPressure() / 100.0;

    String httpRequestData = "{\"Datos\":[{\"MAC\":\"" + String(mac_Id) + "\",\"Temperatura\":\"" + String(temperatura, 2) + "\",\"Humedad\":\"" + String(humedad, 1) + "\",\"Gas\":\"" + String(ppm, 1) + "\",\"Presion\":\"" + String(presion, 2) + "\"}]}";

    Serial.println("Enviando datos: " + httpRequestData);
    int httpResponseCode = http.POST(httpRequestData);
    Serial.print("Código de respuesta HTTP: ");
    Serial.println(httpResponseCode);

    http.end();
  } else {
    Serial.println("WiFi Desconectado");
  }
}
