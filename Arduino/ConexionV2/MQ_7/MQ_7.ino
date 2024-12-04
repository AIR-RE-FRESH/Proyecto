#include <MQUnifiedsensor.h>

// Definiciones para ESP32 con el módulo MQ7 Gas Sensor V2
#define placa "ESP32"
#define Voltage_Resolution 3.3 // Voltaje máximo de referencia del ESP32 (3.3V)
#define pinAOUT 2 // Pin ADC2_CH2 en el ESP32 conectado al pin AOUT del módulo
#define type "MQ-7" // Tipo de sensor MQ-7
#define ADC_Bit_Resolution 12 // El ESP32 tiene un ADC de 12 bits
#define RatioMQ7CleanAir 27.5 // RS / R0 = 27.5 en aire limpio

// Declarar el sensor MQ7
MQUnifiedsensor MQ7(placa, Voltage_Resolution, ADC_Bit_Resolution, pinAOUT, type);

void setup() {
  // Iniciar la comunicación serial
  Serial.begin(115200); // Velocidad de 115200 para ESP32

  // Configurar el modelo matemático para calcular la concentración de PPM
  MQ7.setRegressionMethod(1); // _PPM =  a*ratio^b
  MQ7.setA(99.042); 
  MQ7.setB(-1.518); // Configurar la ecuación para la concentración de CO

  /***************************** Inicializar MQ7 ********************************************/ 
  MQ7.init(); 
  /* Si el valor de RL es diferente a 10K, establecer RL con el siguiente método:
     MQ7.setRL(10);
  */

  /***************************** Calibración del MQ7 ********************************************/ 
  Serial.print("Calibrando, por favor espera.");
  float calcR0 = 0;
  for(int i = 1; i <= 10; i++) {
    MQ7.update(); // Leer datos, el ESP32 leerá el voltaje del pin analógico
    calcR0 += MQ7.calibrate(RatioMQ7CleanAir); // Calibrar con el ratio de aire limpio
    Serial.print(".");
  }
  MQ7.setR0(calcR0 / 10); // Establecer el valor promedio de R0
  Serial.println(" Calibración finalizada.");

  if(isinf(calcR0)) {
    Serial.println("Error: Conexión incorrecta, R0 es infinito. Verificar cableado.");
    while(1);
  }
  if(calcR0 == 0) {
    Serial.println("Error: Conexión incorrecta, R0 es cero. Verificar cableado.");
    while(1);
  }

  // Mostrar la depuración serial
  MQ7.serialDebug(true);
}

void loop() {
  // Leer el valor analógico del sensor MQ7
  MQ7.update(); // Leer el voltaje del pin analógico AOUT
  MQ7.readSensor(); // Leer concentración de PPM usando la ecuación configurada
  MQ7.serialDebug(); // Mostrar los valores en el puerto serial
  
  delay(1000); // Retraso de 1 segundo antes de la siguiente lectura
}
