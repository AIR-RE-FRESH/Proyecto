import { useState, useEffect } from 'react'
import { Wind, Eye, EyeOff, Droplets, Thermometer, Fan, Lock } from 'lucide-react'
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
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"

const languages = {
  es: {
    title: "Air Re-Fresh",
    description: "Tecnología avanzada en purificación y circulación del aire.",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    termsAndConditions: "Acepto los términos y condiciones",
    privacyPolicy: "Acepto la política de privacidad",
    register: "Crear cuenta",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    login: "Iniciar sesión aquí",
    passwordStrength: "Fortaleza de la contraseña:",
    weak: "Débil",
    medium: "Media",
    strong: "Fuerte",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    welcome: "Bienvenido a Air Re-Fresh",
    personalizedWelcome: "Únete a la revolución del aire limpio",
    advancedPurification: "Purificación avanzada",
    particleRemoval: "Elimina hasta el 99.97% de partículas y alérgenos",
    smartCirculation: "Circulación inteligente",
    efficientDistribution: "Distribuye el aire limpio de manera eficiente",
    temperatureManagement: "Control de temperatura",
    optimalTemperature: "Mantiene una temperatura óptima",
    realTimeAnalysis: "Análisis en tiempo real",
    constantMonitoring: "Monitoreo constante de la calidad del aire",
    energyEfficient: "Eficiencia energética",
    smartControls: "Controles inteligentes",
    mobileApp: "Aplicación móvil",
    healthyEnvironment: "Ambiente saludable",
    personalizedExperience: "Experiencia personalizada",
    exclusiveOffers: "Ofertas exclusivas",
    communityAccess: "Acceso a la comunidad",
    systemKeyInfo: "Clave del sistema",
    systemKeyDescription: "Te proporcionaremos una clave de sistema después de iniciar sesión por primera vez. Esta clave está asociada con la dirección MAC del dispositivo Air Re-Fresh que has adquirido.",
  },
  en: {
    title: "Air Re-Fresh",
    description: "Advanced technology in air purification and circulation.",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    termsAndConditions: "I agree to the terms and conditions",
    privacyPolicy: "I agree to the privacy policy",
    register: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    login: "Login here",
    passwordStrength: "Password strength:",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    welcome: "Welcome to Air Re-Fresh",
    personalizedWelcome: "Join the clean air revolution",
    advancedPurification: "Advanced Purification",
    particleRemoval: "Removes up to 99.97% of particles and allergens",
    smartCirculation: "Smart Circulation",
    efficientDistribution: "Efficiently distributes clean air",
    temperatureManagement: "Temperature Management",
    optimalTemperature: "Maintains optimal temperature",
    realTimeAnalysis: "Real-time Analysis",
    constantMonitoring: "Constant monitoring of air quality",
    energyEfficient: "Energy Efficient",
    smartControls: "Smart Controls",
    mobileApp: "Mobile App",
    healthyEnvironment: "Healthy Environment",
    personalizedExperience: "Personalized Experience",
    exclusiveOffers: "Exclusive Offers",
    communityAccess: "Community Access",
    systemKeyInfo: "System Key",
    systemKeyDescription: "We will provide you with a system key after your first login. This key is associated with the MAC address of your purchased Air Re-Fresh device.",
  }
}

export default function Registrarse() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [lang, setLang] = useState('es')
  const [darkMode, setDarkMode] = useState(false)
  const { toast } = useToast()

  const t = languages[lang]

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
    acceptPrivacy: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Resetear errores antes de la validación
    setErrors({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: '',
      acceptPrivacy: '',
    });

    if (validateForm()) {
      // Redirigir al usuario a la página de usuario después de un registro exitoso
      console.log("Formulario válido, redirigiendo a /user...");
      window.location.href = '/user';
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: any = {};

    // Validar nombre completo
    if (!fullName) {
      newErrors.fullName = lang === 'en' ? "Please enter your full name" : "Por favor, ingrese su nombre completo";
      valid = false;
    }

    // Validar correo electrónico
    if (!email) {
      newErrors.email = lang === 'en' ? "Please enter your email" : "Por favor, ingrese su correo electrónico";
      valid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = lang === 'en' ? "Please enter a valid email" : "Por favor, ingrese un correo electrónico válido";
      valid = false;
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = lang === 'en' ? "Please enter your password" : "Por favor, ingrese su contraseña";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = lang === 'en' ? "Password must be at least 6 characters" : "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
      newErrors.confirmPassword = lang === 'en' ? "Passwords do not match" : "Las contraseñas no coinciden";
      valid = false;
    }

    // Validar aceptación de términos
    if (!acceptTerms) {
      newErrors.acceptTerms = lang === 'en' ? "Please accept the terms and conditions" : "Por favor, acepte los términos y condiciones";
      valid = false;
    }

    // Validar aceptación de la política de privacidad
    if (!acceptPrivacy) {
      newErrors.acceptPrivacy = lang === 'en' ? "Please accept the privacy policy" : "Por favor, acepte la política de privacidad";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 6) strength += 20;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 20;
    return strength;
  };

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
            <CardHeader className="space-y-1 relative">
              <div className="flex items-center justify-between mb-4">
                <img
                  src="./logoB.png"
                  alt="Logo de la empresa"
                  className={`h-[35%] w-[35%] object-cover ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  onClick={() => window.location.href = '/home'}
                  style={{ cursor: 'pointer' }}
                />
                <div className="flex items-center space-x-4 ml-auto">
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
                  {/* Nombre Completo */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Correo Electrónico */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Contraseña */}
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
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {t.passwordStrength} {passwordStrength < 40 ? t.weak : passwordStrength < 70 ? t.medium : t.strong}
                    </p>
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`pr-10 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                    <Label htmlFor="terms" className="text-sm">{t.termsAndConditions}</Label>
                  </div>
                  {errors.acceptTerms && <p className="text-xs text-red-500">{errors.acceptTerms}</p>}

                  {/* Política de Privacidad */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacy" checked={acceptPrivacy} onCheckedChange={setAcceptPrivacy} />
                    <Label htmlFor="privacy" className="text-sm">{t.privacyPolicy}</Label>
                  </div>
                  {errors.acceptPrivacy && <p className="text-xs text-red-500">{errors.acceptPrivacy}</p>}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className={`w-full ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`} onClick={handleSubmit}>
                {t.register}
              </Button>
            </CardFooter>
            <div className="text-center pb-6">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.alreadyHaveAccount} <a href="/login" className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>{t.login}</a>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-10">
        <Card className={`w-full max-w-md shadow-lg ${darkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80'}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">{t.personalizedWelcome}</CardTitle>
            <CardDescription className="text-lg">{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="features" className="text-sm">{lang === 'en' ? 'Features' : 'Características'}</TabsTrigger>
                <div className="col-span-2 flex justify-end">
                  <TabsTrigger value="systemKey" className="text-sm">{t.systemKeyInfo}</TabsTrigger>
                </div>
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
                </div>
              </TabsContent>
              <TabsContent value="systemKey">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-2 rounded-lg">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <Lock className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{t.systemKeyInfo}</h3>
                      <p className="text-sm text-muted-foreground">{t.systemKeyDescription}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}