import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UNAUTHORIZED: 'Accès non autorisé',
  },
  en: {
    UNAUTHORIZED: 'Unauthorized access',
  },
  de: {
    UNAUTHORIZED: 'Unbefugter Zugriff',
  },
  es: {
    UNAUTHORIZED: 'Acceso no autorizado',
  },
  pt: {
    UNAUTHORIZED: 'Acesso não autorizado',
  },
})

langHelper.setLanguage(strings)
export { strings }
