"use client"

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, BarChart2, Battery, Bell, Droplets, Edit, ExternalLink, Filter, LogOut, Power, RefreshCw, Search, Settings, Thermometer, User, Zap, Activity, Clock, Cloud, Sun, Moon, Wind, CheckCircle, Globe } from 'lucide-react'

const healthData = [
  { name: 'Bueno', nameEn: 'Good', value: 3, color: '#10b981' },
  { name: 'Advertencia', nameEn: 'Warning', value: 1, color: '#f59e0b' },
  { name: 'Crítico', nameEn: 'Critical', value: 1, color: '#ef4444' },
]

const efficiencyData = [
  { name: 'Lun', nameEn: 'Mon', SYS001: 85, SYS002: 70, SYS003: 50, SYS004: 90, SYS005: 75 },
  { name: 'Mar', nameEn: 'Tue', SYS001: 88, SYS002: 72, SYS003: 48, SYS004: 92, SYS005: 78 },
  { name: 'Mié', nameEn: 'Wed', SYS001: 87, SYS002: 75, SYS003: 52, SYS004: 89, SYS005: 80 },
  { name: 'Jue', nameEn: 'Thu', SYS001: 84, SYS002: 68, SYS003: 46, SYS004: 91, SYS005: 73 },
  { name: 'Vie', nameEn: 'Fri', SYS001: 90, SYS002: 78, SYS003: 55, SYS004: 93, SYS005: 82 },
  { name: 'Sáb', nameEn: 'Sat', SYS001: 91, SYS002: 80, SYS003: 58, SYS004: 94, SYS005: 85 },
  { name: 'Dom', nameEn: 'Sun', SYS001: 89, SYS002: 76, SYS003: 54, SYS004: 92, SYS005: 79 },
]

const alerts = [
  { systemId: 'SYS001', type: 'Concentración de CO', typeEn: 'CO Concentration', status: 'critical', icon: AlertTriangle, message: 'Concentración de CO demasiado alta', messageEn: 'CO concentration too high' },
  { systemId: 'SYS002', type: 'Filtro', typeEn: 'Filter', status: 'warning', icon: Filter, message: 'Se necesita reemplazo de filtro', messageEn: 'Filter replacement needed' },
  { systemId: 'SYS003', type: 'Inactividad', typeEn: 'Inactivity', status: 'warning', icon: Power, message: 'Sistema inactivo por más de un mes', messageEn: 'System inactive for over a month' },
  { systemId: 'SYS004', type: 'Batería', typeEn: 'Battery', status: 'warning', icon: Battery, message: 'Batería baja', messageEn: 'Low battery' },
  { systemId: 'SYS005', type: 'Humedad', typeEn: 'Humidity', status: 'good', icon: Droplets, message: 'Niveles de humedad normalizados', messageEn: 'Humidity levels normalized' },
  { systemId: 'SYS001', type: 'Temperatura', typeEn: 'Temperature', status: 'good', icon: Thermometer, message: 'Temperatura dentro del rango óptimo', messageEn: 'Temperature within optimal range' },
]

const systems = [
  { id: 'SYS001', name: 'Juan Pérez', status: 'Bueno', statusEn: 'Good', lastUpdate: '2023-09-23 14:30', efficiency: 92, powerConsumption: 120, sensorCode: '#include <Arduino.h>\n\nvoid setup() {\n  // Código de configuración aquí\n}\n\nvoid loop() {\n  // Código principal aquí\n}' },
  { id: 'SYS002', name: 'María García', status: 'Advertencia', statusEn: 'Warning', lastUpdate: '2023-09-23 13:45', efficiency: 78, powerConsumption: 150, sensorCode: '#include <Arduino.h>\n\nvoid setup() {\n  // Código de configuración aquí\n}\n\nvoid loop() {\n  // Código principal aquí\n}' },
  { id: 'SYS003', name: 'Carlos Rodríguez', status: 'Crítico', statusEn: 'Critical', lastUpdate: '2023-09-23 12:15', efficiency: 45, powerConsumption: 200, sensorCode: '#include <Arduino.h>\n\nvoid setup() {\n  // Código de configuración aquí\n}\n\nvoid loop() {\n  // Código principal aquí\n}' },
  { id: 'SYS004', name: 'Ana Martínez', status: 'Bueno', statusEn: 'Good', lastUpdate: '2023-09-23 11:00', efficiency: 95, powerConsumption: 110, sensorCode: '#include <Arduino.h>\n\nvoid setup() {\n  // Código de configuración aquí\n}\n\nvoid loop() {\n  // Código principal aquí\n}' },
  { id: 'SYS005', name: 'Luis Sánchez', status: 'Advertencia', statusEn: 'Warning', lastUpdate: '2023-09-23 10:30', efficiency: 82, powerConsumption: 140, sensorCode: '#include <Arduino.h>\n\nvoid setup() {\n  // Código de configuración aquí\n}\n\nvoid loop() {\n  // Código principal aquí\n}' },
]

