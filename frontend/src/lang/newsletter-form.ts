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
})

langHelper.setLanguage(strings)
export { strings }
