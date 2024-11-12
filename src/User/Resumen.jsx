import Card, { CardContent, CardHeader, CardTitle } from "./card"
import Progress from './progress';
import { WindIcon, ThermometerIcon, DropletIcon, Flame } from 'lucide-react';

const Resumen = ({ theme, currentData, efficiencyIndices, idealConditions, thresholds }) => {
  return (
    <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
      <CardHeader className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <CardTitle className="flex items-center">
          <WindIcon className="w-6 h-6 mr-2" />
          Resumen del sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-orange-200 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Temperatura</CardTitle>
              <ThermometerIcon className="h-5 w-5 text-orange-800" />
            </CardHeader>
            <CardContent className="bg-orange-200">
              <div className="text-2xl font-bold text-orange-700">{currentData.temperature.toFixed(1)}°C</div>
              <br />
              <Progress value={efficiencyIndices.temperature} className="mt-2" indicatorColor="bg-orange-500" />
              <p className="text-xs text-orange-600 mt-2">
                Ideal: {idealConditions.temperature}°C | Eficiencia: {efficiencyIndices.temperature.toFixed(1)}%
              </p>
              <p className="text-xs text-orange-600 mt-2">
                Valores aceptables: {thresholds.temperature.min}°C - {thresholds.temperature.max}°C
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-200 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Humedad</CardTitle>
              <DropletIcon className="h-5 w-5 text-blue-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{currentData.humidity.toFixed(1)}%</div>
              <br />
              <Progress value={efficiencyIndices.humidity} className="mt-2" indicatorColor="bg-blue-500" />
              <p className="text-xs text-blue-600 mt-2">
                Ideal: {idealConditions.humidity}% | Eficiencia: {efficiencyIndices.humidity.toFixed(1)}%
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Valores aceptables: {thresholds.humidity.min}% - {thresholds.humidity.max}%
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-200 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-900">Concentración de CO</CardTitle>
              <Flame className="h-5 w-5 text-yellow-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">{currentData.co.toFixed(1)} ppm</div>
              <br />
              <Progress value={efficiencyIndices.co} className="mt-2" indicatorColor="bg-yellow-600" />
              <p className="text-xs text-yellow-600 mt-2">
                Ideal: &lt;{idealConditions.co} ppm | Eficiencia: {efficiencyIndices.co.toFixed(1)}%
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                Valores aceptables: 0 - {thresholds.co.max} ppm
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default Resumen;
