import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    TITLE: "Bienvenue sur l'immobilier",
    COVER: 'Rechercher des biens immobiliers',
    DESTINATIONS_TITLE: 'Parcourir par destinations',
    MAP_TITLE: 'Carte des destinations',
    SERVICES_TITLE: "Qu'est-ce qui nous différencie ?",
    SERVICES_FLEET_TITLE: 'Large gamme de propriétés',
    SERVICES_FLEET: "Des appartements aux maisons de luxe, nos propriétés distinctives répondent à tous les besoins de voyage. Qu'il s'agisse d'affaires ou de loisirs, nous avons la propriété parfaite pour vous.",
    SERVICES_FLEXIBLE_TITLE: 'Planification flexible',
    SERVICES_FLEXIBLE: "En offrant des emplacements pratiques et une planification flexible, nous facilitons la location d'une propriété. Que vous arriviez dans une ville ou dans un aéroport international, votre propriété sera prête quand vous l'êtes",
    SERVICES_PRICES_TITLE: 'Excellents Prix',
    SERVICES_PRICES: 'Nous proposons des tarifs compétitifs sur toutes les propriétés, vous garantissant ainsi des propriétés de qualité supérieure à des prix imbattables. Pas besoin de faire de compromis : obtenez un excellent rapport qualité-prix à chaque fois.',
    SERVICES_BOOKING_ONLINE_TITLE: 'Réservation en ligne facile',
    SERVICES_BOOKING_ONLINE: "Évitez les files d'attente et réservez votre propriété en quelques minutes grâce à notre plateforme en ligne conviviale. Comparez les options, personnalisez votre location et sécurisez votre propriété sans effort",
    SERVICE_INSTANT_BOOKING_TITLE: 'Réservation instantanée',
    SERVICE_INSTANT_BOOKING: "Pas d'attente ! Une fois que vous avez choisi votre propriété et terminé votre réservation, vous recevrez une confirmation immédiate, garantissant un processus de location fluide et sans tracas.",
    SERVICES_SUPPORT_TITLE: 'Assistance client 24h/24 et 7j/7',
    SERVICES_SUPPORT: "Que vous réserviez une propriété, ayez besoin d'aide ou ayez des questions, notre équipe d'assistance dédiée est disponible 24h/24.",
    CUSTOMER_CARE_TITLE: `Service client ${env.WEBSITE_NAME}`,
    CONTACT_US: 'Contactez-nous',
    CUSTOMER_CARE_SUBTITLE: 'Toujours là pour vous aider',
    CUSTOMER_CARE_TEXT: `Chez ${env.WEBSITE_NAME}, nous nous engageons à fournir une assistance rapide et fiable pour garantir que votre expérience de location de propriété soit fluide et agréable du début à la fin.`,
    CUSTOMER_CARE_ASSISTANCE: 'Assistance 24h/24 et 7j/7',
    CUSTOMER_CARE_MODIFICATION: 'Demandes et modifications',
    CUSTOMER_CARE_GUIDANCE: 'Conseils pour la sélection de biens',
    CUSTOMER_CARE_SUPPORT: 'Conseils et assistance',
  },
  en: {
    TITLE: 'Welcome to Real Estate',
    COVER: 'Search for Real Estate, Property & Homes',
    DESTINATIONS_TITLE: 'Browse by Destinations',
    MAP_TITLE: 'Map of Destinations',
    SERVICES_TITLE: 'What Makes Us Different?',
    SERVICES_FLEET_TITLE: 'Wide Range Of Properties',
    SERVICES_FLEET: "From apartments to luxury houses, our distinctive properties cater to every travel need. Whether it's business or leisure, we have the perfect property for you.",
    SERVICES_FLEXIBLE_TITLE: 'Flexible Scheduling',
    SERVICES_FLEXIBLE: "Offering convenient locations and flexible scheduling, we make renting a property hassle-free. Whether you're arriving a city or an International Airport, your property will be ready when you are.",
    SERVICES_PRICES_TITLE: 'Excellent Prices',
    SERVICES_PRICES: 'We offer competitive rates on all poperties, ensuring you get top-quality properties at unbeatable prices. No need to compromise - get great value for your money every time.',
    SERVICES_BOOKING_ONLINE_TITLE: 'Easy Online Booking',
    SERVICES_BOOKING_ONLINE: 'Skip the lines and book your property in minutes through our user-friendly online platform. Compare options, customize your rental, and secure your property effortlessly.',
    SERVICE_INSTANT_BOOKING_TITLE: 'Instant Booking',
    SERVICE_INSTANT_BOOKING: "No waiting around! Once you choose your property and complete your booking, you'll receive an immediate confirmation, ensuring a smooth and hassle-free rental process.",
    SERVICES_SUPPORT_TITLE: '24/7 Customer Support',
    SERVICES_SUPPORT: "Whether you're booking a property, need assistance, or have any questions, our dedicated support team is available around the clock.",
    CUSTOMER_CARE_TITLE: `${env.WEBSITE_NAME} Customer Care`,
    CONTACT_US: 'Contact Us',
    CUSTOMER_CARE_SUBTITLE: 'Always Here to Help',
    CUSTOMER_CARE_TEXT: `At ${env.WEBSITE_NAME}, we're dedicated to providing prompt and reliable support to ensure your property rental experience is smooth and enjoyable from start to finish.`,
    CUSTOMER_CARE_ASSISTANCE: '24/7 Assistance',
    CUSTOMER_CARE_MODIFICATION: 'Inquiries and Modifications',
    CUSTOMER_CARE_GUIDANCE: 'Property Selection Guidance',
    CUSTOMER_CARE_SUPPORT: 'Advice and Support',
  },
})

langHelper.setLanguage(strings)
export { strings }
