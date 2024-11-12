import Card, { CardContent, CardHeader, CardTitle } from "./card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ActivityIcon } from 'lucide-react';

const Comparativas = ({ theme, historicalData }) => {
  return (
    <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
      <CardHeader className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <CardTitle className="flex items-center">
          <ActivityIcon className="w-6 h-6 mr-2" />
          Curvas Comparativas
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
            <Line yAxisId="left" type="monotone" dataKey="ventEfficiency" stroke="#22c55e" name="Eficiencia de la ventilación (%)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Comparativas;
