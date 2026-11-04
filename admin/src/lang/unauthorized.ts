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
  it: {
    UNAUTHORIZED: 'Accesso non autorizzato',
  },
  zh: {
    UNAUTHORIZED: '未经授权的访问',
  },
  ja: {
    UNAUTHORIZED: 'アクセス権限がありません',
  },
})

langHelper.setLanguage(strings)
export { strings }
