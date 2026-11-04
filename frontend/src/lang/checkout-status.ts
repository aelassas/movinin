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
})

langHelper.setLanguage(strings)
export { strings }
