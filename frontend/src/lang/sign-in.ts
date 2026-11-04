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
  pt: {
    SIGN_IN_HEADING: 'Iniciar sessão',
    SIGN_IN: 'Iniciar sessão',
    SIGN_UP: 'Registar-se',
    ERROR_IN_SIGN_IN: 'E-mail ou palavra-passe incorretos.',
    IS_BLACKLISTED: 'A sua conta está suspensa.',
    RESET_PASSWORD: 'Esqueceu-se da palavra-passe?',
    STAY_CONNECTED: 'Manter sessão iniciada',
  },
  it: {
    SIGN_IN_HEADING: 'Accesso',
    SIGN_IN: 'Accedi',
    SIGN_UP: 'Registrati',
    ERROR_IN_SIGN_IN: 'E-mail o password non corretta.',
    IS_BLACKLISTED: 'Il suo account è sospeso.',
    RESET_PASSWORD: 'Password dimenticata?',
    STAY_CONNECTED: 'Rimani connesso',
  },
  zh: {
    SIGN_IN_HEADING: '登录',
    SIGN_IN: '登录',
    SIGN_UP: '注册',
    ERROR_IN_SIGN_IN: '邮箱或密码错误。',
    IS_BLACKLISTED: '您的账户已被停用。',
    RESET_PASSWORD: '忘记密码？',
    STAY_CONNECTED: '保持登录状态',
  },
  ja: {
    SIGN_IN_HEADING: 'ログイン',
    SIGN_IN: 'ログイン',
    SIGN_UP: '新規登録',
    ERROR_IN_SIGN_IN: 'メールアドレスまたはパスワードが正しくありません。',
    IS_BLACKLISTED: 'お客様のアカウントは停止されています。',
    RESET_PASSWORD: 'パスワードをお忘れですか？',
    STAY_CONNECTED: 'ログイン状態を保持する',
  },
})

langHelper.setLanguage(strings)
export { strings }
