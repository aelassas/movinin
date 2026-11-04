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
  it: {
    TITLE: 'Termini di servizio',
    TOS: `
Benvenuti su ${env.WEBSITE_NAME}! Accedendo al nostro sito web e utilizzando i nostri servizi, l'utente accetta di rispettare e di essere vincolato dai seguenti Termini di servizio. Qualora non accetti tali termini, la preghiamo di non utilizzare i nostri servizi.


1. Accettazione dei termini

Accedendo ai nostri servizi o utilizzandoli, l'utente conferma di aver letto, compreso e accettato i presenti Termini di servizio e la nostra Informativa sulla privacy.


2. Utilizzo dei nostri servizi

L'utente si impegna a utilizzare i nostri servizi esclusivamente per finalità lecite e in modo da non violare i diritti di terzi né limitare o impedire ad altri l'utilizzo dei nostri servizi. Ciò include il rispetto di tutte le leggi e i regolamenti applicabili.


3. Prenotazioni e pagamenti

Quando effettua una prenotazione con ${env.WEBSITE_NAME}, l'utente si impegna a fornire informazioni accurate e complete. Tutti i pagamenti devono essere effettuati tramite il nostro sistema di pagamento sicuro. Una volta completato il pagamento, l'utente riceverà una conferma della prenotazione.


4. Politica di cancellazione

Le cancellazioni effettuate almeno 24 ore prima della data di locazione possono dare diritto al rimborso integrale. Le cancellazioni effettuate meno di 24 ore prima della data di locazione possono comportare l'addebito di una penale di cancellazione. Si prega di consultare la nostra politica di cancellazione per informazioni dettagliate.


5. Condizioni di locazione

Tutte le locazioni sono soggette alle nostre condizioni di locazione, che comprendono, a titolo esemplificativo e non esaustivo, limiti di età e obblighi assicurativi. L'utente è responsabile di verificare di soddisfare tutti i requisiti prima di effettuare una prenotazione.


6. Limitazione di responsabilità

${env.WEBSITE_NAME} non sarà responsabile per alcun danno indiretto, incidentale o consequenziale derivante dall'utilizzo dei nostri servizi. In nessun caso la nostra responsabilità complessiva potrà superare l'importo pagato dall'utente per i servizi.


7. Modifiche ai termini

Ci riserviamo il diritto di modificare i presenti Termini di servizio in qualsiasi momento. Qualsiasi modifica avrà efficacia immediata dal momento della pubblicazione sul nostro sito web. L'utilizzo continuato dei nostri servizi dopo qualsiasi modifica costituisce accettazione dei nuovi termini.


8. Legge applicabile

I presenti Termini di servizio sono disciplinati e interpretati in conformità alle leggi. Qualsiasi controversia derivante dai presenti termini sarà risolta dinanzi ai tribunali.


9. Informazioni di contatto

Per qualsiasi domanda relativa ai presenti Termini di servizio, la preghiamo di contattarci all'indirizzo ${env.CONTACT_EMAIL}. Siamo a sua disposizione per qualsiasi richiesta relativa ai nostri servizi.


10. Presa d'atto

Utilizzando i nostri servizi, l'utente dichiara di aver letto e compreso i presenti Termini di servizio e accetta di esserne vincolato.
    `,
  },
  zh: {
    TITLE: '服务条款',
    TOS: `
欢迎使用 ${env.WEBSITE_NAME}！访问我们的网站并使用我们的服务，即表示您同意遵守并受以下服务条款的约束。如果您不同意这些条款，请勿使用我们的服务。


1. 条款的接受

访问或使用我们的服务，即表示您确认已阅读、理解并同意本服务条款及我们的隐私政策。


2. 服务的使用

您同意仅出于合法目的并以不侵犯他人权利、不限制或妨碍他人使用我们服务的方式使用我们的服务。这包括遵守所有适用的法律法规。


3. 预订与付款

当您通过 ${env.WEBSITE_NAME} 进行预订时，您同意提供准确、完整的信息。所有款项均须通过我们的安全支付系统支付。付款完成后，您将收到预订确认。


4. 取消政策

在租赁日期前 24 小时取消的，可能有资格获得全额退款。在租赁日期前不足 24 小时取消的，可能需要支付取消费用。详细信息请参阅我们的取消政策。


5. 租赁条件

所有租赁均须遵守我们的租赁条件，包括但不限于年龄限制和保险义务。您有责任在进行预订之前确保自己满足所有要求。


6. 责任限制

对于因您使用我们的服务而产生的任何间接、附带或后果性损害，${env.WEBSITE_NAME} 不承担责任。在任何情况下，我们的责任总额均不得超过您为服务所支付的金额。


7. 条款的修改

我们保留随时修改本服务条款的权利。任何修改自发布于我们网站之时起立即生效。在任何修改之后您继续使用我们的服务，即视为您接受新条款。


8. 适用法律

本服务条款受法律管辖，并依照法律进行解释。因本条款引起的任何争议均应提交法院解决。


9. 联系方式

如果您对本服务条款有任何疑问，请通过 ${env.CONTACT_EMAIL} 与我们联系。对于与我们的服务相关的任何咨询，我们都乐意为您提供帮助。


10. 确认

使用我们的服务，即表示您确认已阅读并理解本服务条款，并同意受其约束。
    `,
  },
  ja: {
    TITLE: '利用規約',
    TOS: `
${env.WEBSITE_NAME} へようこそ。当社ウェブサイトにアクセスし、当社のサービスをご利用になることにより、お客様は以下の利用規約を遵守し、これに拘束されることに同意したものとみなされます。これらの規約に同意されない場合は、当社のサービスをご利用にならないでください。


1. 規約の承諾

当社のサービスにアクセスし、またはこれをご利用になることにより、お客様は、本利用規約および当社のプライバシーポリシーを読み、理解し、これに同意したことを確認したものとみなされます。


2. サービスの利用

お客様は、当社のサービスを適法な目的のためにのみ、かつ、他者の権利を侵害せず、他者による当社のサービスの利用を制限または妨げない方法で利用することに同意するものとします。これには、適用されるすべての法令の遵守が含まれます。


3. 予約および支払い

${env.WEBSITE_NAME} で予約を行う場合、お客様は、正確かつ完全な情報を提供することに同意するものとします。すべての支払いは、当社の安全な決済システムを通じて行っていただく必要があります。お支払いが完了すると、予約の確認通知をお受け取りいただけます。


4. キャンセルポリシー

レンタル日の24時間前までにキャンセルされた場合は、全額返金の対象となることがあります。レンタル日の24時間前を過ぎてからキャンセルされた場合は、キャンセル料が発生することがあります。詳細につきましては、当社のキャンセルポリシーをご参照ください。


5. レンタル条件

すべてのレンタルは、年齢制限および保険に関する義務を含むがこれらに限定されない、当社のレンタル条件の適用を受けます。お客様は、予約を行う前に、すべての要件を満たしていることを確認する責任を負います。


6. 責任の制限

${env.WEBSITE_NAME} は、お客様による当社のサービスの利用に起因または関連して生じる間接的、付随的または結果的損害について、一切責任を負いません。いかなる場合においても、当社の責任の総額は、お客様がサービスに対して支払った金額を超えないものとします。


7. 規約の変更

当社は、本利用規約をいつでも変更する権利を留保します。変更は、当社ウェブサイトに掲載された時点で直ちに効力を生じます。変更後も引き続き当社のサービスをご利用になる場合、お客様は変更後の規約に同意したものとみなされます。


8. 準拠法

本利用規約は、法律に準拠し、法律に従って解釈されるものとします。本規約に起因または関連して生じる紛争は、裁判所において解決されるものとします。


9. お問い合わせ先

本利用規約に関してご質問がある場合は、${env.CONTACT_EMAIL} までご連絡ください。当社のサービスに関するお問い合わせには、誠意をもって対応いたします。


10. 確認事項

当社のサービスをご利用になることにより、お客様は、本利用規約を読み、理解したことを確認し、これに拘束されることに同意したものとみなされます。
    `,
  },
})

langHelper.setLanguage(strings)
export { strings }
