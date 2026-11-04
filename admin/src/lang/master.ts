import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    VALIDATE_EMAIL: "Un e-mail de validation a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte aux lettres et valider votre compte en cliquant sur le lien dans l'e-mail. Il expirera au bout d'un jour. Si vous n'avez pas reçu d'e-mail de validation, cliquez sur renvoyer.",
    RESEND: 'Renvoyer',
    VALIDATION_EMAIL_SENT: 'E-mail de validation envoyé.',
    VALIDATION_EMAIL_ERROR: "Une erreur s'est produite lors de l'envoi de l'e-mail de validation.",
  },
  en: {
    VALIDATE_EMAIL: "A validation email has been sent to your email address. Please check your mailbox and validate your account by clicking the link in the email. It will be expire after one day. If you didn't receive the validation email click on resend.",
    RESEND: 'Resend',
    VALIDATION_EMAIL_SENT: 'Validation email sent.',
    VALIDATION_EMAIL_ERROR: 'An error occurred while sending validation email.',
  },
  de: {
    VALIDATE_EMAIL: 'Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihr Postfach und bestätigen Sie Ihr Konto, indem Sie auf den Link in der E-Mail klicken. Der Link läuft nach einem Tag ab. Falls Sie die Bestätigungs-E-Mail nicht erhalten haben, klicken Sie auf „Erneut senden“.',
    RESEND: 'Erneut senden',
    VALIDATION_EMAIL_SENT: 'Bestätigungs-E-Mail gesendet.',
    VALIDATION_EMAIL_ERROR: 'Beim Senden der Bestätigungs-E-Mail ist ein Fehler aufgetreten.',
  },
  es: {
    VALIDATE_EMAIL: 'Se ha enviado un correo de validación a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y valida tu cuenta haciendo clic en el enlace del correo. Caducará después de un día. Si no has recibido el correo de validación, haz clic en reenviar.',
    RESEND: 'Reenviar',
    VALIDATION_EMAIL_SENT: 'Correo de validación enviado.',
    VALIDATION_EMAIL_ERROR: 'Se ha producido un error al enviar el correo de validación.',
  },
  pt: {
    VALIDATE_EMAIL: 'Foi enviado um e-mail de validação para o teu endereço de e-mail. Por favor, verifica a tua caixa de correio e valida a tua conta clicando no link do e-mail. Expirará ao fim de um dia. Se não recebeste o e-mail de validação, clica em reenviar.',
    RESEND: 'Reenviar',
    VALIDATION_EMAIL_SENT: 'E-mail de validação enviado.',
    VALIDATION_EMAIL_ERROR: 'Ocorreu um erro ao enviar o e-mail de validação.',
  },
  it: {
    VALIDATE_EMAIL: "È stata inviata un'email di convalida al tuo indirizzo email. Controlla la tua casella di posta e convalida il tuo account facendo clic sul link nell'email. Scadrà dopo un giorno. Se non hai ricevuto l'email di convalida, fai clic su Invia di nuovo.",
    RESEND: 'Invia di nuovo',
    VALIDATION_EMAIL_SENT: 'Email di convalida inviata.',
    VALIDATION_EMAIL_ERROR: "Si è verificato un errore durante l'invio dell'email di convalida.",
  },
  zh: {
    VALIDATE_EMAIL: '验证邮件已发送至您的邮箱。请查看收件箱，并点击邮件中的链接验证您的账户。链接将在一天后失效。如果您没有收到验证邮件，请点击“重新发送”。',
    RESEND: '重新发送',
    VALIDATION_EMAIL_SENT: '验证邮件已发送。',
    VALIDATION_EMAIL_ERROR: '发送验证邮件时出错。',
  },
  ja: {
    VALIDATE_EMAIL: '確認メールをメールアドレスに送信しました。受信トレイを確認し、メール内のリンクをクリックしてアカウントを認証してください。リンクの有効期限は1日です。確認メールが届かない場合は、「再送信」をクリックしてください。',
    RESEND: '再送信',
    VALIDATION_EMAIL_SENT: '確認メールを送信しました。',
    VALIDATION_EMAIL_ERROR: '確認メールの送信中にエラーが発生しました。',
  },
})

langHelper.setLanguage(strings)
export { strings }
