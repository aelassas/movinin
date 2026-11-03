import type { Locale } from 'date-fns'
import { de, enUS, fr } from 'date-fns/locale'

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
    default:
      return enUS
  }
}
