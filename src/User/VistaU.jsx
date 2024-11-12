'use client';

import { useState, useEffect } from 'react';
import Tabs, { TabsContent, TabsList, TabsTrigger } from "./tabs";
import { WindIcon, ActivityIcon, BarChartIcon, TrendingUpIcon, AlertTriangleIcon, AirVentIcon } from 'lucide-react';
import Header from '../Header';
import Resumen from './Resumen';
import Eficiencia from './Eficiencia';
import Trends from './Trends';
import EficienciaS from './EficienciaS';
import Comparativas from './Comparativas';
import EstadoS from './EstadoS';

// Ideal conditions and thresholds
const idealConditions = {
  temperature: 22,
  humidity: 50,
  co: 25,
};

const thresholds = {
  temperature: { min: 18, max: 26 },
  humidity: { min: 40, max: 60 },
  co: { max: 50 },
};

export default function AirRefreshDashboard() {
  const [currentData, setCurrentData] = useState(null); 
  const [historicalData, setHistoricalData] = useState([]);

  const [theme, setTheme] = useState('light'); 

  // Fetch data de Laravel backend
  const fetchSensorData = async () => {
    try {
      const response = await fetch('/getdata', {  //tengo que ver la ruta
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();

        const latestData = data[0];

        const mappedData = {
          temperature: latestData.Temperatura,
          humidity: latestData.Humedad,
          co: latestData.Gas,
          MAC: latestData.MAC, 
          Fecha: latestData.Fecha,
          ventEfficiency: Math.random() * (100 - 70) + 70, 
          batteryLevel: Math.random() * (100 - 20) + 20, 
          cpuUsage: Math.random() * (100 - 10) + 10, 
          filterStatus: Math.random() > 0.7 ? 'Bueno' : 'Requiere Reemplazo', 
        };

        setCurrentData(mappedData);
        setHistoricalData(prevData => [...prevData.slice(-19), { ...mappedData, timestamp: new Date().toLocaleTimeString() }]);
      } else {
        console.error('Failed to fetch sensor data.');
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData();

    const interval = setInterval(fetchSensorData, 5000);

    return () => clearInterval(interval); 
  }, []);

  const calculateEfficiencyIndex = (current, ideal, { min, max }) => {
    let efficiency = 0;

    if (current < min) {
      efficiency = ((current - min) / (ideal - min)) * 100;
    } else if (current > max) {
      efficiency = ((max - current) / (max - ideal)) * 100;
    } else {
      const range = max - min;
      efficiency = 100 - (Math.abs(current - ideal) / range) * 100;
    }

    return Math.min(Math.max(efficiency, 0), 100);
  };

  const getAlertStatus = () => {
    if (
      currentData.temperature < thresholds.temperature.min ||
      currentData.temperature > thresholds.temperature.max ||
      currentData.humidity < thresholds.humidity.min ||
      currentData.humidity > thresholds.humidity.max ||
      currentData.co > thresholds.co.max ||
      currentData.batteryLevel < 30 ||
      currentData.cpuUsage > 90 ||
      currentData.filterStatus === 'Requiere Reemplazo'
    ) {
      return 'warning';
    }
    return 'success';
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!currentData) {
    return <div>Carganding...</div>; 
  }

  const efficiencyIndices = {
    temperature: calculateEfficiencyIndex(currentData.temperature, idealConditions.temperature, thresholds.temperature),
    humidity: calculateEfficiencyIndex(currentData.humidity, idealConditions.humidity, thresholds.humidity),
    co: calculateEfficiencyIndex(currentData.co, idealConditions.co, { min: 0, max: thresholds.co.max }),
  };

  return (
    <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} min-h-screen`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto p-4 space-y-4">

        <Tabs defaultValue="summary" className="space-y-0">
          <TabsList>
            {/* Tabs Triggers */}
            <TabsTrigger value="summary" className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2`}>
              <WindIcon className="w-4 h-4" />
              <span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="efficiency" className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2`}>
              <BarChartIcon className="w-4 h-4" />
              <span>Eficiencia</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2`}>
              <TrendingUpIcon className="w-4 h-4" />
              <span>Tendencias</span>
            </TabsTrigger>
            <TabsTrigger value="ventilation" className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2`}>
              <AirVentIcon className="w-4 h-4" />
              <span>Ventilación</span>
            </TabsTrigger>
            <TabsTrigger value="comparative" className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2`}>
              <ActivityIcon className="w-4 h-4" />
              <span>Comparativas</span>
            </TabsTrigger>
            <TabsTrigger value="status" className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2`}>
              <AlertTriangleIcon className="w-4 h-4" />
              <span>Estado</span>
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="summary">
            <Resumen theme={theme} currentData={currentData} efficiencyIndices={efficiencyIndices} />
          </TabsContent>
          <TabsContent value="efficiency">
            <Eficiencia theme={theme} efficiencyIndices={efficiencyIndices} currentData={currentData} />
          </TabsContent>
          <TabsContent value="trends">
            <Trends theme={theme} historicalData={historicalData} />
          </TabsContent>
          <TabsContent value="ventilation">
            <EficienciaS theme={theme} currentData={currentData} historicalData={historicalData} />
          </TabsContent>
          <TabsContent value="comparative">
            <Comparativas theme={theme} historicalData={historicalData} />
          </TabsContent>
          <TabsContent value="status">
            <EstadoS theme={theme} getAlertStatus={getAlertStatus} currentData={currentData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
