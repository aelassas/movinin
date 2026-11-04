import LocalizedStrings from 'localized-strings'
import * as langHelper from '@/utils/langHelper'
import env from '@/config/env.config'

const strings = new LocalizedStrings({
  fr: {
    TITLE: "Conditions d'utilisation",
    TOS: `
Bienvenue chez ${env.WEBSITE_NAME} ! En accédant à notre site Web et en utilisant nos services, vous acceptez de vous conformer et d'être lié par les conditions d'utilisation suivantes. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.

1. Acceptation des conditions

En accédant ou en utilisant nos services, vous confirmez avoir lu, compris et accepté ces conditions d'utilisation et notre politique de confidentialité.

2. Utilisation de nos services

Vous acceptez d'utiliser nos services uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits, ne restreint ni n'empêche quiconque d'utiliser nos services. Cela inclut le respect de toutes les lois et réglementations applicables.

3. Réservations et paiements

Lorsque vous effectuez une réservation avec ${env.WEBSITE_NAME}, vous acceptez de fournir des informations exactes et complètes. Tous les paiements doivent être effectués via notre système de paiement sécurisé. Une fois le paiement effectué, vous recevrez une confirmation de votre réservation.

4. Politique d'annulation

Les annulations effectuées 24 heures avant la date de location peuvent donner droit à un remboursement complet. Les annulations effectuées moins de 24 heures avant la date de location peuvent entraîner des frais d'annulation. Veuillez vous référer à notre politique d'annulation pour des informations détaillées.

5. Conditions de location

Toutes les locations sont soumises à nos conditions de location, qui incluent, sans s'y limiter, les restrictions d'âge et les obligations d'assurance. Vous êtes responsable de vous assurer que vous remplissez toutes les conditions avant d'effectuer une réservation.

6. Limitation de responsabilité

${env.WEBSITE_NAME} ne sera pas responsable des dommages indirects, accessoires ou consécutifs découlant de votre utilisation de nos services. En aucun cas, notre responsabilité totale ne dépassera le montant que vous avez payé pour les services.

7. Modifications des conditions

Nous nous réservons le droit de modifier ces conditions de service à tout moment. Toute modification entrera en vigueur immédiatement après sa publication sur notre site Web. Votre utilisation continue de nos services après toute modification constitue votre acceptation des nouvelles conditions.

8. Loi applicable

Ces conditions de service seront régies et interprétées conformément aux lois. Tout litige découlant de ces conditions sera résolu devant les tribunaux.

9. Coordonnées

Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse ${env.CONTACT_EMAIL}. Nous sommes là pour vous aider pour toute demande relative à nos services.

10. Reconnaissance

En utilisant nos services, vous reconnaissez avoir lu et compris ces conditions d'utilisation et acceptez d'être lié par elles.    
    `,
  },
  en: {
    TITLE: 'Terms of Service',
    TOS: `
Welcome to ${env.WEBSITE_NAME}! By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please do not use our services.


1. Acceptance of Terms

By accessing or using our services, you confirm that you have read, understood, and agree to these Terms of Service and our Privacy Policy.


2. Use of Our Services

You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of our services. This includes compliance with all applicable laws and regulations.


3. Reservations and Payments

When you make a reservation with ${env.WEBSITE_NAME}, you agree to provide accurate and complete information. All payments must be made through our secure payment system. Once payment is completed, you will receive a confirmation of your reservation.


4. Cancellation Policy

Cancellations made 24 hours before the rental date may be eligible for a full refund. Cancellations made less than 24 hours prior to the rental date may incur a cancellation fee. Please refer to our cancellation policy for detailed information.


5. Rental Conditions

All rentals are subject to our rental conditions, which include but are not limited to age restrictions and insurance obligations. You are responsible for ensuring that you meet all requirements before making a reservation.


6. Limitation of Liability

${env.WEBSITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our services. In no event shall our total liability exceed the amount paid by you for the services.


7. Modifications to Terms

We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services following any changes constitutes your acceptance of the new terms.


8. Governing Law

These Terms of Service shall be governed by and construed in accordance with the laws. Any disputes arising out of these terms shall be resolved in the courts.


9. Contact Information

If you have any questions regarding these Terms of Service, please contact us at ${env.CONTACT_EMAIL}. We are here to help you with any inquiries related to our services.


10. Acknowledgment

By using our services, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
    `,
  },
  de: {
    TITLE: 'Nutzungsbedingungen',
    TOS: `
Willkommen bei ${env.WEBSITE_NAME}! Durch den Zugriff auf unsere Website und die Nutzung unserer Dienste erklären Sie sich damit einverstanden, die folgenden Nutzungsbedingungen einzuhalten und an sie gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.


1. Annahme der Bedingungen

Durch den Zugriff auf unsere Dienste oder deren Nutzung bestätigen Sie, dass Sie diese Nutzungsbedingungen und unsere Datenschutzerklärung gelesen und verstanden haben und ihnen zustimmen.


2. Nutzung unserer Dienste

Sie verpflichten sich, unsere Dienste ausschließlich für rechtmäßige Zwecke und in einer Weise zu nutzen, die die Rechte anderer nicht verletzt und die Nutzung unserer Dienste durch andere weder einschränkt noch beeinträchtigt. Dies schließt die Einhaltung aller geltenden Gesetze und Vorschriften ein.


3. Reservierungen und Zahlungen

Wenn Sie eine Reservierung bei ${env.WEBSITE_NAME} vornehmen, verpflichten Sie sich, genaue und vollständige Angaben zu machen. Alle Zahlungen müssen über unser sicheres Zahlungssystem erfolgen. Sobald die Zahlung abgeschlossen ist, erhalten Sie eine Bestätigung Ihrer Reservierung.


4. Stornierungsbedingungen

Stornierungen, die 24 Stunden vor dem Mietdatum erfolgen, können Anspruch auf eine vollständige Rückerstattung begründen. Bei Stornierungen, die weniger als 24 Stunden vor dem Mietdatum erfolgen, kann eine Stornogebühr anfallen. Ausführliche Informationen finden Sie in unseren Stornierungsbedingungen.


5. Mietbedingungen

Alle Vermietungen unterliegen unseren Mietbedingungen, die unter anderem Altersbeschränkungen und Versicherungspflichten umfassen. Sie sind dafür verantwortlich, sicherzustellen, dass Sie alle Voraussetzungen erfüllen, bevor Sie eine Reservierung vornehmen.


6. Haftungsbeschränkung

${env.WEBSITE_NAME} haftet nicht für mittelbare Schäden, Neben- oder Folgeschäden, die sich aus Ihrer Nutzung unserer Dienste ergeben. In keinem Fall übersteigt unsere Gesamthaftung den Betrag, den Sie für die Dienste bezahlt haben.


7. Änderungen der Bedingungen

Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen werden mit ihrer Veröffentlichung auf unserer Website sofort wirksam. Ihre fortgesetzte Nutzung unserer Dienste nach etwaigen Änderungen gilt als Zustimmung zu den neuen Bedingungen.


8. Anwendbares Recht

Diese Nutzungsbedingungen unterliegen den geltenden Gesetzen und sind in Übereinstimmung mit diesen auszulegen. Streitigkeiten, die sich aus diesen Bedingungen ergeben, werden vor den zuständigen Gerichten beigelegt.


9. Kontaktinformationen

Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren Sie uns bitte unter ${env.CONTACT_EMAIL}. Wir unterstützen Sie gern bei allen Anfragen zu unseren Diensten.


10. Anerkennung

Durch die Nutzung unserer Dienste bestätigen Sie, dass Sie diese Nutzungsbedingungen gelesen und verstanden haben, und erklären sich damit einverstanden, an sie gebunden zu sein.
    `,
  },
  es: {
    TITLE: 'Términos de servicio',
    TOS: `
¡Bienvenido a ${env.WEBSITE_NAME}! Al acceder a nuestro sitio web y utilizar nuestros servicios, usted acepta cumplir los siguientes Términos de servicio y quedar vinculado por ellos. Si no está de acuerdo con estos términos, le rogamos que no utilice nuestros servicios.


1. Aceptación de los términos

Al acceder a nuestros servicios o utilizarlos, usted confirma que ha leído y entendido estos Términos de servicio y nuestra Política de privacidad, y que los acepta.


2. Uso de nuestros servicios

Usted se compromete a utilizar nuestros servicios únicamente con fines lícitos y de manera que no infrinja los derechos de terceros ni restrinja o impida el uso de nuestros servicios por parte de otras personas. Esto incluye el cumplimiento de todas las leyes y reglamentos aplicables.


3. Reservas y pagos

Al realizar una reserva con ${env.WEBSITE_NAME}, usted se compromete a proporcionar información veraz y completa. Todos los pagos deben realizarse a través de nuestro sistema de pago seguro. Una vez completado el pago, recibirá una confirmación de su reserva.


4. Política de cancelación

Las cancelaciones realizadas con 24 horas de antelación a la fecha de alquiler pueden dar derecho a un reembolso total. Las cancelaciones realizadas con menos de 24 horas de antelación a la fecha de alquiler pueden conllevar una penalización por cancelación. Consulte nuestra política de cancelación para obtener información detallada.


5. Condiciones de alquiler

Todos los alquileres están sujetos a nuestras condiciones de alquiler, que incluyen, entre otras, restricciones de edad y obligaciones de seguro. Usted es responsable de asegurarse de cumplir todos los requisitos antes de realizar una reserva.


6. Limitación de responsabilidad

${env.WEBSITE_NAME} no será responsable de ningún daño indirecto, incidental o consecuente derivado del uso de nuestros servicios. En ningún caso nuestra responsabilidad total excederá el importe que usted haya pagado por los servicios.


7. Modificaciones de los términos

Nos reservamos el derecho de modificar estos Términos de servicio en cualquier momento. Cualquier cambio surtirá efecto de inmediato tras su publicación en nuestro sitio web. El uso continuado de nuestros servicios después de cualquier cambio constituye su aceptación de los nuevos términos.


8. Legislación aplicable

Estos Términos de servicio se regirán e interpretarán de conformidad con las leyes aplicables. Cualquier controversia derivada de estos términos se resolverá ante los tribunales competentes.


9. Información de contacto

Si tiene alguna pregunta sobre estos Términos de servicio, póngase en contacto con nosotros en ${env.CONTACT_EMAIL}. Estamos aquí para ayudarle con cualquier consulta relacionada con nuestros servicios.


10. Reconocimiento

Al utilizar nuestros servicios, usted reconoce que ha leído y entendido estos Términos de servicio y acepta quedar vinculado por ellos.
    `,
  },
  pt: {
    TITLE: 'Termos de Serviço',
    TOS: `
Damos-lhe as boas-vindas a ${env.WEBSITE_NAME}! Ao aceder ao nosso website e ao utilizar os nossos serviços, o utilizador concorda em cumprir e em ficar vinculado pelos seguintes Termos de Serviço. Caso não concorde com estes termos, não utilize os nossos serviços.


1. Aceitação dos Termos

Ao aceder ou utilizar os nossos serviços, o utilizador confirma que leu e compreendeu estes Termos de Serviço e a nossa Política de Privacidade, e que concorda com os mesmos.


2. Utilização dos Nossos Serviços

O utilizador compromete-se a utilizar os nossos serviços apenas para fins lícitos e de forma que não infrinja os direitos de terceiros nem restrinja ou impeça a utilização dos nossos serviços por outras pessoas. Tal inclui o cumprimento de todas as leis e regulamentos aplicáveis.


3. Reservas e Pagamentos

Ao efetuar uma reserva junto de ${env.WEBSITE_NAME}, o utilizador compromete-se a fornecer informações exatas e completas. Todos os pagamentos devem ser efetuados através do nosso sistema de pagamento seguro. Depois de concluído o pagamento, o utilizador receberá uma confirmação da sua reserva.


4. Política de Cancelamento

Os cancelamentos efetuados com 24 horas de antecedência relativamente à data de aluguer poderão dar direito a reembolso total. Os cancelamentos efetuados com menos de 24 horas de antecedência relativamente à data de aluguer poderão implicar o pagamento de uma taxa de cancelamento. Consulte a nossa política de cancelamento para obter informações detalhadas.


5. Condições de Aluguer

Todos os alugueres estão sujeitos às nossas condições de aluguer, que incluem, entre outras, restrições de idade e obrigações de seguro. O utilizador é responsável por assegurar que cumpre todos os requisitos antes de efetuar uma reserva.


6. Limitação de Responsabilidade

${env.WEBSITE_NAME} não será responsável por quaisquer danos indiretos, acidentais ou consequenciais decorrentes da utilização dos nossos serviços. Em caso algum a nossa responsabilidade total excederá o montante pago pelo utilizador pelos serviços.


7. Alterações aos Termos

Reservamo-nos o direito de alterar estes Termos de Serviço em qualquer momento. Quaisquer alterações produzirão efeitos imediatamente após a sua publicação no nosso website. A utilização continuada dos nossos serviços após quaisquer alterações constitui a aceitação dos novos termos.


8. Lei Aplicável

Estes Termos de Serviço regem-se e são interpretados de acordo com a lei aplicável. Quaisquer litígios decorrentes destes termos serão resolvidos pelos tribunais competentes.


9. Informações de Contacto

Caso tenha alguma questão relativa a estes Termos de Serviço, queira contactar-nos através do endereço ${env.CONTACT_EMAIL}. Estamos ao seu dispor para esclarecer qualquer dúvida relacionada com os nossos serviços.


10. Reconhecimento

Ao utilizar os nossos serviços, o utilizador reconhece que leu e compreendeu estes Termos de Serviço e concorda em ficar vinculado pelos mesmos.
    `,
  },
})

langHelper.setLanguage(strings)
export { strings }
