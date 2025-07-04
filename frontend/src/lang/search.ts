import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
  },
  en: {
  },
})

langHelper.setLanguage(strings)
export { strings }
