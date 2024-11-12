'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Wind, Droplets, Fan, Thermometer, BarChart2, Zap, Smartphone, Sun, Moon, ChevronDown, Check, Mail, Phone, Share2, Facebook, Twitter, Instagram, Star, Shield, Leaf, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import ModelComparisonTable from './tablaC'


const languages = {
  es: {
    title: "Air Re-Fresh",
    subtitle: "Revolucionando la purificación del aire",
    description: "Tecnología avanzada en purificación y circulación del aire para un ambiente más saludable.",
    learnMore: "Descubre más",
    features: "Características",
    benefits: "Beneficios",
    technology: "Tecnología",
    contact: "Contacto",
    advancedPurification: "Purificación Avanzada",
    particleRemoval: "Elimina hasta el 99.97% de partículas y alérgenos",
    smartCirculation: "Circulación Inteligente",
    efficientDistribution: "Distribuye el aire limpio de manera eficiente",
    temperatureManagement: "Control de Temperatura",
    optimalTemperature: "Mantiene una temperatura óptima",
    realTimeAnalysis: "Análisis en Tiempo Real",
    constantMonitoring: "Monitoreo constante de la calidad del aire",
    energyEfficient: "Eficiencia Energética",
    smartControls: "Controles inteligentes para un consumo óptimo",
    mobileApp: "Aplicación Móvil",
    remoteControl: "Control remoto y monitoreo desde tu smartphone",
    healthyEnvironment: "Ambiente Saludable",
    improvedAirQuality: "Mejora la calidad del aire para una vida más saludable",
    ecoFriendly: "Ecológico",
    sustainableTech: "Tecnología sostenible para un futuro mejor",
    customizableSettings: "Configuración Personalizable",
    tailoredExperience: "Adapta la purificación a tus necesidades específicas",
    quietOperation: "Funcionamiento Silencioso",
    peacefulEnvironment: "Disfruta de un ambiente tranquilo y limpio",
    compactDesign: "Diseño Compacto",
    fitAnySpace: "Se adapta a cualquier espacio de tu hogar u oficina",
    easyMaintenance: "Fácil Mantenimiento",
    userFriendly: "Diseñado para una limpieza y mantenimiento sencillos",
    advancedFilters: "Filtros Avanzados",
    multiStageFiltration: "Sistema de filtración multi-etapa para una purificación superior",
    smartSensors: "Sensores Inteligentes",
    adaptivePerformance: "Ajusta el rendimiento según las condiciones del aire",
    nightMode: "Modo Nocturno",
    quietNightOperation: "Operación ultra silenciosa para un sueño ininterrumpido",
    voiceControl: "Control por Voz",
    smartHomeIntegration: "Compatible con asistentes de voz para un control manos libres",
    premiumMaterials: "Materiales Premium",
    durableConstruction: "Construcción duradera y de alta calidad",
    airQualityDisplay: "Pantalla de Calidad del Aire",
    realTimeInfo: "Información en tiempo real sobre la calidad del aire interior",
    airQualitySimulator: "Simulador de Calidad del Aire",
    simulatorDescription: "Experimenta cómo Air Re-Fresh mejora la calidad del aire en tiempo real",
    startSimulation: "Iniciar Simulación",
    stopSimulation: "Detener Simulación",
    particleLevel: "Nivel de Partículas",
    airQualityIndex: "Índice de Calidad del Aire",
    withAirReFresh: "Con Air Re-Fresh",
    withoutAirReFresh: "Sin Air Re-Fresh",
    virtualTour: "Tour Virtual",
    startVirtualTour: "Iniciar Tour Virtual",
    virtualTourDescription: "Explora nuestro modelo en 3D y descubre todas sus características",
    previous: "Anterior",
    next: "Siguiente",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    getInTouch: "Contáctanos",
    emailUs: "Envíanos un correo",
    callUs: "Llámanos",
    followUs: "Síguenos",
    ourMission: "Nuestra Misión",
    missionStatement: "En Air Re-Fresh, nos dedicamos a mejorar la calidad del aire interior para crear ambientes más saludables y confortables. Nuestra misión es proporcionar soluciones de purificación de aire innovadoras y eficientes que marquen una diferencia real en la vida de las personas.",
    whyChooseUs: "¿Por qué elegirnos?",
    innovativeTech: "Tecnología Innovadora",
    customerFocus: "Enfoque en el Cliente",
    qualityAssurance: "Garantía de Calidad",
    innovativeTechDesc: "Utilizamos la última tecnología en purificación de aire para ofrecer resultados superiores.",
    customerFocusDesc: "Nuestro equipo está dedicado a proporcionar un servicio al cliente excepcional y soluciones personalizadas.",
    qualityAssuranceDesc: "Cada producto pasa por rigurosas pruebas de calidad para garantizar un rendimiento óptimo.",
    testimonials: "Testimonios",
    faq: "Preguntas Frecuentes",
    comparison: "Comparación de Modelos",
    basic: "Básico",
    advanced: "Avanzado",
    premium: "Premium",
    specifications: "Especificaciones",
    coverageArea: "Área de Cobertura",
    filterLifespan: "Vida Útil del Filtro",
    noiseLevel: "Nivel de Ruido",
    energyConsumption: "Consumo de Energía",
    smartFeatures: "Características Inteligentes",
    priceRange: "Rango de Precio",
    excellent: "Excelente",
    good: "Bueno",
    fair: "Regular",
    messageSentDescription: "Gracias por contactarnos. Te responderemos pronto.",
    learnMoreAbout: "Aprende más sobre",
    ourProducts: "Nuestros Productos",
    airQualityGuide: "Guía de Calidad del Aire",
    healthyLiving: "Vida Saludable",
    customerSupport: "Soporte al Cliente",
    warranty: "Garantía",
    company: "Empresa",
    aboutUs: "Sobre Nosotros",
    careers: "Carreras",
    pressRoom: "Sala de Prensa",
    legal: "Legal",
    termsOfService: "Términos de Servicio",
    privacyPolicy: "Política de Privacidad",
    cookiePolicy: "Política de Cookies",
    reliability: "Confiabilidad y tranquilidad garantizadas",
    comparisonDescription: "Compara las características de nuestros modelos para encontrar el que mejor se adapta a tus necesidades.",
  },
  en: {
    title: "Air Re-Fresh",
    subtitle: "Revolutionizing Air Purification",
    description: "Advanced technology in air purification and circulation for a healthier environment.",
    learnMore: "Learn More",
    features: "Features",
    benefits: "Benefits",
    technology: "Technology",
    contact: "Contact",
    advancedPurification: "Advanced Purification",
    particleRemoval: "Removes up to 99.97% of particles and allergens",
    smartCirculation: "Smart Circulation",
    efficientDistribution: "Efficiently distributes clean air",
    temperatureManagement: "Temperature Management",
    optimalTemperature: "Maintains optimal temperature",
    realTimeAnalysis: "Real-time Analysis",
    constantMonitoring: "Constant monitoring of air quality",
    energyEfficient: "Energy Efficient",
    smartControls: "Smart controls for optimal consumption",
    mobileApp: "Mobile App",
    remoteControl: "Remote control and monitoring from your smartphone",
    healthyEnvironment: "Healthy Environment",
    improvedAirQuality: "Improves air quality for a healthier life",
    ecoFriendly: "Eco-Friendly",
    sustainableTech: "Sustainable technology for a better future",
    customizableSettings: "Customizable Settings",
    tailoredExperience: "Tailor purification to your specific needs",
    quietOperation: "Quiet Operation",
    peacefulEnvironment: "Enjoy a peaceful and clean environment",
    compactDesign: "Compact Design",
    fitAnySpace: "Fits any space in your home or office",
    easyMaintenance: "Easy Maintenance",
    userFriendly: "Designed for easy cleaning and maintenance",
    advancedFilters: "Advanced Filters",
    multiStageFiltration: "Multi-stage filtration system for superior purification",
    smartSensors: "Smart Sensors",
    adaptivePerformance: "Adjusts performance based on air conditions",
    nightMode: "Night Mode",
    quietNightOperation: "Ultra-quiet operation for uninterrupted sleep",
    voiceControl: "Voice Control",
    smartHomeIntegration: "Compatible with voice assistants for hands-free control",
    premiumMaterials: "Premium Materials",
    durableConstruction: "Durable and high-quality construction",
    airQualityDisplay: "Air Quality Display",
    realTimeInfo: "Real-time information on indoor air quality",
    airQualitySimulator: "Air Quality Simulator",
    simulatorDescription: "Experience how Air Re-Fresh improves air quality in real-time",
    startSimulation: "Start Simulation",
    stopSimulation: "Stop Simulation",
    particleLevel: "Particle Level",
    airQualityIndex: "Air Quality Index",
    withAirReFresh: "With Air Re-Fresh",
    withoutAirReFresh: "Without Air Re-Fresh",
    virtualTour: "Virtual Tour",
    startVirtualTour: "Start Virtual Tour",
    virtualTourDescription: "Explore our model in 3D and discover all its features",
    previous: "Previous",
    next: "Next",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    getInTouch: "Get in Touch",
    emailUs: "Email Us",
    callUs: "Call Us",
    followUs: "Follow Us",
    ourMission: "Our Mission",
    missionStatement: "At Air Re-Fresh, we are dedicated to improving indoor air quality to create healthier and more comfortable environments. Our mission is to provide innovative and efficient air purification solutions that make a real difference in people's lives.",
    whyChooseUs: "Why Choose Us",
    innovativeTech: "Innovative Technology",
    customerFocus: "Customer Focus",
    qualityAssurance: "Quality Assurance",
    innovativeTechDesc: "We use the latest air purification technology to deliver superior results.",
    customerFocusDesc: "Our team is dedicated to providing exceptional customer service and tailored solutions.",
    qualityAssuranceDesc: "Every product undergoes rigorous quality testing to ensure optimal performance.",
    testimonials: "Testimonials",
    faq: "FAQ",
    comparison: "Model Comparison",
    basic: "Basic",
    advanced: "Advanced",
    premium: "Premium",
    specifications: "Specifications",
    coverageArea: "Coverage Area",
    filterLifespan: "Filter Lifespan",
    noiseLevel: "Noise Level",
    energyConsumption: "Energy Consumption",
    smartFeatures: "Smart Features",
    priceRange: "Price Range",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    messageSentDescription: "Thank you for contacting us. We'll get back to you soon.",
    learnMoreAbout: "Learn More About",
    ourProducts: "Our Products",
    airQualityGuide: "Air Quality Guide",
    healthyLiving: "Healthy Living",
    customerSupport: "Customer Support",
    warranty: "Warranty",
    company: "Company",
    aboutUs: "About Us",
    careers: "Careers",
    pressRoom: "Press Room",
    legal: "Legal",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    reliability: "Guaranteed reliability and peace of mind",
    comparisonDescription: "Compare the features of our models to find the one that best suits your needs.",
  }
}

