  import LocalizedStrings from 'localized-strings'
  import * as langHelper from '@/utils/langHelper'

  const strings = new LocalizedStrings({
    fr: {
      SIGN_IN: 'Se connecter',
      HOME: 'Accueil',
      BOOKINGS: 'Réservations',
      ABOUT: 'À propos',
      TOS: "Conditions d'utilisation",
      CONTACT: 'Contact',
      LANGUAGE: 'Langue',
      SETTINGS: 'Paramètres',
      SIGN_OUT: 'Déconnexion',
      AGENCIES: 'Agences',
      LOCATIONS: 'Destinations',
      PRIVACY_POLICY: 'Politique de Confidentialité',
      COOKIE_POLICY: 'Politique de cookies',
      NOTIFICATIONS: 'Notifications',
    },
    en: {
      SIGN_IN: 'Sign in',
      HOME: 'Home',
      BOOKINGS: 'Bookings',
      ABOUT: 'About',
      TOS: 'Terms of Service',
      CONTACT: 'Contact',
      LANGUAGE: 'Language',
      SETTINGS: 'Settings',
      SIGN_OUT: 'Sign out',
      AGENCIES: 'Agencies',
      LOCATIONS: 'Destinations',
      PRIVACY_POLICY: 'Privacy Policy',
      COOKIE_POLICY: 'Cookie Policy',
      NOTIFICATIONS: 'Notifications',
    },
    de: {
      SIGN_IN: 'Anmelden',
      HOME: 'Startseite',
      BOOKINGS: 'Buchungen',
      ABOUT: 'Über uns',
      TOS: 'Nutzungsbedingungen',
      CONTACT: 'Kontakt',
      LANGUAGE: 'Sprache',
      SETTINGS: 'Einstellungen',
      SIGN_OUT: 'Abmelden',
      AGENCIES: 'Agenturen',
      LOCATIONS: 'Reiseziele',
      PRIVACY_POLICY: 'Datenschutzerklärung',
      COOKIE_POLICY: 'Cookie-Richtlinie',
      NOTIFICATIONS: 'Benachrichtigungen',
    },
  })

  langHelper.setLanguage(strings)
  export { strings }
