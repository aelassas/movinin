import LocalizedStrings from 'localized-strings'
import env from '@/config/env.config'
import * as langHelper from '@/common/langHelper'

const strings = new LocalizedStrings({
  fr: {
    NAME: 'Nom',
    AGENCY: 'Agency',
    LOCATION: 'Locatlisation',
    AVAILABLE: 'Disponible à la location',
    PROPERTY_TYPE: 'Type',
    PRICE: 'Prix',
    MINIMUM_AGE: 'Âge minimum',
    MINIMUM_AGE_NOT_VALID: `L'âge minimum doit être supérieur ou égal à ${env.MINIMUM_AGE} ans.`,
    ADDRESS: 'Adresse',
    DESCRIPTION: 'Description',
    BEDROOMS: 'Chambres à couche',
    BATHROOMS: 'Salles de bain',
    KITCHENS: 'Cuisines',
    PARKING_SPACES: 'Parkings',
    SIZE: 'Superficie',
    AIRCON: 'Climatisation',
    FURNISHED: 'Meublée',
    PETS_ALLOWED: 'Animaux domestiques',
    SOLD_OUT: 'Épuisée',
    HIDDEN: 'Cachée',
    IMAGES: 'Images',
    DESCRIPTION_REQUIRED: 'Le champ description est requis',
    RENTAL_TERM: 'Durée de location'
  },
  en: {
    NAME: 'Name',
    AGENCY: 'Agency',
    LOCATION: 'Location',
    AVAILABLE: 'Available for rental',
    PROPERTY_TYPE: 'Type',
    PRICE: 'Price',
    MINIMUM_AGE: 'Minimum age',
    MINIMUM_AGE_NOT_VALID: `Minimum age must be greater than or equal to ${env.MINIMUM_AGE} years old.`,
    ADDRESS: 'Address',
    DESCRIPTION: 'Description',
    BEDROOMS: 'Bedrooms',
    BATHROOMS: 'Bathrooms',
    KITCHENS: 'Kitchens',
    PARKING_SPACES: 'Parking spaces',
    SIZE: 'Size',
    AIRCON: 'Aircon',
    FURNISHED: 'Furnished',
    PETS_ALLOWED: 'Pets allowed',
    SOLD_OUT: 'Sold out',
    HIDDEN: 'Hidden',
    IMAGES: 'Images',
    DESCRIPTION_REQUIRED: 'Description is required',
    RENTAL_TERM: 'Rental term',
  },
})

langHelper.setLanguage(strings)
export { strings }
