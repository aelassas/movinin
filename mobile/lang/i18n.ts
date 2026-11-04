import { I18n } from 'i18n-js'
import { en } from './en'
import { fr } from './fr'
import { de } from './de'
import { es } from './es'
import { pt } from './pt'
import { it } from './it'
import { zh } from './zh'
import { ja } from './ja'

const i18n = new I18n({ en, fr, de, es, pt, it, zh, ja })
i18n.enableFallback = true

export default i18n
