import { I18n } from 'i18n-js'
import { en } from './en'
import { fr } from './fr'
import { de } from './de'
import { es } from './es'
import { pt } from './pt'

const i18n = new I18n({ en, fr, de, es, pt })
i18n.enableFallback = true

export default i18n
