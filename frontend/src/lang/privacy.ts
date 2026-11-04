import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    TITLE: 'Politique de Confidentialité',
    PRIVACY_POLICY: `
Votre vie privée est importante pour nous chez ${env.WEBSITE_NAME}. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site Web et nos services. En accédant à nos services, vous consentez aux pratiques décrites dans cette politique.

1. Informations que nous collectons

Nous collectons des informations auprès de vous lorsque vous vous inscrivez sur notre site, passez une commande ou interagissez avec nos services. Les informations que nous pouvons collecter comprennent :

Nom
Adresse e-mail
Numéro de téléphone
Informations de paiement
Préférences de location
Vous pouvez visiter notre site de manière anonyme, mais certaines fonctionnalités peuvent être limitées.

2. Comment nous utilisons vos informations

Vos informations peuvent être utilisées des manières suivantes :

Pour traiter vos réservations et paiements
Pour améliorer le service client
Pour envoyer des e-mails périodiques concernant votre commande ou d'autres produits et services
Pour répondre aux demandes de renseignements et d'assistance

3. Comment nous protégeons vos informations

Nous mettons en œuvre diverses mesures de sécurité pour maintenir la sécurité de vos informations personnelles. Toutes les informations sensibles sont transmises via des serveurs sécurisés et ne sont accessibles qu'au personnel autorisé. Nous ne stockons pas vos informations de carte de crédit sur nos serveurs.

4. Partage de vos informations

Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles identifiables à des tiers, sauf à des partenaires de confiance qui nous aident à exploiter notre site Web, à mener nos activités ou à vous fournir des services, tant que ces parties acceptent de garder ces informations confidentielles. Nous pouvons également divulguer vos informations lorsque nous pensons que cette divulgation est appropriée pour se conformer à la loi, appliquer les politiques de notre site ou protéger nos droits ou ceux d'autrui, notre propriété ou notre sécurité.

5. Confidentialité des enfants

Nous respectons la loi sur la protection de la vie privée des enfants en ligne (Children's Online Privacy Protection Act, COPPA). Nos services ne sont pas destinés aux enfants de moins de 13 ans et nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans. Si nous apprenons que nous avons collecté des informations personnelles auprès d'un enfant de moins de 13 ans, nous prendrons des mesures pour supprimer ces informations.

6. Modifications de notre politique de confidentialité

Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page. Il vous est conseillé de consulter régulièrement cette politique de confidentialité pour prendre connaissance de tout changement.

7. Vos droits

Vous avez le droit de demander l'accès aux informations personnelles que nous détenons à votre sujet, de demander la correction de toute inexactitude et de demander la suppression de vos informations personnelles, sous réserve de certaines exceptions. Pour exercer ces droits, veuillez nous contacter en utilisant les informations fournies ci-dessous.

8. Contactez-nous

Si vous avez des questions sur cette politique de confidentialité ou sur nos pratiques en matière de données, veuillez nous contacter à l'adresse ${env.CONTACT_EMAIL}. Nous nous engageons à répondre à vos préoccupations et à protéger votre vie privée.

9. Reconnaissance

En utilisant nos services, vous reconnaissez avoir lu et compris cette politique de confidentialité et acceptez ses conditions.    
    `,
  },
  en: {
    TITLE: 'Privacy Policy',
    PRIVACY_POLICY: `
Your privacy is important to us at ${env.WEBSITE_NAME}. This Privacy Policy outlines how we collect, use, and protect your information when you use our website and services. By accessing our services, you consent to the practices described in this policy.


1. Information We Collect

We collect information from you when you register on our site, place an order, or interact with our services. The information we may collect includes:

Name
Email address
Phone number
Payment information
Rental preferences
You may visit our site anonymously, but certain functionalities may be limited.


2. How We Use Your Information

Your information may be used in the following ways:

To process your reservations and payments
To improve customer service
To send periodic emails regarding your order or other products and services
To respond to inquiries and support requests


3. How We Protect Your Information

We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is transmitted via secure servers and is only accessible by authorized personnel. We do not store your credit card information on our servers.


4. Sharing Your Information

We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except to trusted partners who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our rights or others' rights, property, or safety.


5. Children's Privacy

We comply with the Children's Online Privacy Protection Act (COPPA). Our services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.


6. Changes to Our Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.


7. Your Rights

You have the right to request access to the personal information we hold about you, to request correction of any inaccuracies, and to request deletion of your personal information, subject to certain exceptions. To exercise these rights, please contact us using the information provided below.


8. Contact Us

If you have any questions about this Privacy Policy or our data practices, please contact us at ${env.CONTACT_EMAIL}. We are committed to addressing your concerns and protecting your privacy.


9. Acknowledgment

By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
    `,
  },
  de: {
    TITLE: 'Datenschutzerklärung',
    PRIVACY_POLICY: `
Ihre Privatsphäre ist uns bei ${env.WEBSITE_NAME} wichtig. Diese Datenschutzerklärung beschreibt, wie wir Ihre Daten erheben, verwenden und schützen, wenn Sie unsere Website und unsere Dienste nutzen. Durch den Zugriff auf unsere Dienste willigen Sie in die in dieser Erklärung beschriebenen Verfahren ein.


1. Daten, die wir erheben

Wir erheben Daten von Ihnen, wenn Sie sich auf unserer Website registrieren, eine Bestellung aufgeben oder mit unseren Diensten interagieren. Zu den Daten, die wir erheben können, gehören:

Name
E-Mail-Adresse
Telefonnummer
Zahlungsinformationen
Mietpräferenzen
Sie können unsere Website anonym besuchen, allerdings können bestimmte Funktionen eingeschränkt sein.


2. Wie wir Ihre Daten verwenden

Ihre Daten können auf folgende Weise verwendet werden:

Zur Bearbeitung Ihrer Reservierungen und Zahlungen
Zur Verbesserung des Kundenservice
Zum Versand regelmäßiger E-Mails zu Ihrer Bestellung oder zu anderen Produkten und Dienstleistungen
Zur Beantwortung von Anfragen und Supportanfragen


3. Wie wir Ihre Daten schützen

Wir setzen verschiedene Sicherheitsmaßnahmen ein, um die Sicherheit Ihrer personenbezogenen Daten zu gewährleisten. Alle sensiblen Daten werden über sichere Server übertragen und sind nur für autorisiertes Personal zugänglich. Wir speichern Ihre Kreditkartendaten nicht auf unseren Servern.


4. Weitergabe Ihrer Daten

Wir verkaufen, tauschen oder übermitteln Ihre personenbezogenen Daten nicht an externe Dritte, es sei denn an vertrauenswürdige Partner, die uns beim Betrieb unserer Website, bei der Durchführung unseres Geschäfts oder bei der Erbringung von Leistungen für Sie unterstützen, sofern diese Partner zusichern, diese Daten vertraulich zu behandeln. Wir können Ihre Daten außerdem offenlegen, wenn wir die Offenlegung für angemessen halten, um geltendes Recht einzuhalten, unsere Websiterichtlinien durchzusetzen oder unsere Rechte, unser Eigentum und unsere Sicherheit oder die Rechte, das Eigentum und die Sicherheit anderer zu schützen.


5. Datenschutz bei Kindern

Wir halten den Children's Online Privacy Protection Act (COPPA) ein. Unsere Dienste richten sich nicht an Kinder unter 13 Jahren, und wir erheben nicht wissentlich personenbezogene Daten von Kindern unter 13 Jahren. Sollten wir feststellen, dass wir personenbezogene Daten eines Kindes unter 13 Jahren erhoben haben, werden wir Maßnahmen ergreifen, um diese Daten zu löschen.


6. Änderungen unserer Datenschutzerklärung

Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir informieren Sie über Änderungen, indem wir die neue Datenschutzerklärung auf dieser Seite veröffentlichen. Wir empfehlen Ihnen, diese Datenschutzerklärung regelmäßig auf Änderungen zu überprüfen.


7. Ihre Rechte

Sie haben das Recht, Auskunft über die personenbezogenen Daten zu verlangen, die wir über Sie gespeichert haben, die Berichtigung unrichtiger Angaben zu verlangen und vorbehaltlich bestimmter Ausnahmen die Löschung Ihrer personenbezogenen Daten zu verlangen. Um diese Rechte auszuüben, kontaktieren Sie uns bitte über die unten angegebenen Kontaktdaten.


8. Kontakt

Wenn Sie Fragen zu dieser Datenschutzerklärung oder zu unseren Datenverarbeitungspraktiken haben, kontaktieren Sie uns bitte unter ${env.CONTACT_EMAIL}. Wir sind bestrebt, auf Ihre Anliegen einzugehen und Ihre Privatsphäre zu schützen.


9. Anerkennung

Durch die Nutzung unserer Dienste bestätigen Sie, dass Sie diese Datenschutzerklärung gelesen und verstanden haben, und erklären sich mit ihren Bedingungen einverstanden.
    `,
  },
  es: {
    TITLE: 'Política de privacidad',
    PRIVACY_POLICY: `
Su privacidad es importante para nosotros en ${env.WEBSITE_NAME}. Esta Política de privacidad describe cómo recopilamos, utilizamos y protegemos su información cuando utiliza nuestro sitio web y nuestros servicios. Al acceder a nuestros servicios, usted consiente las prácticas descritas en esta política.


1. Información que recopilamos

Recopilamos información suya cuando se registra en nuestro sitio, realiza un pedido o interactúa con nuestros servicios. La información que podemos recopilar incluye:

Nombre
Dirección de correo electrónico
Número de teléfono
Información de pago
Preferencias de alquiler
Puede visitar nuestro sitio de forma anónima, pero algunas funcionalidades pueden estar limitadas.


2. Cómo utilizamos su información

Su información puede utilizarse de las siguientes maneras:

Para procesar sus reservas y pagos
Para mejorar el servicio de atención al cliente
Para enviar correos electrónicos periódicos sobre su pedido u otros productos y servicios
Para responder a consultas y solicitudes de asistencia


3. Cómo protegemos su información

Aplicamos diversas medidas de seguridad para mantener la seguridad de su información personal. Toda la información sensible se transmite a través de servidores seguros y solo es accesible para el personal autorizado. No almacenamos los datos de su tarjeta de crédito en nuestros servidores.


4. Cómo compartimos su información

No vendemos, intercambiamos ni transferimos de ningún otro modo su información de identificación personal a terceros, salvo a socios de confianza que nos ayudan a operar nuestro sitio web, a llevar a cabo nuestra actividad o a prestarle servicios, siempre que dichos socios se comprometan a mantener la confidencialidad de esta información. También podemos divulgar su información cuando consideremos que su divulgación es adecuada para cumplir con la ley, hacer cumplir las políticas de nuestro sitio o proteger nuestros derechos, o los derechos, la propiedad o la seguridad de terceros.


5. Privacidad de los menores

Cumplimos con la Ley de Protección de la Privacidad en Línea de los Niños (Children's Online Privacy Protection Act, COPPA). Nuestros servicios no están dirigidos a menores de 13 años y no recopilamos a sabiendas información personal de menores de 13 años. Si tenemos conocimiento de que hemos recopilado información personal de un menor de 13 años, tomaremos medidas para eliminar dicha información.


6. Cambios en nuestra Política de privacidad

Podemos actualizar esta Política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de privacidad en esta página. Le recomendamos revisar esta Política de privacidad periódicamente para conocer cualquier cambio.


7. Sus derechos

Usted tiene derecho a solicitar el acceso a la información personal que conservamos sobre usted, a solicitar la rectificación de cualquier inexactitud y a solicitar la supresión de su información personal, sujeto a ciertas excepciones. Para ejercer estos derechos, póngase en contacto con nosotros utilizando los datos que se indican a continuación.


8. Contacto

Si tiene alguna pregunta sobre esta Política de privacidad o sobre nuestras prácticas de tratamiento de datos, póngase en contacto con nosotros en ${env.CONTACT_EMAIL}. Nos comprometemos a atender sus inquietudes y a proteger su privacidad.


9. Reconocimiento

Al utilizar nuestros servicios, usted reconoce que ha leído y entendido esta Política de privacidad y acepta sus términos.
    `,
  },
  pt: {
    TITLE: 'Política de Privacidade',
    PRIVACY_POLICY: `
A sua privacidade é importante para nós em ${env.WEBSITE_NAME}. A presente Política de Privacidade descreve a forma como recolhemos, utilizamos e protegemos as suas informações quando utiliza o nosso website e os nossos serviços. Ao aceder aos nossos serviços, o utilizador consente as práticas descritas nesta política.


1. Informações que Recolhemos

Recolhemos informações junto do utilizador quando se regista no nosso site, efetua uma encomenda ou interage com os nossos serviços. As informações que podemos recolher incluem:

Nome
Endereço de e-mail
Número de telefone
Informações de pagamento
Preferências de aluguer
O utilizador pode visitar o nosso site de forma anónima, mas determinadas funcionalidades poderão ficar limitadas.


2. Como Utilizamos as Suas Informações

As suas informações podem ser utilizadas das seguintes formas:

Para processar as suas reservas e pagamentos
Para melhorar o apoio ao cliente
Para enviar e-mails periódicos relativos à sua encomenda ou a outros produtos e serviços
Para responder a pedidos de informação e de assistência


3. Como Protegemos as Suas Informações

Implementamos diversas medidas de segurança para preservar a segurança das suas informações pessoais. Todas as informações sensíveis são transmitidas através de servidores seguros e só podem ser acedidas por pessoal autorizado. Não armazenamos os dados do seu cartão de crédito nos nossos servidores.


4. Partilha das Suas Informações

Não vendemos, trocamos nem transferimos de qualquer outra forma as suas informações de identificação pessoal para terceiros, exceto para parceiros de confiança que nos auxiliam na exploração do nosso website, na condução da nossa atividade ou na prestação de serviços ao utilizador, desde que esses terceiros se comprometam a manter essas informações confidenciais. Podemos igualmente divulgar as suas informações quando considerarmos que essa divulgação é adequada para cumprir a lei, fazer cumprir as políticas do nosso site ou proteger os nossos direitos, ou os direitos, a propriedade ou a segurança de terceiros.


5. Privacidade das Crianças

Cumprimos a Lei de Proteção da Privacidade das Crianças na Internet (Children's Online Privacy Protection Act, COPPA). Os nossos serviços não se destinam a crianças com menos de 13 anos e não recolhemos intencionalmente informações pessoais de crianças com menos de 13 anos. Se tomarmos conhecimento de que recolhemos informações pessoais de uma criança com menos de 13 anos, tomaremos medidas para eliminar essas informações.


6. Alterações à Nossa Política de Privacidade

Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos o utilizador de quaisquer alterações através da publicação da nova Política de Privacidade nesta página. Recomendamos que consulte periodicamente esta Política de Privacidade para tomar conhecimento de eventuais alterações.


7. Os Seus Direitos

O utilizador tem o direito de solicitar o acesso às informações pessoais que detemos a seu respeito, de solicitar a retificação de quaisquer inexatidões e de solicitar o apagamento das suas informações pessoais, sob reserva de determinadas exceções. Para exercer estes direitos, queira contactar-nos através das informações indicadas abaixo.


8. Contacte-nos

Caso tenha alguma questão sobre esta Política de Privacidade ou sobre as nossas práticas em matéria de dados, queira contactar-nos através do endereço ${env.CONTACT_EMAIL}. Estamos empenhados em dar resposta às suas preocupações e em proteger a sua privacidade.


9. Reconhecimento

Ao utilizar os nossos serviços, o utilizador reconhece que leu e compreendeu esta Política de Privacidade e concorda com os seus termos.
    `,
  },
  it: {
    TITLE: 'Informativa sulla privacy',
    PRIVACY_POLICY: `
La privacy dell'utente è importante per noi di ${env.WEBSITE_NAME}. La presente Informativa sulla privacy descrive le modalità con cui raccogliamo, utilizziamo e proteggiamo le informazioni dell'utente quando utilizza il nostro sito web e i nostri servizi. Accedendo ai nostri servizi, l'utente acconsente alle pratiche descritte nella presente informativa.


1. Informazioni che raccogliamo

Raccogliamo informazioni dall'utente quando si registra sul nostro sito, effettua un ordine o interagisce con i nostri servizi. Le informazioni che possiamo raccogliere comprendono:

Nome
Indirizzo e-mail
Numero di telefono
Informazioni di pagamento
Preferenze di locazione
È possibile visitare il nostro sito in forma anonima, ma alcune funzionalità potrebbero risultare limitate.


2. Come utilizziamo le informazioni

Le informazioni dell'utente possono essere utilizzate per i seguenti scopi:

Elaborare le prenotazioni e i pagamenti
Migliorare il servizio clienti
Inviare e-mail periodiche relative all'ordine o ad altri prodotti e servizi
Rispondere a richieste di informazioni e di assistenza


3. Come proteggiamo le informazioni

Adottiamo diverse misure di sicurezza per garantire la protezione dei dati personali dell'utente. Tutte le informazioni sensibili sono trasmesse tramite server sicuri e sono accessibili esclusivamente al personale autorizzato. Non conserviamo sui nostri server i dati della carta di credito dell'utente.


4. Condivisione delle informazioni

Non vendiamo, scambiamo né trasferiamo in altro modo a terzi le informazioni di identificazione personale dell'utente, ad eccezione dei partner di fiducia che ci assistono nella gestione del nostro sito web, nello svolgimento della nostra attività o nell'erogazione dei servizi all'utente, a condizione che tali soggetti si impegnino a mantenere riservate tali informazioni. Potremo inoltre divulgare le informazioni dell'utente qualora riteniamo che la divulgazione sia opportuna per conformarci alla legge, far rispettare le politiche del nostro sito o tutelare i nostri diritti o i diritti, la proprietà o la sicurezza di altri.


5. Privacy dei minori

Rispettiamo il Children's Online Privacy Protection Act (COPPA). I nostri servizi non sono rivolti a minori di 13 anni e non raccogliamo consapevolmente dati personali di minori di 13 anni. Qualora venissimo a conoscenza di aver raccolto dati personali di un minore di 13 anni, adotteremo le misure necessarie per eliminarli.


6. Modifiche alla nostra Informativa sulla privacy

Possiamo aggiornare la presente Informativa sulla privacy di volta in volta. Comunicheremo all'utente eventuali modifiche pubblicando la nuova Informativa sulla privacy in questa pagina. Si consiglia di consultare periodicamente la presente Informativa sulla privacy per verificare eventuali modifiche.


7. Diritti dell'utente

L'utente ha il diritto di richiedere l'accesso ai dati personali che lo riguardano, di richiederne la rettifica in caso di inesattezze e di richiederne la cancellazione, fatte salve alcune eccezioni. Per esercitare tali diritti, la preghiamo di contattarci utilizzando i recapiti indicati di seguito.


8. Contattaci

Per qualsiasi domanda relativa alla presente Informativa sulla privacy o alle nostre pratiche in materia di dati, la preghiamo di contattarci all'indirizzo ${env.CONTACT_EMAIL}. Ci impegniamo a rispondere alle preoccupazioni dell'utente e a tutelarne la privacy.


9. Presa d'atto

Utilizzando i nostri servizi, l'utente dichiara di aver letto e compreso la presente Informativa sulla privacy e ne accetta i termini.
    `,
  },
  zh: {
    TITLE: '隐私政策',
    PRIVACY_POLICY: `
在 ${env.WEBSITE_NAME}，我们高度重视您的隐私。本隐私政策阐明了您在使用我们的网站和服务时，我们如何收集、使用和保护您的信息。访问我们的服务，即表示您同意本政策所述的各项做法。


1. 我们收集的信息

当您在我们的网站上注册、下订单或与我们的服务互动时，我们会收集您的信息。我们可能收集的信息包括：

姓名
电子邮件地址
电话号码
支付信息
租赁偏好
您可以匿名访问我们的网站，但某些功能可能会受到限制。


2. 我们如何使用您的信息

您的信息可能用于以下方面：

处理您的预订和付款
改进客户服务
就您的订单或其他产品和服务定期向您发送电子邮件
回复咨询和支持请求


3. 我们如何保护您的信息

我们采取多种安全措施来维护您个人信息的安全。所有敏感信息均通过安全服务器传输，并且仅限获得授权的人员访问。我们不会在我们的服务器上存储您的信用卡信息。


4. 信息的共享

我们不会出售、交易或以其他方式将您的个人身份信息转让给外部各方，但协助我们运营网站、开展业务或为您提供服务的可信赖合作伙伴除外，前提是这些合作伙伴同意对这些信息保密。当我们认为披露信息对于遵守法律、执行我们的网站政策或保护我们或他人的权利、财产或安全是适当的时，我们也可能披露您的信息。


5. 儿童隐私

我们遵守《儿童在线隐私保护法》（COPPA）。我们的服务不面向 13 岁以下的儿童，我们也不会故意收集 13 岁以下儿童的个人信息。如果我们发现自己收集了 13 岁以下儿童的个人信息，我们将采取措施删除此类信息。


6. 本隐私政策的变更

我们可能会不时更新本隐私政策。我们将通过在本页面发布新的隐私政策来通知您任何变更。建议您定期查阅本隐私政策，以了解任何变更。


7. 您的权利

您有权要求访问我们所持有的关于您的个人信息，有权要求更正任何不准确之处，并有权要求删除您的个人信息，但某些例外情况除外。如需行使这些权利，请通过下方提供的联系方式与我们联系。


8. 联系我们

如果您对本隐私政策或我们的数据处理做法有任何疑问，请通过 ${env.CONTACT_EMAIL} 与我们联系。我们致力于解决您的关切并保护您的隐私。


9. 确认

使用我们的服务，即表示您确认已阅读并理解本隐私政策，并同意其条款。
    `,
  },
  ja: {
    TITLE: 'プライバシーポリシー',
    PRIVACY_POLICY: `
${env.WEBSITE_NAME} は、お客様のプライバシーを重視しております。本プライバシーポリシーは、お客様が当社のウェブサイトおよびサービスをご利用になる際に、当社がお客様の情報をどのように収集、利用、保護するかを定めるものです。当社のサービスにアクセスすることにより、お客様は本ポリシーに記載された取扱いに同意したものとみなされます。


1. 当社が収集する情報

当社は、お客様が当社サイトに登録したとき、注文を行ったとき、または当社のサービスを利用されたときに、お客様の情報を収集します。当社が収集する情報には、以下が含まれます。

氏名
メールアドレス
電話番号
支払い情報
レンタルに関するご希望
当社サイトには匿名で訪問することも可能ですが、一部の機能が制限される場合があります。


2. 情報の利用方法

お客様の情報は、以下の目的で利用されることがあります。

予約および支払いの処理
カスタマーサービスの向上
ご注文またはその他の商品・サービスに関する定期的なメールの送信
お問い合わせおよびサポート依頼への対応


3. 情報の保護方法

当社は、お客様の個人情報の安全を維持するため、さまざまなセキュリティ対策を講じています。すべての機密情報は安全なサーバーを通じて送信され、権限を有する担当者のみがアクセスできます。当社は、お客様のクレジットカード情報を当社のサーバーに保存しません。


4. 情報の共有

当社は、お客様の個人を特定できる情報を、外部の第三者に販売、取引、またはその他の方法で提供することはありません。ただし、当社のウェブサイトの運営、事業の遂行、またはお客様へのサービス提供を支援する信頼できるパートナーに対しては、当該パートナーがこの情報を秘密として保持することに同意している場合に限り、提供することがあります。また、法令を遵守するため、当社サイトのポリシーを執行するため、または当社もしくは他者の権利、財産、安全を保護するために開示が適切であると当社が判断した場合にも、お客様の情報を開示することがあります。


5. 児童のプライバシー

当社は、児童オンラインプライバシー保護法（COPPA）を遵守しています。当社のサービスは13歳未満の児童を対象としておらず、13歳未満の児童から個人情報を故意に収集することはありません。13歳未満の児童の個人情報を収集したことが判明した場合は、当該情報を削除するための措置を講じます。


6. プライバシーポリシーの変更

当社は、本プライバシーポリシーを随時更新することがあります。変更がある場合は、本ページに新しいプライバシーポリシーを掲載することによりお知らせします。変更内容については、本プライバシーポリシーを定期的にご確認いただくことをお勧めします。


7. お客様の権利

お客様は、当社が保有するお客様の個人情報へのアクセスを請求する権利、誤りの訂正を請求する権利、および一定の例外を除き個人情報の削除を請求する権利を有します。これらの権利を行使される場合は、下記の連絡先までご連絡ください。


8. お問い合わせ

本プライバシーポリシーまたは当社のデータの取扱いに関してご質問がある場合は、${env.CONTACT_EMAIL} までご連絡ください。当社は、お客様のご懸念に対応し、プライバシーを保護することをお約束します。


9. 確認事項

当社のサービスをご利用になることにより、お客様は、本プライバシーポリシーを読み、理解したことを確認し、その条件に同意したものとみなされます。
    `,
  },
})

langHelper.setLanguage(strings)
export { strings }
