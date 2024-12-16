import Card, { CardContent, CardHeader, CardTitle } from "./card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BarChartIcon } from 'lucide-react';
import Alert, { AlertTitle, AlertDescription } from './alert';
import { useEffect, useState } from 'react';

const Eficiencia = ({ theme, efficiencyIndices, currentData, idealConditions, thresholds }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { name: 'Temperatura', value: efficiencyIndices.temperature },
      { name: 'Humedad', value: efficiencyIndices.humidity },
      { name: 'Concentración de CO', value: efficiencyIndices.co },
      { name: 'Presión', value: efficiencyIndices.presion }, // Agregado para Presión
    ]);
  }, [efficiencyIndices]);

  return (
    <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
      <CardHeader className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <CardTitle className="flex items-center">
          <BarChartIcon className="w-6 h-6 mr-2" />
          Índice de eficiencia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Índice de Eficiencia (%)">
              <Cell fill="#f97316" />
              <Cell fill="#3b82f6" />
              <Cell fill="#ca8a04" />
              <Cell fill="#4b5563" /> {/* Color agregado para Presión */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className={`${theme === 'light' ? 'text-orange-700' : 'text-orange-400'} text-lg font-semibold`}>
              Eficiencia de la Temperatura: {efficiencyIndices.temperature.toFixed(1)}%
            </h3>
            <p className={`${theme === 'light' ? 'text-orange-600' : 'text-orange-300'} text-sm`}>
              Mide qué tan cerca está de la temperatura actual. ({currentData.temperature.toFixed(1)}°C) está siendo comparado con la temperatura ideal de: ({idealConditions.temperature}°C).
              El 100% de eficiencia significa que la temperatura está en el punto ideal, mientras que porcentajes más bajos indican una desviación del ideal.
            </p>
          </div>
          <div>
            <h3 className={`${theme === 'light' ? 'text-blue-700' : 'text-blue-400'} text-lg font-semibold`}>
              Eficiencia de la Humedad: {efficiencyIndices.humidity.toFixed(1)}%
            </h3>
            <p className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-300'} text-sm`}>
              Indica qué tan bien está el nivel de humedad actual ({currentData.humidity.toFixed(1)}%) si coincide con la humedad ideal de: ({idealConditions.humidity}%).
              Una mayor eficiencia sugiere una mayor comodidad y un menor riesgo de problemas de moho o sequedad.
            </p>
          </div>
          <div>
            <h3 className={`${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'} text-lg font-semibold`}>
              Eficiencia de la Concentración de CO: {efficiencyIndices.co.toFixed(1)}%
            </h3>
            <p className={`${theme === 'light' ? 'text-yellow-600' : 'text-yellow-300'} text-sm`}>
              Representa qué tan por debajo del nivel máximo seguro ({thresholds.co.max} ppm) siendo que la concentración actual de CO es de: ({currentData.co.toFixed(1)} ppm).
              Una mayor eficiencia indica una mejor calidad del aire y menores riesgos para la salud.
            </p>
          </div>
          <div>
            <h3 className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-400'} text-lg font-semibold`}>
              Eficiencia de la Presión: {efficiencyIndices.presion.toFixed(1)}%
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-sm`}>
              Evalúa qué tan cerca está la presión actual ({currentData.presion} hPa) del rango ideal de presión ({idealConditions.presion.min} - {idealConditions.presion.max} hPa).
              Una eficiencia alta sugiere condiciones ideales para el sistema y su entorno.
            </p>
          </div>
          <Alert className={`${theme === 'light' ? 'bg-white' : 'bg-gray-700'} border-none`}>
            <AlertTitle className={`${theme === 'light' ? 'text-green-800' : 'text-green-400'}`}>Comprender los índices de eficiencia</AlertTitle>
            <AlertDescription className={`${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>
              Los índices de eficiencia ayudan a cuantificar qué tan bien el sistema mantiene las condiciones ambientales ideales.
              Un índice del 100 % representa una alineación perfecta con las condiciones ideales, mientras que los porcentajes más bajos indican que hay margen de mejora.
              Estos índices guían los ajustes del sistema y ayudan a priorizar los esfuerzos de mantenimiento.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default Eficiencia;
