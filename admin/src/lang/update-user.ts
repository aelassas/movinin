import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    UPDATE_USER_HEADING: "Modification de l'utilisateur",
  },
  en: {
    UPDATE_USER_HEADING: 'User update',
  },
  de: {
    UPDATE_USER_HEADING: 'Benutzer aktualisieren',
  },
  es: {
    UPDATE_USER_HEADING: 'Actualización del usuario',
  },
  pt: {
    UPDATE_USER_HEADING: 'Atualização do utilizador',
  },
})

langHelper.setLanguage(strings)
export { strings }
