import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    ACTIVATE_HEADING: 'Activation du compte',
    TOKEN_EXPIRED: "Votre lien d'activation du compte a expiré.",
    ACTIVATE: 'Activer',
  },
  en: {
    ACTIVATE_HEADING: 'Account Activation',
    TOKEN_EXPIRED: 'Your account activation link expired.',
    ACTIVATE: 'Activate',
  },
  de: {
    ACTIVATE_HEADING: 'Kontoaktivierung',
    TOKEN_EXPIRED: 'Ihr Aktivierungslink für das Konto ist abgelaufen.',
    ACTIVATE: 'Aktivieren',
  },
  es: {
    ACTIVATE_HEADING: 'Activación de la cuenta',
    TOKEN_EXPIRED: 'El enlace de activación de tu cuenta ha caducado.',
    ACTIVATE: 'Activar',
  },
  pt: {
    ACTIVATE_HEADING: 'Ativação da conta',
    TOKEN_EXPIRED: 'O link de ativação da tua conta expirou.',
    ACTIVATE: 'Ativar',
  },
})

langHelper.setLanguage(strings)
export { strings }
