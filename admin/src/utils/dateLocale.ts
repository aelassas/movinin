import type { Locale } from 'date-fns'
import { de, enUS, es, fr, it, ja, pt, zhCN } from 'date-fns/locale'

/**
 * Get date-fns locale from an ISO 639-1 language code.
 *
 * @param {?string} [language]
 * @returns {Locale}
 */
export const getDateLocale = (language?: string): Locale => {
  switch (language) {
    case 'fr':
      return fr
    case 'de':
      return de
    case 'es':
      return es
    case 'pt':
      return pt
    case 'it':
      return it
    case 'zh':
      return zhCN
    case 'ja':
      return ja
    default:
      return enUS
  }
}