const statusColors = {
  Bueno: 'bg-emerald-500 hover:bg-emerald-600',
  Advertencia: 'bg-amber-500 hover:bg-amber-600',
  Crítico: 'bg-rose-500 hover:bg-rose-600',
  Good: 'bg-emerald-500 hover:bg-emerald-600',
  Warning: 'bg-amber-500 hover:bg-amber-600',
  Critical: 'bg-rose-500 hover:bg-rose-600',
}

const statusMessages = {
  Bueno: 'El sistema está operando dentro de los parámetros óptimos. No se requiere acción.',
  Advertencia: 'El sistema requiere atención. Programe mantenimiento para prevenir posibles problemas.',
  Crítico: 'Se requiere acción inmediata. El rendimiento del sistema está severamente comprometido.',
  Good: 'The system is operating within optimal parameters. No action required.',
  Warning: 'The system requires attention. Schedule maintenance to prevent potential issues.',
  Critical: 'Immediate action required. System performance is severely compromised.',
}

const translations = {
  es: {
    title: 'Panel de Control Air Re-Fresh',
    systemHealth: 'Resumen de Salud del Sistema',
    powerConsumption: 'Consumo de Energía',
    efficiencyOverview: 'Resumen de Eficiencia del Sistema',
    systemAlerts: 'Alertas del Sistema',
    listOfSystems: 'Lista de Sistemas',
    searchPlaceholder: 'Buscar por nombre o ID...',
    filterByStatus: 'Filtrar por estado',
    allStatuses: 'Todos los Estados',
    systemId: 'ID del Sistema',
    name: 'Nombre',
    status: 'Estado',
    efficiency: 'Eficiencia',
    lastUpdate: 'Última Actualización',
    actions: 'Acciones',
    editSystem: 'Editar Sistema',
    viewDetails: 'Ver detalles',
    togglePower: 'Encender/Apagar sistema',
    sensorCode: 'Código del Sensor',
    settings: 'Configuración',
    saveChanges: 'Guardar Cambios',
    enableNotifications: 'Habilitar Notificaciones',
    scheduleMaintenance: 'Programar Mantenimiento',
    alertThreshold: 'Umbral de Alerta',
    saveSettings: 'Guardar Configuración',
    totalConsumption: 'Consumo Total',
    consumption: 'Consumo',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    toggleDarkMode: 'Cambiar modo oscuro/claro',
    toggleNotifications: 'Activar/Desactivar notificaciones',
    copyright: '© 2023 Air Re-Fresh. Todos los derechos reservados.',
    switchToEnglish: 'Cambiar a Inglés',
  },
  en: {
    title: 'Air Re-Fresh Dashboard',
    systemHealth: 'System Health Overview',
    powerConsumption: 'Power Consumption',
    efficiencyOverview: 'System Efficiency Overview',
    systemAlerts: 'System Alerts',
    listOfSystems: 'List of Systems',
    searchPlaceholder: 'Search by name or ID...',
    filterByStatus: 'Filter by status',
    allStatuses: 'All Statuses',
    systemId: 'System ID',
    name: 'Name',
    status: 'Status',
    efficiency: 'Efficiency',
    lastUpdate: 'Last Update',
    actions: 'Actions',
    editSystem: 'Edit System',
    viewDetails: 'View details',
    togglePower: 'Turn on/off system',
    sensorCode: 'Sensor Code',
    settings: 'Settings',
    saveChanges: 'Save Changes',
    enableNotifications: 'Enable Notifications',
    scheduleMaintenance: 'Schedule Maintenance',
    alertThreshold: 'Alert Threshold',
    saveSettings: 'Save Settings',
    totalConsumption: 'Total Consumption',
    consumption: 'Consumption',
    profile: 'Profile',
    logout: 'Log out',
    toggleDarkMode: 'Toggle dark/light mode',
    toggleNotifications: 'Toggle notifications',
    copyright: '© 2023 Air Re-Fresh. All rights reserved.',
    switchToSpanish: 'Switch to Spanish',
  }
}

