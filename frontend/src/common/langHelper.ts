import LocalizedStrings from 'localized-strings'
import env from '@/config/env.config'
import * as UserService from '@/services/UserService'

/**
 * Get current language.
 *
 * @returns {string}
 */
export const getLanguage = () => {
  let language = UserService.getQueryLanguage() ?? ''

  if (language === '' || !env.LANGUAGES.includes(language)) {
    language = UserService.getLanguage()
  }

  return language
}

/**
 * Set LocalizedStrings language.
 *
 * @param {LocalizedStrings} strings
 * @param {?string} [language]
 */
export const setLanguage = (strings: LocalizedStrings, language?: string) => {
  const lang = language || getLanguage()
  strings.setLanguage(lang)
}

/**
 * Check if current language is French.
 *
 * @returns {boolean}
 */
export const fr = (): boolean =>
  UserService.getLanguage() === 'fr'
