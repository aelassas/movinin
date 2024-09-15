import LocalizedStrings from 'react-localization'
import * as langHelper from '@/common/langHelper'

const COPYRIGHT_PART1 = `Copyright © ${new Date().getFullYear()} Movin' In`

const strings = new LocalizedStrings({
  fr: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. Tous droits réservés.',

    CORPORATE: 'À Propos',
    ABOUT: 'À propos de Nous',
    TOS: "Conditions d'utilisation",
    RENT: 'Louer une Propriété',
    AGENCIES: 'Agences',
    LOCATIONS: 'Destinations',
    SUPPORT: 'Support',
    CONTACT: 'Contact',
    SECURE_PAYMENT: "Paiement 100% sécurisé avec Movin' In",
  },
  en: {
    COPYRIGHT_PART1,
    COPYRIGHT_PART2: '. All rights reserved.',

    CORPORATE: 'Corporate',
    ABOUT: 'About Us',
    TOS: 'Terms of Service',
    RENT: 'Rent a Property',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Destinations',
    SUPPORT: 'Support',
    CONTACT: 'Contact',
    SECURE_PAYMENT: "100% secure payment with Movin' In",
  },
})

langHelper.setLanguage(strings)
export { strings }
