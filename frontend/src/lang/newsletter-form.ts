import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    TITLE: 'Abonnez-vous',
    SUB_TITLE: 'Abonnez-vous à notre liste de diffusion pour recevoir les dernières mises à jour !',
    SUBSCRIBE: "S'abonner",
    SUCCESS: 'Inscription réussie !',
  },
  en: {
    TITLE: 'Subscribe',
    SUB_TITLE: 'Subscribe to our mailing list for the latest updates!',
    SUBSCRIBE: 'Subscribe',
    SUCCESS: 'Subscription successful!',
  },
  de: {
    TITLE: 'Abonnieren',
    SUB_TITLE: 'Abonnieren Sie unseren Newsletter, um die neuesten Updates zu erhalten!',
    SUBSCRIBE: 'Abonnieren',
    SUCCESS: 'Abonnement erfolgreich!',
  },
  es: {
    TITLE: 'Suscribirse',
    SUB_TITLE: '¡Suscríbase a nuestra lista de correo para recibir las últimas novedades!',
    SUBSCRIBE: 'Suscribirse',
    SUCCESS: '¡Suscripción realizada con éxito!',
  },
  pt: {
    TITLE: 'Subscrever',
    SUB_TITLE: 'Subscreva a nossa lista de correio para receber as últimas novidades!',
    SUBSCRIBE: 'Subscrever',
    SUCCESS: 'Subscrição efetuada com sucesso!',
  },
  it: {
    TITLE: 'Iscriviti',
    SUB_TITLE: 'Iscriviti alla nostra mailing list per ricevere gli ultimi aggiornamenti!',
    SUBSCRIBE: 'Iscriviti',
    SUCCESS: 'Iscrizione completata con successo!',
  },
  zh: {
    TITLE: '订阅',
    SUB_TITLE: '订阅我们的邮件列表，获取最新动态！',
    SUBSCRIBE: '订阅',
    SUCCESS: '订阅成功！',
  },
  ja: {
    TITLE: '購読登録',
    SUB_TITLE: 'メーリングリストに登録して、最新情報を受け取りましょう！',
    SUBSCRIBE: '登録する',
    SUCCESS: '登録が完了しました！',
  },
})

langHelper.setLanguage(strings)
export { strings }
