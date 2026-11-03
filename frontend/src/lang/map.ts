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
})

langHelper.setLanguage(strings)
export { strings }
