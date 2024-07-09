#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <DHT.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
//libreria de todos los SENSORES MQ
#include <MQUnifiedsensor.h>

//provee la generacion de informacion procesada
#include "addons/TokenHelper.h"
//Provee el RTDB imprimiendo la entrega de informacion y otra funcion de ayuda
#include "addons/RTDBHelper.h"
//led pin D15 corresponde 15 GPIO
#define LED 15
//sensor MQ
#define sensorMQ 4
//sensor DHT
#define sensorDHT 5
//FALTA COMENTAR
#define DHTTYPE DHT11
DHT dht(sensorDHT, DHTTYPE);
// inserta las credenciales de nuestra red
#define WIFI_SSID "NULL" 
#define WIFI_PASSWORD "NULL"
//insertar email y contraseña autorizado
#define USER_EMAIL "elpapu@gmail.com"
#define USER_PASSWORD "123456"
// insertar la API Key de firebase
#define API_KEY "apikey"

// insertar la RTDB URL 
#define DATABASE_URL "https://basededatosfinal-4ce7d-default-rtdb.firebaseio.com"
//definir los objetos de firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
//variable para guardar el USR UID
String uid;

//variables para guardar los paths de la BD
String databasePath;
String coPath;
String nLecturaPath;
String mjePath;
String tempPath;
String humPath;
//sensor
float co;
int nLectura;
String mje;
//sensor DHT
float temp;
float hum;
//variables timer(envian nuevas lecturas cada 3 mts)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay =18000;

//contador de lecturas
int count = 0;
//variable para login
bool signupOK = false;

/* la lectura se realiza desde el pin analogico, de 1 a 1024, 
 *  para obtener los valores en unidades correspondientes a la medición del gas, 
 *  necesitamos escalar el valor leído, según lo mostrado en el datasheet 
*/

//variables necesarias para escalar el valor del pin analógico

// resistencia del módulo en el monóxido
float RS_gas = 0;
float ratio = 0;
float sensorValue = 0;
float sensor_volt = 0;

// resistencia del sensor en el aire limpio, aquí colocamos el valor obtenido antes
float R0 = 40666.74;

//pin D6 para el buzzer pasivo
const int pinBuzzer= 12;
const int pinEco= 18;


//precalentado del sensor MQ7
void precalentado() {
  
  Serial.println("El sensor de gas se esta pre-calentando");
  delay(20000); // Espera a que el sensor se caliente durante 20 segundos
}
//empieza el setup
void setup(){
  Serial.begin(115200);
  precalentado();
  //Pin D15 para el led
  pinMode(LED, OUTPUT);
  pinMode(sensorMQ,INPUT);
  pinMode(sensorDHT, INPUT);
  // se inicializa el pin BUILTIN_LED del arduino como salida
  //pinMode(BUILTIN_LED, OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  // asigna la api key (necesario) 
  config.api_key = API_KEY;

  //asignacion de credenciales para el USR
  auth.user.email =USER_EMAIL;
  auth.user.password =USER_PASSWORD;
  Serial.print(USER_EMAIL);
  Serial.print(USER_PASSWORD);
  // asigna la RTDB URL (necesario)
  config.database_url = DATABASE_URL;
  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  // asigna una funcion de callback en lo que se este ejecutando el long running token generation task  
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  //asignamos un maximo de reintentos
  config.max_token_generation_retry = 3;

  //inicializamos la libreria con firebase autenticacion y config
  Firebase.begin(&config, &auth);
  // Obetener el UID de usuario llevara unos minutos
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "") {
    Serial.print('.');
    delay(1000);
  }
  // muestra el UID de usuario
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  // Actualiza el path de la base de datos
  databasePath = "/Sensores/" + uid;
  Serial.println("databasePath:");
  Serial.println(databasePath);
 
  // Actualiza las lecturas del sensor en el path de la base de datos
  nLecturaPath = databasePath + "/nLectura"; // --> Sensores/<user_uid>/nLectura
  coPath = databasePath + "/co"; // --> Sensores/<user_uid>/co2
  mjePath = databasePath + "/mje"; // --> Sensores/<user_uid>/mje
  tempPath = databasePath + "/temp"; // --> Sensores/<user_uid>/mje
  humPath= databasePath + "/hum"; // --> Sensores/<user_uid>/mje

}

void loop(){
   /*
    * MEDICION DE TEMPERATURA Y HUMEDAD
    * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   */
    hum = dht.readHumidity();
    temp = dht.readTemperature();
    /*
    * ^FIN MEDICION DE TEMPERATURA Y HUMEDAD
    * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   */
   sensorValue = analogRead(sensorMQ);
   sensor_volt = sensorValue/1024*5.0;
   RS_gas = (5.0-sensor_volt)/sensor_volt;
   ratio = RS_gas/R0; 
   float x = 1538.46 * ratio;
   //cantidad de gas por volumen en aire, 
   float ppm = pow(x,-1.709);
  
   if(ppm >= 50){
    Serial.println("PELIGRO concentración de co alta");
 
    Serial.println(ppm);
   
    digitalWrite(LED,HIGH);
    // se enciende el buzzer
    //pin-frecuencia en MHZ-duracion en ms
    //generar tono de 4500Hz durante 500ms, y detenerlo durante 1000ms.
    tone(pinBuzzer, 3500, 1000); 
    //Se carga el mensaje
    if (Firebase.RTDB.setString(&fbdo, mjePath.c_str(),"ALERTA-Concentración CO-ALTA")){
        Serial.println("PASSED");
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
       
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    }
    else{
      //si no es alto el co mide valores en aire    
      digitalWrite(LED, HIGH);
      delay(100);
      digitalWrite(LED,LOW);
      Serial.println("Concentración de gas por volumen de aire=");
      Serial.println(ppm);
      if (Firebase.RTDB.setString(&fbdo,mjePath.c_str(),"-")){
        Serial.println("PASSED");
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
       
      }
      else {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
   }
   



  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // CANTIDAD DE LECTURAS
    if (Firebase.RTDB.setInt(&fbdo,nLecturaPath.c_str(), count)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;
    //valor de lectura del sensor PPM
    // Escribe en Float en la base de datos path test/float
    if (Firebase.RTDB.setFloat(&fbdo, coPath.c_str(),ppm)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
   //VALORES DEL DHT 
   //temperatura
   if (Firebase.RTDB.setFloat(&fbdo, tempPath.c_str(),temp)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    //humedad
    if (Firebase.RTDB.setFloat(&fbdo, humPath.c_str(),hum)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
  
}