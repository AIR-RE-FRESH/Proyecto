import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const comparisonData = [
  { spec: "Área de Cobertura", basic: "Hasta 30 m²", advanced: "Hasta 50 m²", premium: "Hasta 70 m²" },
  { spec: "Vida Útil del Filtro", basic: "6 meses", advanced: "9 meses", premium: "12 meses" },
  { spec: "Nivel de Ruido", basic: "35-50 dB", advanced: "30-45 dB", premium: "25-40 dB" },
  { spec: "Consumo de Energía", basic: "40W", advanced: "35W", premium: "30W" },
  { spec: "Características Inteligentes", basic: false, advanced: true, premium: true },
  { spec: "Control por App", basic: "Básico", advanced: "Avanzado", premium: "Premium" },
  { spec: "Integración con Asistentes de Voz", basic: false, advanced: true, premium: true },
  { spec: "Modos de Operación", basic: "3 modos", advanced: "5 modos", premium: "7 modos + personalizado" },
  { spec: "Sensor de Calidad del Aire", basic: "Básico", advanced: "Avanzado", premium: "Profesional multi-partículas" },
  { spec: "Pantalla", basic: "LED básica", advanced: "LCD a color", premium: "LCD táctil a color" },
  { spec: "Eficacia de Purificación", basic: "Buena", advanced: "Muy Buena", premium: "Excelente" },
]

const ModelComparisonTable = ({ darkMode, t }) => {
  const tableRef = useRef(null)
  const isInView = useInView(tableRef, { once: true, margin: "-100px 0px" })

  const renderCell = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="mx-auto text-green-500" />
      ) : (
        <Minus className="mx-auto text-red-500" />
      )
    }
    return value
  }

  const getModelBadge = (model) => {
    switch (model) {
      case 'basic':
        return <Badge variant="outline">{t.basic}</Badge>
      case 'advanced':
        return <Badge variant="secondary">{t.advanced}</Badge>
      case 'premium':
        return <Badge variant="default">{t.premium}</Badge>
      default:
        return null
    }
  }

  return (
    <Card className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <CardHeader>
        <CardTitle>{t.comparison}</CardTitle>
        <CardDescription>{t.comparisonDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={tableRef} className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">{t.specifications}</TableHead>
                  <TableHead className="text-center">{getModelBadge('basic')}</TableHead>
                  <TableHead className="text-center">{getModelBadge('advanced')}</TableHead>
                  <TableHead className="text-center">{getModelBadge('premium')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <TableCell className="font-medium">{row.spec}</TableCell>
                    <TableCell className="text-center">{renderCell(row.basic)}</TableCell>
                    <TableCell className="text-center">{renderCell(row.advanced)}</TableCell>
                    <TableCell className="text-center">{renderCell(row.premium)}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ModelComparisonTable