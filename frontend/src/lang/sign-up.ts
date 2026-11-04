import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SIGN_UP_HEADING: 'Inscription',
    SIGN_UP: "S'inscrire",
    SIGN_UP_ERROR: "Une erreur s'est produite lors de l'inscription.",
  },
  en: {
    SIGN_UP_HEADING: 'Register',
    SIGN_UP: 'Register',
    SIGN_UP_ERROR: 'An error occurred during sign up.',
  },
  de: {
    SIGN_UP_HEADING: 'Registrierung',
    SIGN_UP: 'Registrieren',
    SIGN_UP_ERROR: 'Bei der Registrierung ist ein Fehler aufgetreten.',
  },
  es: {
    SIGN_UP_HEADING: 'Registro',
    SIGN_UP: 'Registrarse',
    SIGN_UP_ERROR: 'Se produjo un error durante el registro.',
  },
})

langHelper.setLanguage(strings)
export { strings }
