import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Choisir cette destination',
    AVALIABLE_LOCATION: 'lieu disponible',
    AVALIABLE_LOCATIONS: 'lieux disponibles',
  },
  en: {
    SELECT_LOCATION: 'Select Destination',
    AVALIABLE_LOCATION: 'available location',
    AVALIABLE_LOCATIONS: 'available locations',
  },
  de: {
    SELECT_LOCATION: 'Reiseziel auswählen',
    AVALIABLE_LOCATION: 'verfügbarer Standort',
    AVALIABLE_LOCATIONS: 'verfügbare Standorte',
  },
  es: {
    SELECT_LOCATION: 'Seleccionar destino',
    AVALIABLE_LOCATION: 'ubicación disponible',
    AVALIABLE_LOCATIONS: 'ubicaciones disponibles',
  },
  pt: {
    SELECT_LOCATION: 'Selecionar destino',
    AVALIABLE_LOCATION: 'localização disponível',
    AVALIABLE_LOCATIONS: 'localizações disponíveis',
  },
  it: {
    SELECT_LOCATION: 'Seleziona la destinazione',
    AVALIABLE_LOCATION: 'località disponibile',
    AVALIABLE_LOCATIONS: 'località disponibili',
  },
  zh: {
    SELECT_LOCATION: '选择目的地',
    AVALIABLE_LOCATION: '个可用地点',
    AVALIABLE_LOCATIONS: '个可用地点',
  },
  ja: {
    SELECT_LOCATION: '目的地を選択',
    AVALIABLE_LOCATION: 'か所の利用可能な場所',
    AVALIABLE_LOCATIONS: 'か所の利用可能な場所',
  },
})

langHelper.setLanguage(strings)
export { strings }
