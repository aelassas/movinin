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
  },})

langHelper.setLanguage(strings)
export { strings }
