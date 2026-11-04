import type { Locale } from 'date-fns'
import { de, enUS, es, fr, pt } from 'date-fns/locale'

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
    default:
      return enUS
  }
}