const FeatureCard = ({ icon: Icon, title, description, darkMode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300 hover:shadow-lg hover:scale-105`}>
        <CardContent className="flex items-start space-x-4 p-6">
          <div className={`p-2 rounded-full ${darkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <Icon className={`h-6 w-6 ${darkMode ? 'text-primary-light' : 'text-primary'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const Section = ({ id, title, children, darkMode, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      id={id}
      className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} ${className}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
        {children}
      </div>
    </motion.section>
  )
}

const testimonials = [
  { name: "María G.", text: "Air Re-Fresh ha transformado la calidad del aire en mi hogar. ¡Me siento más saludable y enérgica!", rating: 5 },
  { name: "John D.", text: "Increíble tecnología y diseño. El control por voz y la app hacen que sea muy fácil de usar.", rating: 5 },
  { name: "Sophie L.", text: "Como alguien con alergias, este producto ha sido un cambio de vida. Altamente recomendado.", rating: 5 },
  { name: "Carlos R.", text: "La diferencia en la calidad del aire es notable. Mi familia respira mejor desde que tenemos Air Re-Fresh.", rating: 4 },
  { name: "Emma W.", text: "El modo nocturno es fantástico. Duermo mejor sabiendo que el aire está siendo purificado silenciosamente.", rating: 5 },
]

const faqItems = [
  {
    question: "¿Con qué frecuencia debo cambiar los filtros?",
    answer: "Recomendamos cambiar los filtros cada 6-12 meses, dependiendo del uso y la calidad del aire en su área. El dispositivo le notificará cuando sea necesario un cambio. Nuestros filtros avanzados están diseñados para una larga duración sin comprometer la eficacia."
  },
  {
    question: "¿Es ruidoso el Air Re-Fresh?",
    answer: "No, nuestros purificadores de aire están diseñados para un funcionamiento silencioso, especialmente en modo nocturno. El nivel de ruido varía entre 20-50 dB, dependiendo de la velocidad del ventilador. En su configuración más baja, el Air Re-Fresh es más silencioso que un susurro."
  },
  {
    question: "¿Puedo controlar el Air Re-Fresh con mi smartphone?",
    answer: "Sí, todos nuestros modelos son compatibles con nuestra app móvil para control remoto y monitoreo. Puede ajustar la configuración, verificar la calidad del aire y recibir notificaciones directamente en su teléfono. Además, nuestros modelos más avanzados son compatibles con asistentes de voz como Alexa y Google Assistant."
  },
  {
    question: "¿Qué área puede cubrir un Air Re-Fresh?",
    answer: "Dependiendo del modelo, nuestros dispositivos pueden cubrir áreas desde 30m² hasta 70m². Recomendamos consultar las especificaciones de cada modelo para elegir el más adecuado para su espacio. Para espacios más grandes, se pueden utilizar múltiples unidades sincronizadas a través de nuestra app."
  },
  {
    question: "¿El Air Re-Fresh consume mucha energía?",
    answer: "No, nuestros dispositivos están diseñados para ser energéticamente eficientes. El consumo varía entre 30W y 50W, dependiendo del modelo y la configuración utilizada. Esto es comparable al consumo de una bombilla LED, lo que hace que el Air Re-Fresh sea económico de operar a largo plazo."
  },
  {
    question: "¿Cómo sé si el Air Re-Fresh está funcionando correctamente?",
    answer: "El Air Re-Fresh cuenta con un sistema de monitoreo en tiempo real que muestra la calidad del aire actual en su pantalla LED o LCD (dependiendo del modelo). Además, nuestra app proporciona datos detallados sobre la calidad del aire, el rendimiento del dispositivo y el estado del filtro. Si surge algún problema, el dispositivo le notificará inmediatamente."
  },
]

const AirQualitySimulator = ({ darkMode, t }) => {
  const [isSimulating, setIsSimulating] = useState(false)
  const [particleLevel, setParticleLevel] = useState(50)
  const [airQualityIndex, setAirQualityIndex] = useState({ with: 100, without: 50 })

  useEffect(() => {
    let interval
    if (isSimulating) {
      interval = setInterval(() => {
        setAirQualityIndex(prev => {
          const withAirReFresh = Math.max(0, prev.with - (particleLevel / 100))
          const withoutAirReFresh = Math.min(100, prev.without + (particleLevel / 200))
          return {
            with: withAirReFresh,
            without: withoutAirReFresh
          }
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isSimulating, particleLevel])

  const getAirQualityStatus = (index) => {
    if (index <= 50) return { text: t.excellent, color: 'text-green-500' }
    if (index <= 100) return { text: t.good, color: 'text-yellow-500' }
    return { text: t.fair, color: 'text-red-500' }
  }

  return (
    <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6`}>
      <h3 className="text-2xl font-bold mb-4">{t.airQualitySimulator}</h3>
      <p className="mb-4">{t.simulatorDescription}</p>
      <div className="mb-4">
        <Label htmlFor="particleLevel">{t.particleLevel}</Label>
        <Slider
          id="particleLevel"
          min={0}
          max={100}
          step={1}
          value={[particleLevel]}
          onValueChange={([value]) => setParticleLevel(value)}
          className="my-4"
        />
      </div>
      <Button onClick={() => setIsSimulating(!isSimulating)} className="mb-6">
        {isSimulating ? t.stopSimulation : t.startSimulation}
      </Button>
      <div className="space-y-4">
        <div>
          <Label>{t.withAirReFresh}</Label>
          <div className="flex items-center mt-2">
            <progress className="w-full mr-2" value={airQualityIndex.with} max="100" />
            <span className={`text-sm font-semibold ${getAirQualityStatus(airQualityIndex.with).color}`}>
              {Math.round(airQualityIndex.with)}
            </span>
          </div>
          <p className={`text-sm ${getAirQualityStatus(airQualityIndex.with).color}`}>
            {getAirQualityStatus(airQualityIndex.with).text}
          </p>
        </div>
        <div>
          <Label>{t.withoutAirReFresh}</Label>
          <div className="flex items-center mt-2">
            <progress className="w-full mr-2" value={airQualityIndex.without} max="100" />
            <span className={`text-sm font-semibold ${getAirQualityStatus(airQualityIndex.without).color}`}>
              {Math.round(airQualityIndex.without)}
            </span>
          </div>
          <p className={`text-sm ${getAirQualityStatus(airQualityIndex.without).color}`}>
            {getAirQualityStatus(airQualityIndex.without).text}
          </p>
        </div>
      </div>
    </Card>
  )
}

const VirtualTour = ({ darkMode, t }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">{t.startVirtualTour}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{t.virtualTour}</DialogTitle>
          <DialogDescription>{t.virtualTourDescription}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          {/* Aquí iría el componente de tour virtual 3D */}
          <video src="./video.mp4" className="object-contain w-full h-full" controls></video>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const TestimonialCarousel = ({ testimonials, darkMode, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow-lg`}
        >
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="mb-4 text-lg italic">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
          <p className="font-semibold">{testimonials[currentIndex].name}</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label={t.previous}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label={t.next}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

export default function Home() {
  const [lang, setLang] = useState('es')
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  const t = languages[lang]

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacityAnim = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 backdrop-blur-sm transition-colors duration-300">
        <nav className={`mx-auto px-6 py-4 flex justify-between items-center ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}`}>
          <div className="flex items-center space-x-4 relative">
            <a href="#top" className="block">
              <img
                src="./logoB.png"
                alt="ARFl"
                className="w-[30%] h-[30%] object-cover"
              />
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#features" className="hover:text-primary transition-colors">{t.features}</a>
            <a href="#benefits" className="hover:text-primary transition-colors">{t.benefits}</a>
            <a href="#technology" className="hover:text-primary transition-colors">{t.technology}</a>
            <a href="#contact" className="hover:text-primary transition-colors">{t.contact}</a>
            <Select onValueChange={(value) => setLang(value)} defaultValue={lang}>
              <SelectTrigger className={`w-[100px] ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-200'}`}>
                <SelectValue placeholder={t.language} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </motion.button>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{ y: yPosAnim, opacity: opacityAnim }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-80" />
            <img
              src="./lv.jpg?height=1080&width=1920"
              alt="ARF bg"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {t.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                {t.learnMore}
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </section>

        <Section id="features" title={t.features} darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Droplets} title={t.advancedPurification} description={t.particleRemoval} darkMode={darkMode} />
            <FeatureCard icon={Fan} title={t.smartCirculation} description={t.efficientDistribution} darkMode={darkMode} />
            <FeatureCard icon={Thermometer} title={t.temperatureManagement} description={t.optimalTemperature} darkMode={darkMode} />
            <FeatureCard icon={BarChart2} title={t.realTimeAnalysis} description={t.constantMonitoring} darkMode={darkMode} />
            <FeatureCard icon={Zap} title={t.energyEfficient} description={t.smartControls} darkMode={darkMode} />
            <FeatureCard icon={Smartphone} title={t.mobileApp} description={t.remoteControl} darkMode={darkMode} />
          </div>
        </Section>

        <Section id="benefits" title={t.benefits} darkMode={darkMode} className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Wind} title={t.healthyEnvironment} description={t.improvedAirQuality} darkMode={darkMode} />
            <FeatureCard icon={Leaf} title={t.ecoFriendly} description={t.sustainableTech} darkMode={darkMode} />
            <FeatureCard icon={Smartphone} title={t.customizableSettings} description={t.tailoredExperience} darkMode={darkMode} />
            <FeatureCard icon={Moon} title={t.quietOperation} description={t.peacefulEnvironment} darkMode={darkMode} />
            <FeatureCard icon={Thermometer} title={t.compactDesign} description={t.fitAnySpace} darkMode={darkMode} />
            <FeatureCard icon={Zap} title={t.easyMaintenance} description={t.userFriendly} darkMode={darkMode} />
          </div>
        </Section>

        <Section id="technology" title={t.technology} darkMode={darkMode}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Droplets} title={t.advancedFilters} description={t.multiStageFiltration} darkMode={darkMode} />
            <FeatureCard icon={BarChart2} title={t.smartSensors} description={t.adaptivePerformance} darkMode={darkMode} />
            <FeatureCard icon={Moon} title={t.nightMode} description={t.quietNightOperation} darkMode={darkMode} />
            <FeatureCard icon={Smartphone} title={t.voiceControl} description={t.smartHomeIntegration} darkMode={darkMode} />
            <FeatureCard icon={Shield} title={t.premiumMaterials} description={t.durableConstruction} darkMode={darkMode} />
            <FeatureCard icon={Wind} title={t.airQualityDisplay} description={t.realTimeInfo} darkMode={darkMode} />
          </div>
        </Section>

        <Section id="simulator" title={t.airQualitySimulator} darkMode={darkMode} className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <AirQualitySimulator darkMode={darkMode} t={t} />
        </Section>

        <Section id="virtualTour" title={t.virtualTour} darkMode={darkMode}>
          <div className="max-w-2xl mx-auto">
            <VirtualTour darkMode={darkMode} t={t} />
          </div>
        </Section>

        <Section id="testimonials" title={t.testimonials} darkMode={darkMode} className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel testimonials={testimonials} darkMode={darkMode} t={t} />
          </div>
        </Section>

        <Section id="faq" title={t.faq} darkMode={darkMode}>
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <Section id="comparison" title={t.comparison} darkMode={darkMode} className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <ModelComparisonTable darkMode={darkMode} t={t} />
        </Section>

        <Section id="contact" title={t.contact} darkMode={darkMode} className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold mb-4">{t.getInTouch}</h3>
              <p className="text-lg mb-8">{t.alwaysHereForYou}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Mail className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-primary-light' : 'text-primary'}`} />
                <h4 className="font-semibold mb-2">{t.emailUs}</h4>
                <p className="text-sm">emilianoguima@gmail.com</p>
              </div>
              <div className="text-center">
                <Phone className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-primary-light' : 'text-primary'}`} />
                <h4 className="font-semibold mb-2">{t.callUs}</h4>
                <p className="text-sm">+54 (9) 376-4414972</p>
              </div>
              <div className="text-center">
                <Share2 className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-primary-light' : 'text-primary'}`} />
                <h4 className="font-semibold mb-2">{t.followUs}</h4>
                <div className="flex justify-center space-x-4">
                  <a href="https://www.facebook.com/share/1DokAYWgof/" className="hover:text-primary"><Facebook className="h-6 w-6" /></a>
                  <a href="https://x.com/Lean_gmnez?t=3FtgAqGUW7fR32LQ-ZsIxw&s=08" className="hover:text-primary"><Twitter className="h-6 w-6" /></a>
                  <a href="https://www.instagram.com/p_airrefresh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-primary"><Instagram className="h-6 w-6" /></a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}