import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    DASHBOARD: 'Tableau de bord',
    SCHEDULER: 'Planificateur',
    HOME: 'Accueil',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Lieux',
    PROPERTIES: 'Propriétés',
    USERS: 'Utilisateurs',
    ABOUT: 'À propos',
    TOS: "Conditions d'utilisation",
    CONTACT: 'Contact',
    LANGUAGE: 'Langue',
    SETTINGS: 'Paramètres',
    SIGN_OUT: 'Déconnexion',
    COUNTRIES: 'Pays',
  },
  en: {
    DASHBOARD: 'Dashboard',
    SCHEDULER: 'Property Scheduler',
    HOME: 'Home',
    AGENCIES: 'Agencies',
    LOCATIONS: 'Locations',
    PROPERTIES: 'Properties',
    USERS: 'Users',
    ABOUT: 'About',
    TOS: 'Terms of Service',
    CONTACT: 'Contact',
    LANGUAGE: 'Language',
    SETTINGS: 'Settings',
    SIGN_OUT: 'Sign out',
    COUNTRIES: 'Countries',
  },
  de: {
    DASHBOARD: 'Dashboard',
    SCHEDULER: 'Immobilienplaner',
    HOME: 'Startseite',
    AGENCIES: 'Agenturen',
    LOCATIONS: 'Standorte',
    PROPERTIES: 'Immobilien',
    USERS: 'Benutzer',
    ABOUT: 'Über uns',
    TOS: 'Nutzungsbedingungen',
    CONTACT: 'Kontakt',
    LANGUAGE: 'Sprache',
    SETTINGS: 'Einstellungen',
    SIGN_OUT: 'Abmelden',
    COUNTRIES: 'Länder',
  },
})

langHelper.setLanguage(strings)
export { strings }
