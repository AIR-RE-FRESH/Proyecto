import Card, { CardContent, CardHeader, CardTitle } from "./card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUpIcon } from 'lucide-react';

const Trends = ({ theme, historicalData }) => {
  return (
    <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
      <CardHeader className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <CardTitle className="flex items-center">
          <TrendingUpIcon className="w-6 h-6 mr-2" />
          Análisis de tendencias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#f97316" name="Temperatura (°C)" />
            <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#3b82f6" name="Humedad (%)" />
            <Line yAxisId="right" type="monotone" dataKey="co" stroke="#ca8a04" name="CO (ppm)" />
            <Line yAxisId="left" type="monotone" dataKey="presion" stroke="#6b7280" name="Presión (hPa)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Trends;
