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
  it: {
    SELECT_LOCATION: 'Seleziona destinazione',
  },
  zh: {
    SELECT_LOCATION: '选择目的地',
  },
  ja: {
    SELECT_LOCATION: '目的地を選択',
  },
})

langHelper.setLanguage(strings)
export { strings }
