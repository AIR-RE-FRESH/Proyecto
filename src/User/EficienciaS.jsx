import Card, { CardContent, CardHeader, CardTitle } from "./card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AirVentIcon } from 'lucide-react';
import Progress from './progress'; // Importar el componente de progreso si lo tienes

const EficienciaS = ({ theme, currentData, historicalData }) => {
  return (
    <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
      <CardHeader className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <CardTitle className="flex items-center">
          <AirVentIcon className="w-6 h-6 mr-2" />
          Eficiencia del sistema de ventilación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-teal-900' : 'text-teal-400'}`}>
          {currentData.ventEfficiency.toFixed(1)}%
        </div>
        <Progress value={currentData.ventEfficiency} className="mb-4" indicatorColor="bg-teal-800" />
        <p className={`text-sm mb-4 ${theme === 'light' ? 'text-teal-700' : 'text-teal-300'}`}>
          Rendimiento actual comparado con los valores esperados según las lecturas del sensor
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ventEfficiency" stroke="#0F766E" name="Eficiencia de la ventilación (%)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EficienciaS;
