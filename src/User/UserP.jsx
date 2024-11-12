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

const generateMockData = () => ({
  temperature: Math.random() * (28 - 16) + 16,
  humidity: Math.random() * (65 - 35) + 35,
  co: Math.random() * (55 - 0) + 0,
  ventEfficiency: Math.random() * (100 - 70) + 70,
  batteryLevel: Math.random() * (100 - 20) + 20,
  cpuUsage: Math.random() * (100 - 10) + 10,
  filterStatus: Math.random() > 0.7 ? 'Bueno' : 'Requiere Reemplazo',
  lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
})

const idealConditions = {
  temperature: 22,
  humidity: 50,
  co: 25,
}

const thresholds = {
  temperature: { min: 18, max: 26 },
  humidity: { min: 40, max: 60 },
  co: { max: 50 },
}

export default function UserP() {
  const [currentData, setCurrentData] = useState(generateMockData())
  const [historicalData, setHistoricalData] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData()
      setCurrentData(newData)
      setHistoricalData(prevData => [...prevData.slice(-19), { ...newData, timestamp: new Date().toLocaleTimeString() }])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const calculateEfficiencyIndex = (current, ideal, { min, max }) => {
    let efficiency = 0;

    if (current < min) {
      efficiency = ((current - min) / (ideal - min)) * 100;
    }
    else if (current > max) {
      efficiency = ((max - current) / (max - ideal)) * 100;
    }
    else {
      const range = max - min;
      efficiency = 100 - (Math.abs(current - ideal) / range) * 100;
    }

    return Math.min(Math.max(efficiency, 0), 100);
  };


  const efficiencyIndices = {
    temperature: calculateEfficiencyIndex(currentData.temperature, idealConditions.temperature, thresholds.temperature),
    humidity: calculateEfficiencyIndex(currentData.humidity, idealConditions.humidity, thresholds.humidity),
    co: calculateEfficiencyIndex(currentData.co, idealConditions.co, { min: 0, max: thresholds.co.max }),
  }

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
      return 'warning'
    }
    return 'success'
  }

  const [theme, setTheme] = useState('light');

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