export default function AdminP() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedSystem, setSelectedSystem] = useState(null)
  const [sensorCode, setSensorCode] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPowerSystem, setSelectedPowerSystem] = useState('All')
  const [selectedEfficiencySystem, setSelectedEfficiencySystem] = useState('All')
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('es')
  const { toast } = useToast()

  const t = translations[language]

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredSystems = systems.filter(system => 
    (system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     system.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || system.status === statusFilter || system.statusEn === statusFilter)
  )

  const handleEditSystem = (system) => {
    setSelectedSystem(system)
    setSensorCode(system.sensorCode)
    toast({
      title: t.editSystem,
      description: `${t.editSystem}: ${system.id}`,
    })
  }

  const totalPowerConsumption = systems.reduce((total, system) => total + system.powerConsumption, 0)

  const getPowerConsumptionData = () => {
    if (selectedPowerSystem === 'All') {
      return systems.map(system => ({ name: system.id, value: system.powerConsumption }))
    } else {
      const system = systems.find(sys => sys.id === selectedPowerSystem)
      return [{ name: system.id, value: system.powerConsumption }]
    }
  }

  const getConsumptionColor = (consumption) => {
    if (consumption <= 120) return '#10b981' // green
    if (consumption <= 160) return '#f59e0b' // orange
    return '#ef4444' // red
  }

  const getEfficiencyData = () => {
    if (selectedEfficiencySystem === 'All') {
      return efficiencyData
    } else {
      return efficiencyData.map(data => ({
        name: language === 'es' ? data.name : data.nameEn,
        [selectedEfficiencySystem]: data[selectedEfficiencySystem]
      }))
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const  toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es')
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-slate-50 to-white' : 'bg-gradient-to-b from-slate-900 to-slate-800'}`}>
      <header className={`bg-gradient-to-r ${theme === 'light' ? 'from-cyan-700 via-cyan-800 to-cyan-900' : 'from-slate-800 via-slate-900 to-black'} text-white p-4 fixed top-0 left-0 right-0 z-10 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Zap className="h-8 w-8 text-amber-400" />
            <h1 className="text-2xl font-bold">{t.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                    <Globe className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language === 'es' ? t.switchToEnglish : t.switchToSpanish}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setNotifications(!notifications)}>
                    <Bell className={`h-5 w-5 ${notifications ? 'text-amber-400' : 'text-slate-400'}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.toggleNotifications}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.toggleDarkMode}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-10 h-10 rounded-full hover:bg-cyan-600 transition-colors">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t.profile}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t.settings}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className={`col-span-1 md:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-cyan-50 to-white' : 'bg-gradient-to-br from-slate-800 to-slate-700'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center text-xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                <Activity className="mr-2 text-cyan-600" />
                {t.systemHealth}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={language === 'es' ? 'name' : 'nameEn'} />
                  <YAxis domain={[0, 5]} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-emerald-50 to-white' : 'bg-gradient-to-br from-emerald-900 to-slate-800'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center text-xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                <Zap className="mr-2 text-amber-500" />
                {t.powerConsumption}
              </CardTitle>
              <Select value={selectedPowerSystem} onValueChange={setSelectedPowerSystem}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t.filterByStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{t.allStatuses}</SelectItem>
                  {systems.map(system => (
                    <SelectItem key={system.id} value={system.id}>{system.id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <h3 className={`text-3xl font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                  {selectedPowerSystem === 'All' ? totalPowerConsumption : systems.find(sys => sys.id === selectedPowerSystem)?.powerConsumption} kWh
                </h3>
                <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {selectedPowerSystem === 'All' ? t.totalConsumption : `${selectedPowerSystem} ${t.consumption}`}
                </p>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={getPowerConsumptionData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={50}
                    fill="#8884d8"
                  >
                    {getPowerConsumptionData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getConsumptionColor(entry.value)} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className={`mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-violet-50 to-white' : 'bg-gradient-to-br from-violet-900 to-slate-800'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
              <BarChart2 className="mr-2 text-violet-600" />
              {t.efficiencyOverview}
            </CardTitle>
            <Select value={selectedEfficiencySystem} onValueChange={setSelectedEfficiencySystem}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.filterByStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t.allStatuses}</SelectItem>
                {systems.map(system => (
                  <SelectItem key={system.id} value={system.id}>{system.id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getEfficiencyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                {selectedEfficiencySystem === 'All' ? (
                  systems.map((system, index) => (
                    <Line
                      key={system.id}
                      type="monotone"
                      dataKey={system.id}
                      stroke={`hsl(${index * 45}, 70%, 60%)`}
                      strokeWidth={2}
                    />
                  ))
                ) : (
                  <Line
                    type="monotone"
                    dataKey={selectedEfficiencySystem}
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className={`mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-rose-50 to-white' : 'bg-gradient-to-br from-rose-900 to-slate-800'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
              <AlertTriangle className="mr-2 text-rose-600" />
              {t.systemAlerts}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {alerts.map((alert, index) => (
                <Card key={index} className={`hover:shadow-md transition-shadow duration-300 ${theme === 'light' ? 'bg-white' : 'bg-slate-700'}`}>
                  <CardContent className="flex items-center p-4">
                    <alert.icon className={`h-8 w-8 mr-4 ${
                      alert.status === 'good' ? 'text-emerald-500' :
                      alert.status === 'warning' ? 'text-amber-500' : 'text-rose-500'
                    }`} />
                    <div>
                      <h3 className={`font-semibold capitalize ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                        {language === 'es' ? alert.type : alert.typeEn}
                      </h3>
                      <p className={`text-sm ${
                        alert.status === 'good' ? 'text-emerald-500' :
                        alert.status === 'warning' ? 'text-amber-500' :
                        'text-rose-500'
                      }`}>
                        {language === 'es' ? alert.message : alert.messageEn}
                      </p>
                      <p className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'} mt-1`}>{t.systemId}: {alert.systemId}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-50 to-white' : 'bg-gradient-to-br from-indigo-900 to-slate-800'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center mb-4 text-xl font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
              <BarChart2 className="mr-2 text-indigo-600" />
              {t.listOfSystems}
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t.filterByStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{t.allStatuses}</SelectItem>
                  {language === 'es' ? (
                    <>
                      <SelectItem value="Bueno">Bueno</SelectItem>
                      <SelectItem value="Advertencia">Advertencia</SelectItem>
                      <SelectItem value="Crítico">Crítico</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Warning">Warning</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.systemId}</TableHead>
                  <TableHead>{t.name}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.efficiency}</TableHead>
                  <TableHead>{t.lastUpdate}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSystems.map((system) => (
                  <TableRow key={system.id} className={`hover:bg-slate-50 ${theme === 'light' ? '' : 'hover:bg-slate-700'}`}>
                    <TableCell>{system.id}</TableCell>
                    <TableCell>{system.name}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge 
                              variant={system.status === 'Bueno' || system.statusEn === 'Good' ? 'success' : 
                                      system.status === 'Advertencia' || system.statusEn === 'Warning' ? 'warning' : 'destructive'}
                              className={`${statusColors[language === 'es' ? system.status : system.statusEn]} cursor-pointer transition-colors duration-200`}
                            >
                              {language === 'es' ? system.status : system.statusEn}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{statusMessages[language === 'es' ? system.status : system.statusEn]}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Progress value={system.efficiency} className="w-[60px]" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t.efficiency}: {system.efficiency}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Clock className="inline mr-1" size={14} />
                            {system.lastUpdate}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t.lastUpdate}: {system.lastUpdate}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="hover:bg-cyan-50 hover:text-cyan-600 transition-colors duration-200" onClick={() => handleEditSystem(system)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                              <DialogTitle>{t.editSystem}: {selectedSystem?.id}</DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="code" className="w-full">
                              <TabsList>
                                <TabsTrigger value="code">{t.sensorCode}</TabsTrigger>
                                <TabsTrigger value="settings">{t.settings}</TabsTrigger>
                              </TabsList>
                              <TabsContent value="code">
                                <div className="mt-2">
                                  <textarea
                                    value={sensorCode}
                                    onChange={(e) => setSensorCode(e.target.value)}
                                    rows={15}
                                    className="w-full p-2 border rounded font-mono text-sm"
                                  />
                                </div>
                                <Button className="mt-2">{t.saveChanges}</Button>
                              </TabsContent>
                              <TabsContent value="settings">
                                <div className="mt-2 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor="notifications">{t.enableNotifications}</Label>
                                    <Switch id="notifications" />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor="maintenance">{t.scheduleMaintenance}</Label>
                                    <Input type="date" id="maintenance" className="w-auto" />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor="threshold">{t.alertThreshold}</Label>
                                    <Input type="number" id="threshold" className="w-20" placeholder="%" />
                                  </div>
                                </div>
                                <Button className="mt-4">{t.saveSettings}</Button>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t.viewDetails}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" className="hover:bg-rose-50 hover:text-rose-600 transition-colors duration-200">
                                <Power className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t.togglePower}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className={`${theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-300'} py-4 text-center`}>
        <p>{t.copyright}</p>
        <p className="text-sm mt-1">{currentTime.toLocaleString()}</p>
      </footer>
    </div>
  )
}