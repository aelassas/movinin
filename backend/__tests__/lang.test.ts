import 'dotenv/config'
import { describe, expect, it } from '@jest/globals'
import * as env from '../src/config/env.config'
import i18n from '../src/lang/i18n'
import { en } from '../src/lang/en'
import { fr } from '../src/lang/fr'
import { de } from '../src/lang/de'
import { es } from '../src/lang/es'
import { pt } from '../src/lang/pt'
import { it as italian } from '../src/lang/it'
import { zh } from '../src/lang/zh'
import { ja } from '../src/lang/ja'

describe('Languages', () => {
  it('should support German', () => {
    expect(env.LANGUAGES).toContain('de')
  })

  it('should support Spanish', () => {
    expect(env.LANGUAGES).toContain('es')
  })

  it('should support Portuguese', () => {
    expect(env.LANGUAGES).toContain('pt')
  })

  it('should support Italian, Chinese and Japanese', () => {
    expect(env.LANGUAGES).toEqual(expect.arrayContaining(['it', 'zh', 'ja']))
  })

  it('should have the same translation keys in all languages', () => {
    const enKeys = Object.keys(en).sort()
    expect(Object.keys(de).sort()).toEqual(enKeys)
    expect(Object.keys(es).sort()).toEqual(enKeys)
    expect(Object.keys(pt).sort()).toEqual(enKeys)
    expect(Object.keys(italian).sort()).toEqual(enKeys)
    expect(Object.keys(zh).sort()).toEqual(enKeys)
    expect(Object.keys(ja).sort()).toEqual(enKeys)
    expect(Object.keys(fr).sort()).toEqual(enKeys)
  })

  it.each([
    ['it', italian],
    ['zh', zh],
    ['ja', ja],
  ])('should resolve %s translations', (locale, translations) => {
    i18n.locale = locale
    expect(i18n.t('ACCOUNT_ACTIVATION_SUBJECT')).toBe(translations.ACCOUNT_ACTIVATION_SUBJECT)
    expect(i18n.t('HELLO')).toBe(translations.HELLO)
    i18n.locale = 'en'
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
    i18n.locale = 'en'
  })

  it('should resolve Portuguese translations', () => {
    i18n.locale = 'pt'
    expect(i18n.t('ACCOUNT_ACTIVATION_SUBJECT')).toBe(pt.ACCOUNT_ACTIVATION_SUBJECT)
    expect(i18n.t('HELLO')).toBe(pt.HELLO)
    i18n.locale = 'en'
  })
})
