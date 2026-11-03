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
})

langHelper.setLanguage(strings)
export { strings }
