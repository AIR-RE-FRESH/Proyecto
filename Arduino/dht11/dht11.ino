#include <WiFiManager.h>  // https://github.com/tzapu/WiFiManager
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHTesp.h>

// Pines y definiciones
int pinDHT = 26;
DHTesp dht;

#define servidor "http://10.10.2.43:8000/api/guardar"

// Variables para obtener la MAC
byte mac[6];
char mac_Id[18];

void setup() {
  Serial.begin(115200);

  // Inicializar el sensor DHT
  dht.setup(pinDHT, DHTesp::DHT11);
  Serial.println("Iniciando DHT11...");

  // Conexión WiFi
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
  // Leer y enviar los datos del sensor DHT11
  EnviarDatos();
  delay(10000);  // Intervalo de envío de datos cada 10 segundos
}

// Función para enviar los datos al servidor
void EnviarDatos() {
  TempAndHumidity data = dht.getTempAndHumidity();
  float temperatura = data.temperature;
  float humedad = data.humidity;

  // Verificamos que los datos no sean NaN
  if (isnan(temperatura) || isnan(humedad)) {
    Serial.println("Error en la lectura del DHT11");
    return;
  }

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, servidor);  // Iniciar la conexión al servidor
    http.addHeader("User-Agent", "insomina/2023.5.8");
    http.addHeader("content-type", "application/json");

    // Obtener la MAC del dispositivo
    WiFi.macAddress(mac);
    snprintf(mac_Id, sizeof(mac_Id), "%02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
    Serial.println(mac_Id);

    // Crear la cadena JSON con los datos de los sensores
    String httpRequestData = "{\"Datos\":[{\"MAC\":\"" + String(mac_Id) + "\",\"Temperatura\":\"" + String(temperatura, 2) + "\",\"Humedad\":\"" + String(humedad, 1) + "\"}]}";

    // Enviar la solicitud POST
    Serial.println("Enviando datos: " + httpRequestData);
    int httpResponseCode = http.POST(httpRequestData);
    Serial.print("Código de respuesta HTTP: ");
    Serial.println(httpResponseCode);

    http.end();  // Finalizar conexión
  } else {
    Serial.println("WiFi Desconectado");
  }
}
