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
    TITLE1: `${env.WEBSITE_NAME} - Ihr erstklassiger Immobilien-Vermietungsservice`,
    SUBTITLE1: 'Ihr vertrauenswürdiger Partner für Immobilienvermietung',
    CONTENT1: `Bei ${env.WEBSITE_NAME} wissen wir, dass jede Reise einzigartig ist. Wir haben uns verpflichtet, unseren Kunden eine vielfältige Auswahl an Immobilien anzubieten, die jedem Reisebedürfnis gerecht wird. Ob Sie eine Stadt erkunden, geschäftlich pendeln oder Abenteuer suchen – unsere zuverlässigen Immobilien-Vermietungsservices sorgen dafür, dass Ihr Abenteuer reibungslos beginnt. Unsere Mission ist es, einen außergewöhnlichen Kundenservice zu bieten, damit Ihre Erfahrung angenehm und stressfrei verläuft. Mit wettbewerbsfähigen Preisen, einer Vielzahl gepflegter Immobilien und einem engagierten Team, das Ihnen jederzeit zur Seite steht, möchten wir Ihr vertrauenswürdiger Partner unterwegs sein. Entscheiden Sie sich für ${env.WEBSITE_NAME} für alle Ihre Immobilienvermietungen und erleben Sie die Freiheit, in Ihrem eigenen Tempo zu entdecken.`,
    TITLE2: `Warum ${env.WEBSITE_NAME} wählen`,
    SUBTITLE2: 'Erleben Sie Exzellenz auf jeder Reise',
    CONTENT2: 'Genießen Sie unübertroffenen Komfort, Zuverlässigkeit und Wert mit unserem erstklassigen Immobilien-Vermietungsservice. Von mühelosen Buchungen bis hin zu hochwertigen Immobilien – wir sind Ihr vertrauenswürdiger Reisepartner.',
    FIND_DEAL: 'Angebot finden',
  },
  es: {
    TITLE1: `${env.WEBSITE_NAME} - Tu servicio de alquiler de propiedades de referencia`,
    SUBTITLE1: 'Tu socio de confianza para el alquiler de propiedades',
    CONTENT1: `En ${env.WEBSITE_NAME} sabemos que cada viaje es único. Nos comprometemos a ofrecer a nuestros clientes una amplia selección de propiedades que se adaptan a todas las necesidades de viaje. Ya sea que estés explorando una ciudad, viajando por negocios o buscando aventura, nuestros fiables servicios de alquiler de propiedades garantizan que tu aventura comience sin contratiempos. Nuestra misión es ofrecer una atención al cliente excepcional, para que tu experiencia sea agradable y sin preocupaciones. Con precios competitivos, una variedad de propiedades bien cuidadas y un equipo dedicado listo para ayudarte, nos esforzamos por ser tu socio de confianza en el camino. Elige ${env.WEBSITE_NAME} para todas tus necesidades de alquiler de propiedades y disfruta de la libertad de explorar a tu propio ritmo.`,
    TITLE2: `Por qué elegir ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Vive la excelencia en cada viaje',
    CONTENT2: 'Disfruta de una comodidad, fiabilidad y valor incomparables con nuestro servicio de alquiler de propiedades de referencia. Desde reservas sin esfuerzo hasta propiedades de alta calidad, somos tu socio de viaje de confianza.',
    FIND_DEAL: 'Encontrar oferta',
  },
  pt: {
    TITLE1: `${env.WEBSITE_NAME} - O teu serviço de arrendamento de propriedades de referência`,
    SUBTITLE1: 'O teu parceiro de confiança para o arrendamento de propriedades',
    CONTENT1: `Na ${env.WEBSITE_NAME}, sabemos que cada viagem é única. Comprometemo-nos a oferecer aos nossos clientes uma ampla seleção de propriedades que respondem a todas as necessidades de viagem. Quer estejas a explorar uma cidade, a viajar em negócios ou à procura de aventura, os nossos fiáveis serviços de arrendamento de propriedades garantem que a tua aventura começa sem contratempos. A nossa missão é prestar um atendimento ao cliente excecional, para que a tua experiência seja agradável e sem preocupações. Com preços competitivos, uma variedade de propriedades bem conservadas e uma equipa dedicada pronta a ajudar-te, esforçamo-nos por ser o teu parceiro de confiança na estrada. Escolhe a ${env.WEBSITE_NAME} para todas as tuas necessidades de arrendamento de propriedades e desfruta da liberdade de explorar ao teu próprio ritmo.`,
    TITLE2: `Porquê escolher a ${env.WEBSITE_NAME}`,
    SUBTITLE2: 'Vive a excelência em cada viagem',
    CONTENT2: 'Desfruta de uma comodidade, fiabilidade e valor incomparáveis com o nosso serviço de arrendamento de propriedades de referência. Desde reservas sem esforço até propriedades de alta qualidade, somos o teu parceiro de viagem de confiança.',
    FIND_DEAL: 'Encontrar oferta',
  },
  it: {
    TITLE1: `${env.WEBSITE_NAME} - Il tuo servizio di affitto immobili di riferimento`,
    SUBTITLE1: "Il tuo partner di fiducia per l'affitto di immobili",
    CONTENT1: `Da ${env.WEBSITE_NAME} sappiamo che ogni viaggio è unico. Ci impegniamo a offrire ai nostri clienti un'ampia selezione di immobili che soddisfano ogni esigenza di viaggio. Che tu stia visitando una città, ti sposti per lavoro o cerchi un'avventura, i nostri affidabili servizi di affitto immobili garantiscono che la tua avventura inizi senza intoppi. La nostra missione è offrire un servizio clienti eccezionale, per rendere la tua esperienza piacevole e senza stress. Con tariffe competitive, una varietà di immobili ben curati e un team dedicato pronto ad assisterti, ci impegniamo a essere il tuo partner di fiducia lungo la strada. Scegli ${env.WEBSITE_NAME} per tutte le tue esigenze di affitto immobili e scopri la libertà di esplorare al tuo ritmo.`,
    TITLE2: `Perché scegliere ${env.WEBSITE_NAME}`,
    SUBTITLE2: "Vivi l'eccellenza in ogni viaggio",
    CONTENT2: 'Goditi comodità, affidabilità e convenienza senza rivali con il nostro servizio di affitto immobili di riferimento. Dalle prenotazioni senza sforzo agli immobili di alta qualità, siamo il tuo partner di viaggio di fiducia.',
    FIND_DEAL: 'Trova offerta',
  },
  zh: {
    TITLE1: `${env.WEBSITE_NAME} - 您值得信赖的优质房产租赁服务`,
    SUBTITLE1: '您可靠的房产租赁合作伙伴',
    CONTENT1: `在 ${env.WEBSITE_NAME}，我们深知每一次旅程都独一无二。我们致力于为客户提供丰富多样的房产选择，满足各种出行需求。无论你是在探索一座城市、出差办事，还是寻找冒险体验，我们可靠的房产租赁服务都能让你的旅程顺利开启。我们的使命是提供卓越的客户服务，让你的体验愉快又轻松。凭借具有竞争力的价格、种类丰富且维护良好的房产，以及随时为你提供帮助的专业团队，我们努力成为你旅途中值得信赖的伙伴。选择 ${env.WEBSITE_NAME} 满足你所有的房产租赁需求，按自己的节奏自由探索吧。`,
    TITLE2: `为什么选择 ${env.WEBSITE_NAME}`,
    SUBTITLE2: '每一次旅程，都有卓越体验',
    CONTENT2: '我们的优质房产租赁服务为你带来无与伦比的便捷、可靠与超值体验。从轻松预订到高品质房产，我们是你值得信赖的旅行伙伴。',
    FIND_DEAL: '查找优惠',
  },
  ja: {
    TITLE1: `${env.WEBSITE_NAME} - 信頼できる賃貸物件サービス`,
    SUBTITLE1: '物件賃貸の頼れるパートナー',
    CONTENT1: `${env.WEBSITE_NAME} では、旅は一つひとつ異なるものだと考えています。あらゆる旅のニーズに応えられるよう、多彩な物件をお客様にご提供することをお約束します。街を探索する方も、出張で移動する方も、冒険を求める方も、信頼できる賃貸物件サービスで、旅をスムーズにスタートできます。私たちの使命は、卓越したカスタマーサービスで、快適でストレスのない体験をお届けすることです。競争力のある料金、よく手入れされた多彩な物件、そしてサポートに全力を尽くすチームで、旅の頼れるパートナーを目指します。賃貸物件のことなら ${env.WEBSITE_NAME} をお選びいただき、自分のペースで自由に旅を楽しみましょう。`,
    TITLE2: `${env.WEBSITE_NAME} が選ばれる理由`,
    SUBTITLE2: 'すべての旅で、極上の体験を',
    CONTENT2: '上質な賃貸物件サービスで、比類のない利便性、信頼性、お得さをお楽しみください。手間のかからない予約から高品質な物件まで、信頼できる旅のパートナーです。',
    FIND_DEAL: 'お得な物件を探す',
  },
})

langHelper.setLanguage(strings)
export { strings }
