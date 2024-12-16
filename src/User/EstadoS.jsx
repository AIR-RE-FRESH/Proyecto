import Card, { CardContent, CardHeader, CardTitle } from "./card"
import Alert, { AlertDescription, AlertTitle } from "./alert"
import Table, { TableBody, TableCell, TableRow } from "./table"
import {
  AlertTriangleIcon, CheckCircleIcon, GaugeIcon,
  ThermometerIcon, DropletIcon, Flame, RefreshCwIcon,
  BatteryChargingIcon, CpuIcon, AirVentIcon, CalendarDays, Weight
} from "lucide-react";

const EstadoS = ({ theme, getAlertStatus, currentData, thresholds }) => {
  return (
    <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} shadow-md`}>
      <CardHeader className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
        <CardTitle className="flex items-center">
          <AlertTriangleIcon className="w-6 h-6 mr-2" />
          Estado del sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert
          variant={getAlertStatus()}
          className={getAlertStatus() === 'success'
            ? `${theme === 'light' ? 'bg-green-100' : 'bg-green-900'}`
            : `${theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-900'}`}
        >
          <AlertTitle className="flex items-center">
            {getAlertStatus() === 'success' ? (
              <CheckCircleIcon className={`${theme === 'light' ? 'text-green-700' : 'text-green-300'} w-5 h-5 mr-2`} />
            ) : (
              <AlertTriangleIcon className={`${theme === 'light' ? 'text-yellow-700' : 'text-yellow-300'} w-5 h-5 mr-2`} />
            )}
            Estado del sistema: {getAlertStatus() === 'success' ? 'Normal' : 'Atención requerida'}
          </AlertTitle>
          <AlertDescription>
            {getAlertStatus() === 'success'
              ? 'Todos los parámetros están dentro de rangos aceptables.'
              : 'Uno o más parámetros han superado los umbrales establecidos. Por favor, compruebe el sistema y tome las medidas adecuadas.'}
          </AlertDescription>
        </Alert>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-teal-800">
                <GaugeIcon className="w-7 h-7 mr-2 text-teal-800" />
                Parámetros ambientales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table theme={theme}>
                <TableBody theme={theme}>
                  <TableRow theme={theme}>
                    <TableCell className="font-medium text-orange-700">
                      <div className="flex items-center">
                        <ThermometerIcon className="w-4 h-4 mr-2 text-orange-700" />
                        Temperatura
                      </div>
                    </TableCell>
                    <TableCell className="text-orange-600">
                      {currentData.temperature.toFixed(1)}°C
                    </TableCell>
                    <TableCell className="text-orange-600">
                      Ideal: {thresholds.temperature.min}°C - {thresholds.temperature.max}°C
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-blue-800">
                      <div className="flex items-center">
                        <DropletIcon className="w-4 h-4 mr-2 text-blue-800" />
                        Humedad
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-700">
                      {currentData.humidity.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-blue-600">
                      Ideal: {thresholds.humidity.min}% - {thresholds.humidity.max}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-yellow-800">
                      <div className="flex items-center">
                        <Flame className="w-4 h-4 mr-2 text-yellow-800" />
                        Concentración CO
                      </div>
                    </TableCell>
                    <TableCell className="text-yellow-700">
                      {currentData.co.toFixed(1)} ppm
                    </TableCell>
                    <TableCell className="text-yellow-600">
                      Ideal: &lt;{thresholds.co.max} ppm
                    </TableCell>
                  </TableRow>
                  {/* Nueva fila para la presión */}
                  <TableRow>
                    <TableCell className="font-medium text-gray-600">
                      <div className="flex items-center">
                        <Weight className="w-4 h-4 mr-2 text-gray-600" /> 
                        Presión
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {currentData.presion.toFixed(1)} hPa
                    </TableCell>
                    <TableCell className="text-gray-600">
                      Ideal: {thresholds.presion.min} hPa - {thresholds.presion.max} hPa
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-green-700">
                <RefreshCwIcon className="w-6 h-6 mr-2 text-green-700" />
                Salud del sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table theme={theme}>
                <TableBody theme={theme}>
                  <TableRow theme={theme}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <BatteryChargingIcon className="w-4 h-4 mr-2 text-green-700" />
                        Nivel de batería
                      </div>
                    </TableCell>
                    <TableCell className="text-green-700">
                      {currentData.batteryLevel.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <CpuIcon className="w-4 h-4 mr-2 text-yellow-600" />
                        Uso de CPU
                      </div>
                    </TableCell>
                    <TableCell className="text-yellow-600">
                      {currentData.cpuUsage.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <AirVentIcon className="w-4 h-4 mr-2 text-teal-600" />
                        Estado del filtro
                      </div>
                    </TableCell>
                    <TableCell className={`${theme === 'light' ? 'text-teal-800' : 'text-teal-400'}`}>
                      {currentData.filterStatus}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2 text-red-800" />
                        Último mantenimiento
                      </div>
                    </TableCell>
                    <TableCell className={`${theme === 'light' ? 'text-red-800' : 'text-red-400'}`}>
                      {currentData.lastMaintenance}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {getAlertStatus() === 'warning' && (
          <div className={`${theme === 'light' ? 'bg-yellow-50' : 'bg-yellow-900'} p-4 rounded-lg mt-4`}>
            <h3 className={`${theme === 'light' ? 'text-yellow-800' : 'text-yellow-300'} font-semibold flex items-center`}>
              <AlertTriangleIcon className="w-6 h-6 mr-2" />
              Acciones recomendadas:
            </h3>
            <ul className={`${theme === 'light' ? 'text-yellow-700' : 'text-yellow-400'} list-disc list-inside mt-2`}>
              <li>Verifique y ajuste la configuración del sistema de ventilación</li>
              <li>Inspeccione los filtros de aire y reemplácelos si es necesario</li>
              <li>Verifique la calibración del sensor</li>
              <li>Investigue las posibles fuentes de problemas de calidad del aire</li>
              <li>Programe un mantenimiento si han pasado más de 30 días desde la última verificación</li>
              <li>Verifique los niveles de la batería y reemplácela o recárguela si está por debajo del 30 %</li>
              <li>Controle el uso de la CPU y optimice los procesos del sistema si es constantemente alto</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EstadoS;
