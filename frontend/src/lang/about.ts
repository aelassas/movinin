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
  it: {
    TITLE1: `${env.WEBSITE_NAME} - Il servizio di affitto immobili di riferimento`,
    SUBTITLE1: "Il partner di fiducia per l'affitto di immobili",
    CONTENT1: `Da ${env.WEBSITE_NAME} sappiamo che ogni viaggio è unico. Ci impegniamo a offrire ai nostri clienti una selezione variegata di immobili in grado di soddisfare ogni esigenza di viaggio. Che stia esplorando una città, viaggiando per lavoro o cercando l'avventura, i nostri affidabili servizi di affitto immobili garantiscono che la sua avventura inizi senza intoppi. La nostra missione è offrire un servizio clienti eccezionale, per rendere la sua esperienza piacevole e senza pensieri. Con tariffe competitive, un'ampia scelta di immobili ben curati e un team dedicato pronto ad assisterla, ci impegniamo a essere il suo partner di fiducia lungo il cammino. Scelga ${env.WEBSITE_NAME} per tutte le sue esigenze di affitto immobili e scopra la libertà di esplorare al suo ritmo.`,
    TITLE2: `Perché scegliere ${env.WEBSITE_NAME}`,
    SUBTITLE2: "L'eccellenza in ogni viaggio",
    CONTENT2: 'Goda di comodità, affidabilità e valore senza pari con il nostro servizio di affitto immobili di riferimento. Dalle prenotazioni senza sforzo agli immobili di alta qualità, siamo il suo partner di viaggio di fiducia.',
    FIND_DEAL: 'Trova offerta',
  },
  zh: {
    TITLE1: `${env.WEBSITE_NAME} - 您值得信赖的房产租赁服务`,
    SUBTITLE1: '房产租赁的可靠合作伙伴',
    CONTENT1: `在 ${env.WEBSITE_NAME}，我们深知每一次旅程都是独一无二的。我们致力于为客户提供丰富多样的房产选择，满足各种出行需求。无论您是探索城市、出差办公，还是寻求冒险，我们可靠的房产租赁服务都能让您的旅程顺利开启。我们的使命是提供卓越的客户服务，让您的体验愉快无忧。凭借具有竞争力的价格、种类丰富且维护良好的房产，以及随时为您提供帮助的专业团队，我们努力成为您旅途中值得信赖的伙伴。选择 ${env.WEBSITE_NAME} 满足您所有的房产租赁需求，尽享按自己的节奏自由探索的乐趣。`,
    TITLE2: `为什么选择 ${env.WEBSITE_NAME}`,
    SUBTITLE2: '每一段旅程，尽享卓越体验',
    CONTENT2: '我们一流的房产租赁服务为您带来无与伦比的便利、可靠与价值。从轻松预订到高品质房产，我们是您值得信赖的旅行伙伴。',
    FIND_DEAL: '查找优惠',
  },
  ja: {
    TITLE1: `${env.WEBSITE_NAME} - 信頼できる不動産レンタルサービス`,
    SUBTITLE1: '不動産レンタルの頼れるパートナー',
    CONTENT1: `${env.WEBSITE_NAME}では、旅は一つひとつ異なるものだと考えております。お客様のあらゆる旅のニーズにお応えできるよう、多彩な物件をご用意しております。街の散策、出張、冒険など、どのような目的でも、信頼できる不動産レンタルサービスで、お客様の旅をスムーズにスタートできるようお手伝いいたします。私たちの使命は、卓越したカスタマーサービスを提供し、快適で安心できる体験をお届けすることです。競争力のある料金、きちんと管理された豊富な物件、そしてお客様をサポートする専任チームで、旅の頼れるパートナーを目指しております。不動産レンタルのご用命は ${env.WEBSITE_NAME} で、ご自身のペースで自由に探索する喜びをぜひご体験ください。`,
    TITLE2: `${env.WEBSITE_NAME} が選ばれる理由`,
    SUBTITLE2: 'あらゆる旅で、最高の体験を',
    CONTENT2: '当社の一流の不動産レンタルサービスで、比類ない利便性、信頼性、お得な価値をお楽しみください。かんたんな予約から高品質な物件まで、信頼できる旅のパートナーです。',
    FIND_DEAL: 'お得な物件を探す',
  },
})

langHelper.setLanguage(strings)
export { strings }
