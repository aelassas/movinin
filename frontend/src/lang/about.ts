import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    TITLE1: `${env.WEBSITE_NAME} - Votre service de location de propriétés`,
    SUBTITLE1: 'Votre partenaire de confiance pour la location de propriétés',
    CONTENT1: `Chez ${env.WEBSITE_NAME}, nous comprenons que chaque voyage est unique. Nous nous engageons à fournir à nos clients une sélection diversifiée de propriétés qui répondent à tous les besoins de voyage. Que vous exploriez une ville, que vous vous déplaciez pour affaires ou que vous recherchiez l'aventure, nos services de location de propriétés fiables garantissent que votre aventure commence en toute transparence. Notre mission est de fournir un service client exceptionnel, rendant votre expérience agréable et sans stress. Avec des tarifs compétitifs, une variété de propriétés bien entretenus et une équipe dédiée prête à vous aider, nous nous efforçons d'être votre partenaire de confiance sur la route. Choisissez ${env.WEBSITE_NAME} pour tous vos besoins de location de propriété et découvrez la liberté d'explorer à votre rythme.`,
    TITLE2: `Pourquoi choisir ${env.WEBSITE_NAME}`,
    SUBTITLE2: "Découvrez l'excellence à chaque voyage",
    CONTENT2: "Profitez d'une commodité, d'une fiabilité et d'une valeur inégalées avec notre service de location de propriétés. Des réservations sans effort aux propriétés de haute qualité, nous sommes votre partenaire de voyage de confiance.",
    FIND_DEAL: 'Trouver une Offre',
  },
  en: {
    TITLE1: `${env.WEBSITE_NAME} - Your Premier Property Rental Service`,
    SUBTITLE1: 'Your Trusted Partner for Property Rentals',
    CONTENT1: `At ${env.WEBSITE_NAME}, we understand that every journey is unique. We are committed to providing our customers with a diverse selection of properties that cater to every travel need. Whether you're exploring a city, commuting for business, or seeking adventure, our reliable property rental services ensure that your adventure begins seamlessly. Our mission is to deliver exceptional customer service, making your experience enjoyable and stress-free. With competitive rates, a variety of well-maintained properties, and a dedicated team ready to assist you, we strive to be your trusted partner on the road. Choose ${env.WEBSITE_NAME} for all your property rental needs and experience the freedom to explore at your own pace.`,
    TITLE2: `Why Choose ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Experience Excellence in Every Journey',
    CONTENT2: "Enjoy unmatched convenience, reliability, and value with our premier property rental service. From effortless bookings to high-quality properties, we're your trusted travel partner.",
    FIND_DEAL: 'Find Deal',
  },
  de: {
    TITLE1: `${env.WEBSITE_NAME} - Ihr erstklassiger Immobilienvermietungsservice`,
    SUBTITLE1: 'Ihr vertrauenswürdiger Partner für Immobilienvermietung',
    CONTENT1: `Bei ${env.WEBSITE_NAME} wissen wir, dass jede Reise einzigartig ist. Wir haben es uns zur Aufgabe gemacht, unseren Kunden eine vielfältige Auswahl an Immobilien anzubieten, die jedem Reisebedürfnis gerecht wird. Ob Sie eine Stadt erkunden, geschäftlich unterwegs sind oder das Abenteuer suchen – unsere zuverlässigen Immobilienvermietungsservices sorgen dafür, dass Ihr Abenteuer nahtlos beginnt. Unsere Mission ist es, einen außergewöhnlichen Kundenservice zu bieten, der Ihr Erlebnis angenehm und stressfrei macht. Mit wettbewerbsfähigen Preisen, einer Vielzahl gepflegter Immobilien und einem engagierten Team, das Ihnen jederzeit zur Seite steht, möchten wir Ihr vertrauenswürdiger Partner unterwegs sein. Entscheiden Sie sich für ${env.WEBSITE_NAME} für alle Ihre Immobilienvermietungsbedürfnisse und erleben Sie die Freiheit, in Ihrem eigenen Tempo zu erkunden.`,
    TITLE2: `Warum ${env.WEBSITE_NAME} wählen`,
    SUBTITLE2: 'Erleben Sie Exzellenz auf jeder Reise',
    CONTENT2: 'Genießen Sie unübertroffenen Komfort, Zuverlässigkeit und Wert mit unserem erstklassigen Immobilienvermietungsservice. Von mühelosen Buchungen bis zu hochwertigen Immobilien – wir sind Ihr vertrauenswürdiger Reisepartner.',
    FIND_DEAL: 'Angebot finden',
  },
  es: {
    TITLE1: `${env.WEBSITE_NAME} - Su servicio de alquiler de propiedades de primera categoría`,
    SUBTITLE1: 'Su socio de confianza para el alquiler de propiedades',
    CONTENT1: `En ${env.WEBSITE_NAME} entendemos que cada viaje es único. Nos comprometemos a ofrecer a nuestros clientes una amplia selección de propiedades que se adaptan a todas las necesidades de viaje. Ya sea que explore una ciudad, viaje por negocios o busque aventura, nuestros fiables servicios de alquiler de propiedades garantizan que su aventura comience sin contratiempos. Nuestra misión es ofrecer un servicio de atención al cliente excepcional, para que su experiencia sea agradable y libre de estrés. Con precios competitivos, una gran variedad de propiedades bien cuidadas y un equipo dedicado dispuesto a ayudarle, nos esforzamos por ser su socio de confianza en el camino. Elija ${env.WEBSITE_NAME} para todas sus necesidades de alquiler de propiedades y descubra la libertad de explorar a su propio ritmo.`,
    TITLE2: `Por qué elegir ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Viva la excelencia en cada viaje',
    CONTENT2: 'Disfrute de una comodidad, una fiabilidad y un valor inigualables con nuestro servicio de alquiler de propiedades de primera categoría. Desde reservas sin complicaciones hasta propiedades de alta calidad, somos su compañero de viaje de confianza.',
    FIND_DEAL: 'Encontrar oferta',
  },
  pt: {
    TITLE1: `${env.WEBSITE_NAME} - O Seu Serviço de Aluguer de Propriedades de Referência`,
    SUBTITLE1: 'O Seu Parceiro de Confiança para o Aluguer de Propriedades',
    CONTENT1: `Na ${env.WEBSITE_NAME}, sabemos que cada viagem é única. Comprometemo-nos a oferecer aos nossos clientes uma seleção diversificada de propriedades que respondem a todas as necessidades de viagem. Quer esteja a explorar uma cidade, em deslocação profissional ou à procura de aventura, os nossos fiáveis serviços de aluguer de propriedades garantem que a sua aventura começa sem sobressaltos. A nossa missão é prestar um atendimento excecional, tornando a sua experiência agradável e sem preocupações. Com preços competitivos, uma variedade de propriedades bem conservadas e uma equipa dedicada pronta a ajudá-lo, esforçamo-nos por ser o seu parceiro de confiança na estrada. Escolha a ${env.WEBSITE_NAME} para todas as suas necessidades de aluguer de propriedades e descubra a liberdade de explorar ao seu ritmo.`,
    TITLE2: `Porquê Escolher a ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Viva a Excelência em Cada Viagem',
    CONTENT2: 'Desfrute de conveniência, fiabilidade e valor inigualáveis com o nosso serviço de aluguer de propriedades de referência. Desde reservas sem esforço a propriedades de elevada qualidade, somos o seu parceiro de viagem de confiança.',
    FIND_DEAL: 'Encontrar Oferta',
  },
})

langHelper.setLanguage(strings)
export { strings }
