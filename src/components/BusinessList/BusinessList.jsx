import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { Link } from 'react-router-dom'   // 👈 importar Link
import './BusinessList.css'
import { assets } from '../../assets/assets'

function BusinessList() {
    const [productos, setProductos] = useState([])
    const [visibleProductos, setVisibleProductos] = useState([])

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productos"))
                const productosArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                const shuffled = shuffleArray(productosArray)
                setProductos(productosArray)
                setVisibleProductos(shuffled.slice(0, 3))
            } catch (error) {
                console.error("Error al obtener productos: ", error)
            }
        }
        fetchData()
    }, [])

    const handleVerMas = () => {
        const restantes = productos.filter(
            (prod) => !visibleProductos.some((v) => v.id === prod.id)
        )
        const shuffled = shuffleArray(restantes)
        setVisibleProductos((prev) => [...prev, ...shuffled.slice(0, 3)])
    }

    return (
        <div className='business-list'>
            <div className='heading-products'>
                <h1>Nuestros Pedales</h1>
            </div>
                
   

            <div className='cards-container'>
                {visibleProductos.map(prod => (
                    <Link
                        key={prod.id}
                        to={`/pedals/${prod.id}`}   // 👈 redirige al detalle
                        className='business-card'
                    >
                        {prod.image ? (
                            <img
                                className="business-image"
                                src={prod.image}
                                alt={prod.name || "Producto"}
                            />
                        ) : (
                            <div className="placeholder-image">Sin imagen</div>
                        )}
                        <div className='name-pedal-card'>
                            <h3>{prod.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>

            {visibleProductos.length < productos.length && (
                <Link to="/pedals" className="ver-mas-btn">
                    VER TODOS LOS EFECTOS
                </Link>
            )}
        </div>
    )
}

export default BusinessList
