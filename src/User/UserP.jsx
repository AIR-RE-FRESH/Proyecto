'use client'

import { useState, useEffect } from 'react'
import Tabs, { TabsContent, TabsList, TabsTrigger } from "./tabs"
import {  WindIcon, ActivityIcon, BarChartIcon, TrendingUpIcon, AlertTriangleIcon, AirVentIcon } from 'lucide-react'
import Header from '../Header';
import Resumen from './Resumen';
import Eficiencia from './Eficiencia';
import Trends from './Trends';
import EficienciaS from './EficienciaS';
import Comparativas from './Comparativas';
import EstadoS from './EstadoS';

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

const UserP = () => {
  const [currentData, setCurrentData] = useState({
    temperature: 0,
    humidity: 0,
    co: 0,
    ventEfficiency: 0,
    batteryLevel: 100,
    cpuUsage: 60,
    filterStatus: 'Bueno',
    lastMaintenance: new Date().toLocaleDateString(),
  });
  const [historicalData, setHistoricalData] = useState([]);
  const [theme, setTheme] = useState('light');

  async function getData() {
    try {
      const response = await fetch('http://192.168.100.10:8000/api/list');
      if (!response.ok) {
        throw new Error('Error al obtener datos');
      }
      const data = await response.json();
      const lastData = data[data.length - 1];

      if (lastData) {
        const newData = {
          temperature: parseFloat(lastData.Temperatura) || 0,
          humidity: parseFloat(lastData.Humedad) || 0,
          co: parseFloat(lastData.Gas) || 0,
          ventEfficiency: Math.random() * (100 - 70) + 70,
          batteryLevel: 100,
          cpuUsage: 60,
          filterStatus: 'Bueno',
          lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        };

        setCurrentData(newData);
        setHistoricalData(prevData => [
          ...prevData.slice(-19),
          { ...newData, timestamp: new Date().toLocaleTimeString() }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const interval = setInterval(getData, 5000);
    getData();
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

  const efficiencyIndices = {
    temperature: calculateEfficiencyIndex(currentData.temperature, idealConditions.temperature, thresholds.temperature),
    humidity: calculateEfficiencyIndex(currentData.humidity, idealConditions.humidity, thresholds.humidity),
    co: calculateEfficiencyIndex(currentData.co, idealConditions.co, { min: 0, max: thresholds.co.max }),
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

  return (
    <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'} min-h-screen`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto p-4 space-y-4">

        <Tabs defaultValue="summary" className="space-y-0">
          <TabsList>
            <TabsTrigger
              value="summary"
              color="orange"
              className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center space-x-1`}
            >
              <WindIcon className="w-4 h-4" />
              <span>Resumen</span>
            </TabsTrigger>
            <TabsTrigger
              value="efficiency"
              color="green"
              className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center space-x-1`}
            >
              <BarChartIcon className="w-4 h-4" />
              <span>Eficiencia</span>
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              color="blue"
              className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center space-x-1`}
            >
              <TrendingUpIcon className="w-4 h-4" />
              <span>Tendencias</span>
            </TabsTrigger>
            <TabsTrigger
              value="ventilation"
              color="teal"
              className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center space-x-1`}
            >
              <AirVentIcon className="w-4 h-4" />
              <span>Ventilación</span>
            </TabsTrigger>
            <TabsTrigger
              value="comparative"
              color="yellow"
              className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center space-x-1`}
            >
              <ActivityIcon className="w-4 h-4" />
              <span>Comparativas</span>
            </TabsTrigger>
            <TabsTrigger
              value="status"
              color="red"
              className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} px-3 py-2 text-sm font-medium rounded-md flex items-center justify-center space-x-1`}
            >
              <AlertTriangleIcon className="w-4 h-4" />
              <span>Estado</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Resumen
              theme={theme}
              currentData={currentData}
              efficiencyIndices={efficiencyIndices}
              idealConditions={idealConditions}
              thresholds={thresholds}
            />
          </TabsContent>

          <TabsContent value="efficiency">
            <Eficiencia
              theme={theme}
              efficiencyIndices={efficiencyIndices}
              currentData={currentData}
              idealConditions={idealConditions}
              thresholds={thresholds}
            />
          </TabsContent>

          <TabsContent value="trends">
            <Trends
              theme={theme}
              historicalData={historicalData}
            />
          </TabsContent>

          <TabsContent value="ventilation">
            <EficienciaS
              theme={theme}
              currentData={currentData}
              historicalData={historicalData}
            />
          </TabsContent>

          <TabsContent value="comparative">
            <Comparativas
              theme={theme}
              historicalData={historicalData}
            />
          </TabsContent>

          <TabsContent value="status">
            <EstadoS
              theme={theme}
              getAlertStatus={getAlertStatus}
              currentData={currentData}
              thresholds={thresholds}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserP;