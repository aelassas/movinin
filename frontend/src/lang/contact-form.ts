import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    CONTACT_HEADING: 'Contact',
    SUBJECT: 'Objet',
    MESSAGE: 'Message',
    SEND: 'Envoyer',
    MESSAGE_SENT: 'Message envoyé',
  },
  en: {
    CONTACT_HEADING: 'Contact',
    SUBJECT: 'Subject',
    MESSAGE: 'Message',
    SEND: 'Send',
    MESSAGE_SENT: 'Message sent'
  },
  de: {
    CONTACT_HEADING: 'Kontakt',
    SUBJECT: 'Betreff',
    MESSAGE: 'Nachricht',
    SEND: 'Senden',
    MESSAGE_SENT: 'Nachricht gesendet'
  },
  es: {
    CONTACT_HEADING: 'Contacto',
    SUBJECT: 'Asunto',
    MESSAGE: 'Mensaje',
    SEND: 'Enviar',
    MESSAGE_SENT: 'Mensaje enviado',
  },
  el: {
    CONTACT_HEADING: 'Επικοινωνία',
    SUBJECT: 'Θέμα',
    MESSAGE: 'Μήνυμα',
    SEND: 'Στείλετε',
    MESSAGE_SENT: 'Το μήνυμα στάλθηκε'
  },
})

langHelper.setLanguage(strings)
export { strings }
