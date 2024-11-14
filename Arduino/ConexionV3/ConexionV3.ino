#include <MQUnifiedsensor.h>
#include <DHTesp.h>

#define placa "ESP32"
#define Voltage_Resolution 3.3  // Tensión de funcionamiento del ESP32
#define pin A6                 // Pin analógico donde se conecta el MQ-7
#define type "MQ-7"
#define ADC_Bit_Resolution 12   // Resolución de ADC para ESP32 (12 bits)
#define RatioMQ7CleanAir 27.5   // Relación RS/R0 en aire limpio
#define PWMPin 5                // Pin conectado al MOSFET

// Sensor MQ7 y DHT
MQUnifiedsensor MQ7(placa, Voltage_Resolution, ADC_Bit_Resolution, pin, type);
DHTesp dht;
int pinDHT = 26;

unsigned long oldTime = 0;
const int RELAY_PIN1 = 14;  // Pines para los ventiladores
const int RELAY_PIN2 = 27;

void setup() {
  Serial.begin(115200);  // Velocidad del puerto serial para ESP32
  dht.setup(pinDHT, DHTesp::DHT11); // Configuración del sensor DHT11
  
  // Pines de los relés
  pinMode(RELAY_PIN1, OUTPUT);
  pinMode(RELAY_PIN2, OUTPUT);
  pinMode(PWMPin, OUTPUT);

  // Configurar MQ-7
  MQ7.setRegressionMethod(1); // Usar el modelo matemático para calcular PPM
  MQ7.setA(99.042); MQ7.setB(-1.518); // Parámetros de la ecuación para el CO

  // Inicializar y calibrar el sensor MQ-7
  MQ7.init();
  Serial.print("Calibrando MQ7, por favor espera...");
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ7.update();  // Leer el valor del pin analógico
    calcR0 += MQ7.calibrate(RatioMQ7CleanAir);  // Calibrar
    Serial.print(".");
  }
  MQ7.setR0(calcR0 / 10);  // Establecer el valor promedio de R0
  Serial.println(" ¡Calibración completada!");

  // Validar si hay errores en la calibración
  if (isinf(calcR0)) { 
    Serial.println("Error: R0 infinito. Verifica la conexión del sensor.");
    while (1);
  }
  if (calcR0 == 0) { 
    Serial.println("Error: R0 igual a 0. Revisa las conexiones.");
    while (1);
  }
  MQ7.serialDebug(true);  // Habilitar la salida de depuración en serie
}

void loop() {
  // Leer el valor de PPM de CO del sensor MQ7
  MQ7.update();  // Actualizar los datos del sensor
  float ppm = MQ7.readSensor();  // Obtener el valor de PPM
  Serial.print("PPM = ");
  Serial.println(ppm);

  // Leer temperatura y humedad
  TempAndHumidity data = dht.getTempAndHumidity();
  Serial.println("Temperatura: " + String(data.temperature, 2) + "°C");
  Serial.println("Humedad: " + String(data.humidity, 1) + "%");
  Serial.println("---");
  
  // Control de los ventiladores
  if (ppm < 1200 || ppm > 40000) {
    digitalWrite(RELAY_PIN1, HIGH);  // Activar Ventilador 1
    digitalWrite(RELAY_PIN2, LOW);   // Apagar Ventilador 2
    Serial.println("Ventilador 1 ACTIVADO, Ventilador 2 APAGADO");
  } else {
    digitalWrite(RELAY_PIN1, LOW);   // Apagar Ventilador 1
    digitalWrite(RELAY_PIN2, HIGH);  // Activar Ventilador 2
    Serial.println("Ventilador 1 APAGADO, Ventilador 2 ACTIVADO");
  }

  delay(2000);  // Esperar 2 segundos entre mediciones
}
