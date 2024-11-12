import { useState, useEffect } from 'react'
import { Wind, Eye, EyeOff, Droplets, Thermometer, Fan, BarChart2, Sun, Cloud, CloudRain, Snowflake, Key, Zap, Shield, Smartphone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const languages = {
  es: {
    title: "Air Re-Fresh",
    description: "Tecnología avanzada en purificación y circulación del aire.",
    email: "Correo electrónico",
    password: "Contraseña",
    systemKey: "Clave de sistema",
    rememberMe: "Recordarme",
    forgotPassword: "¿Olvidaste tu contraseña?",
    login: "Iniciar sesión",
    loginWithGoogle: "Continuar con Google",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Regístrate aquí",
    passwordStrength: "Fortaleza de la contraseña:",
    weak: "Débil",
    medium: "Media",
    strong: "Fuerte",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    welcome: "Bienvenido a Air Re-Fresh",
    advancedPurification: "Purificación avanzada",
    particleRemoval: "Elimina hasta el 99.97% de partículas y alérgenos",
    smartCirculation: "Circulación inteligente",
    efficientDistribution: "Distribuye el aire limpio de manera eficiente",
    temperatureManagement: "Control de temperatura",
    optimalTemperature: "Mantiene una temperatura óptima",
    realTimeAnalysis: "Análisis en tiempo real",
    constantMonitoring: "Monitoreo constante de la calidad del aire",
    weatherInfo: "Información meteorológica",
    temperature: "Temperatura",
    humidity: "Humedad",
    airQuality: "Calidad del aire",
    forecast: "Pronóstico",
    today: "Hoy",
    tomorrow: "Mañana",
    excellent: "Excelente",
    good: "Buena",
    moderate: "Moderada",
    poor: "Mala",
    feelsLike: "Sensación térmica",
    wind: "Viento",
    precipitation: "Precipitación",
    systemKeyRequired: "La clave de sistema es requerida",
    energyEfficient: "Eficiencia energética",
    smartControls: "Controles inteligentes",
    mobileApp: "Aplicación móvil",
    healthyEnvironment: "Ambiente saludable",
    learnMore: "Aprende más",
  },
  en: {
    title: "Air Re-Fresh",
    description: "Advanced technology in air purification and circulation.",
    email: "Email",
    password: "Password",
    systemKey: "System Key",
    rememberMe: "Remember me",
    forgotPassword: "Forgot your password?",
    login: "Log in",
    loginWithGoogle: "Continue with Google",
    noAccount: "Don't have an account?",
    signUp: "Sign up here",
    passwordStrength: "Password strength:",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    welcome: "Welcome to Air Re-Fresh",
    advancedPurification: "Advanced Purification",
    particleRemoval: "Removes up to 99.97% of particles and allergens",
    smartCirculation: "Smart Circulation",
    efficientDistribution: "Efficiently distributes clean air",
    temperatureManagement: "Temperature Management",
    optimalTemperature: "Maintains optimal temperature",
    realTimeAnalysis: "Real-time Analysis",
    constantMonitoring: "Constant monitoring of air quality",
    weatherInfo: "Weather Information",
    temperature: "Temperature",
    humidity: "Humidity",
    airQuality: "Air Quality",
    forecast: "Forecast",
    today: "Today",
    tomorrow: "Tomorrow",
    excellent: "Excellent",
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    feelsLike: "Feels like",
    wind: "Wind",
    precipitation: "Precipitation",
    systemKeyRequired: "System key is required",
    energyEfficient: "Energy Efficient",
    smartControls: "Smart Controls",
    mobileApp: "Mobile App",
    healthyEnvironment: "Healthy Environment",
    learnMore: "Learn More",
  }
}

const WeatherInfo = ({ darkMode, t }) => {
  const [weather, setWeather] = useState({
    temperature: 22,
    feelsLike: 23,
    humidity: 60,
    airQuality: 'good',
    wind: 10,
    precipitation: 20,
    forecast: [
      { day: 'today', temp: 22, icon: Sun },
      { day: 'tomorrow', temp: 24, icon: Cloud },
    ]
  })

  const getWeatherIcon = (icon) => {
    const Icon = icon
    return <Icon className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
  }

  const getAirQualityColor = (quality) => {
    const colors = {
      excellent: "text-green-500",
      good: "text-blue-500",
      moderate: "text-yellow-500",
      poor: "text-red-500"
    }
    return colors[quality] || "text-gray-500"
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer className={`h-6 w-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <div>
            <p className="text-sm font-medium">{t.temperature}</p>
            <p className="text-lg font-bold">{weather.temperature}°C</p>
            <p className="text-xs">{t.feelsLike} {weather.feelsLike}°C</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <p className="text-sm font-medium">{t.humidity}</p>
            <p className="text-lg font-bold">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <p className="text-sm font-medium">{t.airQuality}</p>
            <p className={`text-lg font-bold ${getAirQualityColor(weather.airQuality)}`}>
              {t[weather.airQuality]}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CloudRain className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <div>
            <p className="text-sm font-medium">{t.precipitation}</p>
            <p className="text-lg font-bold">{weather.precipitation}%</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-2">{t.forecast}</h4>
        <div className="flex justify-between">
          {weather.forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center">
              <span className="text-sm">{t[day.day]}</span>
              {getWeatherIcon(day.icon)}
              <span className="font-bold">{day.temp}°C</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [systemKey, setSystemKey] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSystemKey, setShowSystemKey] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [lang, setLang] = useState('es')
  const [darkMode, setDarkMode] = useState(false)
  const { toast } = useToast()

  const t = languages[lang]

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Login attempt', { email, password, systemKey, rememberMe })
      toast({
        title: lang === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: lang === 'en' ? "Welcome to Air Re-Fresh" : "Bienvenido a Air Re-Fresh",
        duration: 3000,
      })
    }
  }

  const validateForm = () => {
    if (!email) {
      toast({
        title: lang === 'en' ? "Error" : "Error",
        description: lang === 'en' ? "Please enter your email" : "Por favor, ingrese su correo electrónico",
        duration: 3000,
        variant: "destructive",
      })
      return false
    }
    if (!password) {
      toast({
        title: lang === 'en' ? "Error" : "Error",
        description: lang === 'en' ? "Please enter your password" : "Por favor, ingrese su contraseña",
        duration: 3000,
        variant: "destructive",
      })
      return false
    }
    if (!systemKey) {
      toast({
        title: lang === 'en' ? "Error" : "Error",
        description: t.systemKeyRequired,
        duration: 3000,
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    const strength = calculatePasswordStrength(newPassword)
    setPasswordStrength(strength)
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length > 6) strength += 20
    if (password.match(/[a-z]+/)) strength += 20
    if (password.match(/[A-Z]+/)) strength += 20
    if (password.match(/[0-9]+/)) strength += 20
    if (password.match(/[$@#&!]+/)) strength += 20
    return strength
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-100 via-green-50 to-gray-100'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            </filter>
          </defs>
        </svg>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-blue-400/30' : 'bg-blue-200/50'} filter blur-md`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className={`shadow-xl backdrop-blur-sm ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80'}`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between mb-4">
                <Wind className={`h-12 w-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => setLang(value)} defaultValue={lang}>
                    <SelectTrigger className={`w-[100px] ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}>
                      <SelectValue placeholder={t.language} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    aria-label={t.theme}
                  />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
              <CardDescription className="text-center">{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={lang === 'en' ? "you@example.com" : "tu@ejemplo.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      aria-describedby="email-description"
                    />
                    <p id="email-description" className="sr-only">{lang === 'en' ? "Enter your email address" : "Ingrese su dirección de correo electrónico"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        required 
                        className={`pr-10 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                        aria-describedby="password-strength"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                        aria-label={showPassword ? (lang === 'en' ? "Hide password" : "Ocultar contraseña") : (lang === 'en' ? "Show password" : "Mostrar contraseña")}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <Progress value={passwordStrength} className="h-1 mt-2" aria-hidden="true" />
                    <p id="password-strength" className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {t.passwordStrength} {passwordStrength < 40 ? t.weak : passwordStrength < 70 ? t.medium : t.strong}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemKey">{t.systemKey}</Label>
                    <div className="relative">
                      <Input 
                        id="systemKey" 
                        type={showSystemKey ? "text" : "password"}
                        value={systemKey}
                        onChange={(e) => setSystemKey(e.target.value)}
                        required 
                        className={`pr-10 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSystemKey(!showSystemKey)}
                        className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                        aria-label={showSystemKey ? (lang === 'en' ? "Hide system key" : "Ocultar clave de sistema") : (lang === 'en' ? "Show system key" : "Mostrar clave de sistema")}
                      >
                        {showSystemKey ? <EyeOff className="h-5 w-5" /> : <Key className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={setRememberMe}
                      />
                      <Label htmlFor="remember-me" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.rememberMe}</Label>
                    </div>
                    <a href="#" className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>{t.forgotPassword}</a>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className={`w-full ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`} onClick={handleSubmit}>
                {t.login}
              </Button>
              <Button variant="outline" className={`w-full ${darkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                {t.loginWithGoogle}
              </Button>
            </CardFooter>
            <div className="text-center pb-6">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.noAccount} <a href="#" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>{t.signUp}</a>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-10">
        <Card className={`w-full max-w-md shadow-lg ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80'}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">{t.welcome}</CardTitle>
            <CardDescription className="text-lg">{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="features" className="text-sm">{lang === 'en' ? 'Features' : 'Características'}</TabsTrigger>
                <TabsTrigger value="weather" className="text-sm">{t.weatherInfo}</TabsTrigger>
              </TabsList>
              <TabsContent value="features">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Droplets className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.advancedPurification}</h3>
                      <p className="text-sm text-muted-foreground">{t.particleRemoval}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Fan className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.smartCirculation}</h3>
                      <p className="text-sm text-muted-foreground">{t.efficientDistribution}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Thermometer className={`h-6 w-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.temperatureManagement}</h3>
                      <p className="text-sm text-muted-foreground">{t.optimalTemperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <BarChart2 className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.realTimeAnalysis}</h3>
                      <p className="text-sm text-muted-foreground">{t.constantMonitoring}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Zap className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.energyEfficient}</h3>
                      <p className="text-sm text-muted-foreground">{t.smartControls}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Smartphone className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.mobileApp}</h3>
                      <p className="text-sm text-muted-foreground">{t.healthyEnvironment}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="weather">
                <WeatherInfo darkMode={darkMode} t={t} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}