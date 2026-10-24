import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'

const strings = new LocalizedStrings({
  fr: {
    SORT_BY: 'Trier par',
    SORT_DEFAULT: 'Par défaut',
    SORT_PRICE_ASC: 'Prix : Ordre croissant',
    SORT_PRICE_DESC: 'Prix : Ordre décroissant',
  },
  en: {
    SORT_BY: 'Sort by',
    SORT_DEFAULT: 'Default',
    SORT_PRICE_ASC: 'Price: Low to High',
    SORT_PRICE_DESC: 'Price: High to Low',
  },
})

langHelper.setLanguage(strings)
export { strings }
