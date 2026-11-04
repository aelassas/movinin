import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    CONGRATULATIONS: 'Félicitation!',
    SUCCESS: 'Votre paiement a été effectué avec succès. Nous vous avons envoyé un e-mail de confirmation.',
    SUCCESS_PAY_LATER: 'Votre réservation a été effectuée avec succès. Nous vous avons envoyé un e-mail de confirmation.',
    ERROR: 'Une erreur est survenue ! Veuillez réessayer plus tard',
    STATUS_TITLE: `${env.WEBSITE_NAME} Confirmation de réservation`,
    STATUS_MESSAGE: "Vérifiez votre boîte mail et suivez les étapes décrites dans l'e-mail de confirmation de la réservation pour réserver votre propriété. Vous trouverez l'adresse de la propriété et le lien Google Maps dans l'e-mail de confirmation.",
    SESSION_ID_MISMATCH: 'ID de session non correspondant. Veuillez réessayer.',
  },
  en: {
    CONGRATULATIONS: 'Congratulations!',
    SUCCESS: 'Your payment was successfully done. We sent you a confirmation email.',
    SUCCESS_PAY_LATER: 'Your booking was successfully done. We sent you a confirmation email.',
    ERROR: 'Something went wrong! Try again later',
    STATUS_TITLE: `${env.WEBSITE_NAME} Booking Confirmation`,
    STATUS_MESSAGE: 'Check your mailbox and follow the steps described in the booking confirmation email to book your property. You will find property address and Google Maps link in the confirmation email.',
    SESSION_ID_MISMATCH: 'Session ID mismatch. Please try again.',
  },
  de: {
    CONGRATULATIONS: 'Herzlichen Glückwunsch!',
    SUCCESS: 'Ihre Zahlung wurde erfolgreich durchgeführt. Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.',
    SUCCESS_PAY_LATER: 'Ihre Buchung wurde erfolgreich durchgeführt. Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.',
    ERROR: 'Etwas ist schiefgelaufen! Bitte versuchen Sie es später erneut',
    STATUS_TITLE: `${env.WEBSITE_NAME} Buchungsbestätigung`,
    STATUS_MESSAGE: 'Überprüfen Sie Ihr Postfach und befolgen Sie die in der Buchungsbestätigungs-E-Mail beschriebenen Schritte, um Ihre Immobilie zu buchen. Die Adresse der Immobilie und den Google-Maps-Link finden Sie in der Bestätigungs-E-Mail.',
    SESSION_ID_MISMATCH: 'Session-ID stimmt nicht überein. Bitte versuchen Sie es erneut.',
  },
  es: {
    CONGRATULATIONS: '¡Felicidades!',
    SUCCESS: 'Su pago se ha realizado correctamente. Le hemos enviado un correo electrónico de confirmación.',
    SUCCESS_PAY_LATER: 'Su reserva se ha realizado correctamente. Le hemos enviado un correo electrónico de confirmación.',
    ERROR: '¡Algo salió mal! Inténtelo de nuevo más tarde',
    STATUS_TITLE: `${env.WEBSITE_NAME} Confirmación de reserva`,
    STATUS_MESSAGE: 'Revise su bandeja de entrada y siga los pasos descritos en el correo electrónico de confirmación de la reserva para reservar su propiedad. Encontrará la dirección de la propiedad y el enlace de Google Maps en el correo electrónico de confirmación.',
    SESSION_ID_MISMATCH: 'El ID de sesión no coincide. Por favor, inténtelo de nuevo.',
  },
  pt: {
    CONGRATULATIONS: 'Parabéns!',
    SUCCESS: 'O seu pagamento foi efetuado com sucesso. Enviámos-lhe um e-mail de confirmação.',
    SUCCESS_PAY_LATER: 'A sua reserva foi efetuada com sucesso. Enviámos-lhe um e-mail de confirmação.',
    ERROR: 'Ocorreu um erro! Tente novamente mais tarde',
    STATUS_TITLE: `Confirmação de Reserva ${env.WEBSITE_NAME}`,
    STATUS_MESSAGE: 'Verifique a sua caixa de correio e siga os passos descritos no e-mail de confirmação da reserva para reservar a sua propriedade. Encontrará a morada da propriedade e a ligação do Google Maps no e-mail de confirmação.',
    SESSION_ID_MISMATCH: 'O ID da sessão não corresponde. Tente novamente.',
  },
  it: {
    CONGRATULATIONS: 'Congratulazioni!',
    SUCCESS: "Il pagamento è stato effettuato con successo. Le abbiamo inviato un'e-mail di conferma.",
    SUCCESS_PAY_LATER: "La prenotazione è stata effettuata con successo. Le abbiamo inviato un'e-mail di conferma.",
    ERROR: 'Qualcosa è andato storto! Riprovi più tardi',
    STATUS_TITLE: `Conferma di prenotazione ${env.WEBSITE_NAME}`,
    STATUS_MESSAGE: "Controlli la sua casella di posta e segua i passaggi descritti nell'e-mail di conferma della prenotazione per prenotare il suo immobile. Troverà l'indirizzo dell'immobile e il link di Google Maps nell'e-mail di conferma.",
    SESSION_ID_MISMATCH: "L'ID di sessione non corrisponde. Riprovi.",
  },
  zh: {
    CONGRATULATIONS: '恭喜！',
    SUCCESS: '您的付款已成功完成。我们已向您发送了一封确认邮件。',
    SUCCESS_PAY_LATER: '您的预订已成功完成。我们已向您发送了一封确认邮件。',
    ERROR: '出错了！请稍后再试',
    STATUS_TITLE: `${env.WEBSITE_NAME} 预订确认`,
    STATUS_MESSAGE: '请查看您的邮箱，并按照预订确认邮件中的步骤预订您的房产。您可以在确认邮件中找到房产地址和 Google 地图链接。',
    SESSION_ID_MISMATCH: '会话 ID 不匹配。请重试。',
  },
  ja: {
    CONGRATULATIONS: 'おめでとうございます！',
    SUCCESS: 'お支払いが完了しました。確認メールをお送りしました。',
    SUCCESS_PAY_LATER: 'ご予約が完了しました。確認メールをお送りしました。',
    ERROR: '問題が発生しました。しばらくしてからもう一度お試しください',
    STATUS_TITLE: `${env.WEBSITE_NAME} 予約確認`,
    STATUS_MESSAGE: 'メールボックスをご確認のうえ、予約確認メールに記載された手順に従って物件をご予約ください。物件の住所と Google マップのリンクは確認メールに記載されています。',
    SESSION_ID_MISMATCH: 'セッション ID が一致しません。もう一度お試しください。',
  },
})

langHelper.setLanguage(strings)
export { strings }
