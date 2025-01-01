import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SELECT_LOCATION: 'Choisir cette destination',
  },
  en: {
    SELECT_LOCATION: 'Select Destination',
  },
})

langHelper.setLanguage(strings)
export { strings }
