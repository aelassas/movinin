import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NEW_USER: 'Nouvel utilisateur',
  },
  en: {
    NEW_USER: 'New user',
  },
  de: {
    NEW_USER: 'Neuer Benutzer',
  },
  es: {
    NEW_USER: 'Nuevo usuario',
  },
  pt: {
    NEW_USER: 'Novo utilizador',
  },
  it: {
    NEW_USER: 'Nuovo utente',
  },
  zh: {
    NEW_USER: '新建用户',
  },
  ja: {
    NEW_USER: '新規ユーザー',
  },
})

langHelper.setLanguage(strings)
export { strings }
