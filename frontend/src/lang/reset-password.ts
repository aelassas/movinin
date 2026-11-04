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
  it: {
    RESET_PASSWORD_HEADING: 'Reimpostazione della password',
    RESET_PASSWORD: 'Inserisca il suo indirizzo e-mail: le invieremo un messaggio per reimpostare la password.',
    EMAIL_ERROR: 'Indirizzo e-mail non registrato',
    RESET: 'Reimposta',
    EMAIL_SENT: 'E-mail di reimpostazione della password inviata.',
  },
  zh: {
    RESET_PASSWORD_HEADING: '重置密码',
    RESET_PASSWORD: '请输入您的电子邮箱地址，我们将向您发送重置密码的邮件。',
    EMAIL_ERROR: '该电子邮箱地址未注册',
    RESET: '重置',
    EMAIL_SENT: '重置密码邮件已发送。',
  },
  ja: {
    RESET_PASSWORD_HEADING: 'パスワードの再設定',
    RESET_PASSWORD: 'メールアドレスを入力してください。パスワード再設定用のメールをお送りします。',
    EMAIL_ERROR: 'このメールアドレスは登録されていません',
    RESET: '再設定',
    EMAIL_SENT: 'パスワード再設定用のメールを送信しました。',
  },
})

langHelper.setLanguage(strings)
export { strings }
