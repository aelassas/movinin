import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    RESET_PASSWORD_HEADING: 'Réinitialisation du mot de passe',
    RESET_PASSWORD: 'Veuillez saisir votre adresse e-mail afin de vous envoyer un e-mail pour réinitialiser votre mot de passe.',
    EMAIL_ERROR: 'Adresse e-mail non enregistrée',
    RESET: 'Réinitialiser',
    EMAIL_SENT: 'E-mail de réinitialisation du mot de passe envoyé.',
  },
  en: {
    RESET_PASSWORD_HEADING: 'Password Reset',
    RESET_PASSWORD: 'Please enter your email address so we can send you an email to reset your password.',
    EMAIL_ERROR: 'Email address not registered',
    RESET: 'Reset',
    EMAIL_SENT: 'Password reset email sent.',
  },
  de: {
    RESET_PASSWORD_HEADING: 'Passwort zurücksetzen',
    RESET_PASSWORD: 'Bitte geben Sie Ihre E-Mail-Adresse ein, damit wir Ihnen eine E-Mail zum Zurücksetzen Ihres Passworts senden können.',
    EMAIL_ERROR: 'E-Mail-Adresse nicht registriert',
    RESET: 'Zurücksetzen',
    EMAIL_SENT: 'E-Mail zum Zurücksetzen des Passworts gesendet.',
  },
  es: {
    RESET_PASSWORD_HEADING: 'Restablecimiento de contraseña',
    RESET_PASSWORD: 'Por favor, introduzca su dirección de correo electrónico para que podamos enviarle un mensaje para restablecer su contraseña.',
    EMAIL_ERROR: 'Dirección de correo electrónico no registrada',
    RESET: 'Restablecer',
    EMAIL_SENT: 'Correo electrónico de restablecimiento de contraseña enviado.',
  },
  pt: {
    RESET_PASSWORD_HEADING: 'Reposição da Palavra-passe',
    RESET_PASSWORD: 'Introduza o seu endereço de e-mail para lhe enviarmos um e-mail de reposição da palavra-passe.',
    EMAIL_ERROR: 'Endereço de e-mail não registado',
    RESET: 'Repor',
    EMAIL_SENT: 'E-mail de reposição da palavra-passe enviado.',
  },
})

langHelper.setLanguage(strings)
export { strings }
