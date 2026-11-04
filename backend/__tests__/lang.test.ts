import 'dotenv/config'
import { describe, expect, it } from '@jest/globals'
import * as env from '../src/config/env.config'
import i18n from '../src/lang/i18n'
import { en } from '../src/lang/en'
import { fr } from '../src/lang/fr'
import { de } from '../src/lang/de'
import { es } from '../src/lang/es'

describe('Languages', () => {
  it('should support German', () => {
    expect(env.LANGUAGES).toContain('de')
  })

  it('should support Spanish', () => {
    expect(env.LANGUAGES).toContain('es')
  })

  it('should have the same translation keys in all languages', () => {
    const enKeys = Object.keys(en).sort()
    expect(Object.keys(de).sort()).toEqual(enKeys)
    expect(Object.keys(es).sort()).toEqual(enKeys)
    expect(Object.keys(fr).sort()).toEqual(enKeys)
  })

  it('should resolve German translations', () => {
    i18n.locale = 'de'
    expect(i18n.t('ACCOUNT_ACTIVATION_SUBJECT')).toBe(de.ACCOUNT_ACTIVATION_SUBJECT)
    expect(i18n.t('HELLO')).toBe('Hallo ')
    i18n.locale = 'en'
  })

  it('should resolve Spanish translations', () => {
    i18n.locale = 'es'
    expect(i18n.t('ACCOUNT_ACTIVATION_SUBJECT')).toBe(es.ACCOUNT_ACTIVATION_SUBJECT)
    expect(i18n.t('HELLO')).toBe(es.HELLO)
    i18n.locale = 'en'
  })
})
