#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <WiFi.h>
#include <HTTPClient.h>
#include <MQUnifiedsensor.h>
#include <DHTesp.h>
#include <WiFiClientSecure.h>

// Pines y definiciones
int pinDHT = 26;
DHTesp dht;

#define A_PIN A6
#define VOLTAGE 5
#define placa "ESP32"
#define Voltage_Resolution 5
#define type "MQ-7"
#define ADC_Bit_Resolution 10
#define RatioMQ7CleanAir 27.5

MQUnifiedsensor MQ7(placa, Voltage_Resolution, ADC_Bit_Resolution, A_PIN, type);

// URL del servidor
const char* serverName = "http://192.168.100.10/api/guardar";

// Variables para obtener la MAC
byte mac[6];
char mac_Id[18];

void setup() {
  Serial.begin(115200);

  // Inicializar el sensor DHT
  dht.setup(pinDHT, DHTesp::DHT11);

  Serial.println("");

  // Configurar el sensor MQ-7
  MQ7.setRegressionMethod(1); // _PPM =  a*ratio^b
  MQ7.setA(99.042); 
  MQ7.setB(-1.518); // Ecuación para CO
  MQ7.init(); // Inicializar el sensor

  //Realizar calibración inicial
  if (!CalibrarMQ7()) {
    Serial.println("Error en la calibración inicial. Verifica las conexiones.");
    while (1);
  }

  // Conexión WiFi
  WiFiManager wm;
  wm.setConfigPortalTimeout(300); // Tiempo límite para la configuración del portal
  bool res = wm.autoConnect("pasantes", "pasantes");  // SSID y contraseña
  if (!res) {
    Serial.println("Fallo la conexión");
  } else {
    Serial.println("Conectado a WiFi");
  }
}

void loop() {
  // Enviar los datos después del ciclo
  EnvioDatos();
  delay(10000);  // Intervalo de envío de datos cada 10 segundos
}

// Función para realizar la calibración del MQ7
bool CalibrarMQ7() {
  Serial.print("Calibrando, por favor espera.");
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ7.update(); // Actualizar la lectura de voltaje
    calcR0 += MQ7.calibrate(RatioMQ7CleanAir);  // Calibrar con ratio en aire limpio
    Serial.print(".");
    delay(1000);  // Esperar un poco entre lecturas de calibración
  }
  calcR0 /= 10;  // Promediar las lecturas de R0
  MQ7.setR0(calcR0);  // Establecer el valor promedio de R0

  // Verificar si la calibración fue exitosa
  if (isinf(calcR0) || calcR0 == 0) {
    Serial.println("Error en la calibración: R0 no es válido.");
    return false;  // Indicar error
  }

  Serial.println(" ¡Calibración completada!");
  return true;  // Calibración exitosa
}

// Función para enviar los datos al servidor
void EnvioDatos() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverName);  // Iniciar la conexión al servidor
    http.addHeader("User-Agent", "insomina/2023.5.8");
    http.addHeader("content-type", "application/json");

    // Obtener la MAC del dispositivo
    WiFi.macAddress(mac);
    snprintf(mac_Id, sizeof(mac_Id), "%02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
    Serial.println(mac_Id);

    //Leer los datos del sensor MQ-7
    float ppm = MQ7.readSensor();  // Leer PPM de CO del sensor MQ7
    Serial.print("PPM = ");
    Serial.println(ppm);

    // Leer los datos de temperatura y humedad
    TempAndHumidity data = dht.getTempAndHumidity();
    float temperatura = data.temperature;
    float humedad = data.humidity + 19;  // Aplicar corrección de humedad segun lo medido en el parque tecnologico seria de 19 

    Serial.println(
      temperatura, humedad
    );

    // Crear la cadena JSON con los datos de los sensores
    String httpRequestData = "{\"Datos\":[{\"MAC\":\""+String(mac_Id)+"\",\"Temperatura\":\""+String(temperatura, 2)+"\",\"Humedad\":\""+String(humedad, 1)+"\",\"Gas\":\""+String(ppm, 1)+"\",\"Presion\":\"13\"}]}";

    // Enviar la solicitud POST
    Serial.println("Enviando datos: " + httpRequestData);
    int httpResponseCode = http.POST(httpRequestData);
    Serial.print("Código de respuesta HTTP: ");
    Serial.println(httpResponseCode);

    //enviando con el formulario en un put:
    // Serial.println("Enviando datos: " + httpRequestData);
    // http.PUT(httpRequestData);  
    // int httpResponseCode = http.PUT(httpRequestData);
    // Serial.print("Código de respuesta HTTP: ");
    // Serial.println(httpResponseCode);

    http.end();  // Finalizar conexión
  } else {
    Serial.println("WiFi Desconectado");
  }
}
