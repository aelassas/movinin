import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
  },
  en: {
  },
  de: {
  },
})

langHelper.setLanguage(strings)
export { strings }
