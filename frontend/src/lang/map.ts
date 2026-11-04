import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Choisir cette destination',
  },
  en: {
    SELECT_LOCATION: 'Select Destination',
  },
  de: {
    SELECT_LOCATION: 'Reiseziel auswählen',
  },
  es: {
    SELECT_LOCATION: 'Seleccionar destino',
  },
  pt: {
    SELECT_LOCATION: 'Selecionar destino',
  },
})

langHelper.setLanguage(strings)
export { strings }
