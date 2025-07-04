import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    LOCATION: 'Lieu',
  },
  en: {
    LOCATION: 'location',
  },
})

langHelper.setLanguage(strings)
export { strings }
