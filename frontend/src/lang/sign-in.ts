import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SIGN_IN_HEADING: 'Connexion',
    SIGN_IN: 'Se connecter',
    SIGN_UP: "S'inscrire",
    ERROR_IN_SIGN_IN: 'E-mail ou mot de passe incorrect.',
    IS_BLACKLISTED: 'Votre compte est suspendu.',
    RESET_PASSWORD: 'Mot de passe oublié ?',
    STAY_CONNECTED: 'Rester connecté',
  },
  en: {
    SIGN_IN_HEADING: 'Sign in',
    SIGN_IN: 'Sign in',
    SIGN_UP: 'Sign up',
    ERROR_IN_SIGN_IN: 'Incorrect email or password.',
    IS_BLACKLISTED: 'Your account is suspended.',
    RESET_PASSWORD: 'Forgot password?',
    STAY_CONNECTED: 'Stay connected',
  },
  de: {
    SIGN_IN_HEADING: 'Anmelden',
    SIGN_IN: 'Anmelden',
    SIGN_UP: 'Registrieren',
    ERROR_IN_SIGN_IN: 'Falsche E-Mail-Adresse oder falsches Passwort.',
    IS_BLACKLISTED: 'Ihr Konto ist gesperrt.',
    RESET_PASSWORD: 'Passwort vergessen?',
    STAY_CONNECTED: 'Angemeldet bleiben',
  },
  es: {
    SIGN_IN_HEADING: 'Iniciar sesión',
    SIGN_IN: 'Iniciar sesión',
    SIGN_UP: 'Registrarse',
    ERROR_IN_SIGN_IN: 'Correo electrónico o contraseña incorrectos.',
    IS_BLACKLISTED: 'Su cuenta está suspendida.',
    RESET_PASSWORD: '¿Olvidó su contraseña?',
    STAY_CONNECTED: 'Mantener la sesión iniciada',
  },
})

langHelper.setLanguage(strings)
export { strings }
