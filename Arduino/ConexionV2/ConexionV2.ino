
#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <WiFiClientSecure.h>

// #define DHTPIN 2     // pin digital del sensor DHT
// #define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321
// DHT dht(DHTPIN, DHTTYPE);

//url del servidor
const char* serverName = "http://10.10.0.163/post/prueba.php";

//Variables para obtener la mac
byte mac[6];
char mac_Id[18];

void setup() {
  Serial.begin(115200);                      //Inicio de la comunicación serie
  
  WiFiManager wm;                            //Variable para ap autoconnect
  wm.setConfigPortalTimeout(300);

//Autoconnect 
    bool res;
   
    res = wm.autoConnect("pasantes","pasantes");  // ssid y contraseña de la red

    if(!res) {
        Serial.println("Fallo la coneccion");
       
    } 
    else {
        //Si se conecta al WiFi    
        Serial.println("Conectado)");
    }

  // dht.begin();
  
}

void loop(){
   EnvioDatos();
}

void EnvioDatos() {

    //Chequeo de la coneccion de wifi
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
    
      // Url de la pagina a la que nos dirigimos
      http.begin(client, serverName);
      
      
      // Crear el Header de la consulta
      http.addHeader("User-Agent", "insomina/2023.5.8");
      http.addHeader("content-type", "application/json");
      // Para enviar datos por post
     
  WiFi.macAddress(mac); //Busca la mac del dispositivo y la guarda en una variable.
  snprintf(mac_Id, sizeof(mac_Id), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  Serial.println(mac_Id);
  //string con el json a enviar
        String httpRequestData = "{\"Data\":[{\"Mac\" :\" "+ (String(mac_Id)) +" \",\"Temperatura\" : \"11\",\"Humedad\" : \"12\",\"Gas\" : \"10\",\"Presion\" : \"13\"}]}";
      // Enviar el post
      Serial.println(httpRequestData);
      int httpResponseCode = http.POST(httpRequestData);
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      while (client.connected())
    {
      if (client.available())
      {
        String line = client.readStringUntil('\n');
        Serial.println(line);
      }
    }
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }

  
}

// int dhttemp() // Lee la temperatura
// {
//   float t = dht.readTemperature();
//   return t;
//   }
// int dhthum() // Lee la humedad
// {
//   float h = dht.readHumidity();
//   return h;
//   }
