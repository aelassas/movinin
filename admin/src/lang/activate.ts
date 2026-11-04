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
  it: {
    ACTIVATE_HEADING: "Attivazione dell'account",
    TOKEN_EXPIRED: 'Il link di attivazione del tuo account è scaduto.',
    ACTIVATE: 'Attiva',
  },
  zh: {
    ACTIVATE_HEADING: '账户激活',
    TOKEN_EXPIRED: '你的账户激活链接已过期。',
    ACTIVATE: '激活',
  },
  ja: {
    ACTIVATE_HEADING: 'アカウントの有効化',
    TOKEN_EXPIRED: 'アカウント有効化リンクの有効期限が切れました。',
    ACTIVATE: '有効化',
  },
})

langHelper.setLanguage(strings)
export { strings }
