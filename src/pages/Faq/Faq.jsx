import React from 'react'
import './Faq.css'

function Faq() {
    return (
        <div id="faq" className="page-section faq-section">
            <div className="container">
                <h2 className="section-title">Preguntas Frecuentes</h2>

                <details>
                    <summary>¿Que hacen en Gumo Efectos?</summary>
                    <p>En Gumo Efectos diseñamos y fabricamos pedales pensados para músicos que quieren explorar, crear y llevar su sonido al siguiente nivel. Nuestros pedales combinan calidad, innovación y diseño único, ideales para quienes se inician en el mundo de los efectos.</p>
                </details>

                <details>
                    <summary>¿Cómo están construidos sus pedales?</summary>
                    <p>Nuestros pedales están construidos en aluminio, un material que los hace livianos y resistentes. A través de un cuidadoso proceso de anodizado y granallado, logramos un acabado con color único y duradero. Además, el grabado láser garantiza un diseño preciso que mantiene su estética intacta incluso tras un uso intensivo.</p>
                </details>

                <details>
                    <summary>¿Son true bypass?</summary>
                    <p>Sí, todos nuestros pedales son true bypass, lo que significa que no colorean tu señal cuando están apagados, manteniendo tu tono limpio y transparente.</p>
                </details>

                <details>
                    <summary>¿Se pueden usar los pedales con cualquier amplificador?</summary>
                    <p>Sí, nuestros pedales son compatibles con la mayoría de amplificadores, tanto a válvulas como a transistores.</p>
                </details>

                <details>
                    <summary>¿Se pueden usar los pedales con otros instrumentos?</summary>
                    <p>
                        Sí, aunque nuestros pedales están pensados para guitarra, también podés usarlos
                        con bajos, sintetizadores, teclados y otros instrumentos.</p>
                </details>

                <details>
                    <summary>¿Qué fuente de alimentación necesito?</summary>
                    <p>Todos nuestros pedales funcionan con una fuente de alimentacion de 9V DC negativo al centro. Para garantizar el mejor rendimiento y prolongar la vida útil de tu pedal, recomendamos usar únicamente fuentes de alimentación reguladas y filtradas. Una fuente de mala calidad no solo puede generar ruidos molestos, sino también afectar el tono e incluso dañar de forma permanente el pedal.</p>
                </details>

                <details>
                    <summary>¿Por qué no usan baterías de 9V?</summary>
                    <p>No utilizamos baterías de 9V porque nuestros pedales están diseñados para un rendimiento óptimo y duradero. Las baterías se agotan rápido y el voltaje puede variar durante la sesión, afectando el sonido.</p>
                </details>

                <details>
                    <summary>¿Cuál es el tiempo de garantía?</summary>
                    <p>Todos nuestros pedales cuentan con 12 meses de garantía por defectos de fabricación. La garantía no cubre daños por uso indebido o modificaciones externas.</p>
                </details>

                <details>
                    <summary>¿Hacen envíos?</summary>
                    <p>
                        <strong>Argentina:</strong> Sí, realizamos envíos a todo el país por Correo Argentino. Los costos y tiempos dependen del destino y del método de envío elegido.<br />
                        <strong>Internacionales:</strong> Consultanos antes de realizar tu pedido para conocer costos y disponibilidad.
                    </p>
                </details>

                <details>
                    <summary>¿Fabrican pedales a pedido?</summary>
                    <p>No, no fabricamos pedales a pedido. Todos nuestros modelos están diseñados y producidos previamente, garantizando la máxima calidad y consistencia en cada unidad</p>
                </details>

                <details>
                    <summary>¿Hacen modificacion a pedales?</summary>
                    <p>No, no hacemos modificaciones.</p>
                </details>

                <details>
                    <summary>¿Pueden reparar mis pedales?</summary>
                    <p>Solo reparamos nuestros pedales. Si tenés un problema, primero contactanos: muchas veces podemos resolverlo a distancia. Si requiere servicio técnico, coordinamos el envío, lo reparamos y luego te lo mandamos nuevamente.</p>
                </details>

            </div>
        </div>
    )
}

export default Faq
