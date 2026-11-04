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
  pt: {
    SIGN_UP_HEADING: 'Registo',
    SIGN_UP: 'Registar',
    SIGN_UP_ERROR: 'Ocorreu um erro durante o registo.',
  },
  it: {
    SIGN_UP_HEADING: 'Registrazione',
    SIGN_UP: 'Registrati',
    SIGN_UP_ERROR: 'Si è verificato un errore durante la registrazione.',
  },
  zh: {
    SIGN_UP_HEADING: '注册',
    SIGN_UP: '注册',
    SIGN_UP_ERROR: '注册时出现错误。',
  },
  ja: {
    SIGN_UP_HEADING: '新規登録',
    SIGN_UP: '登録する',
    SIGN_UP_ERROR: '登録中にエラーが発生しました。',
  },
})

langHelper.setLanguage(strings)
export { strings }
