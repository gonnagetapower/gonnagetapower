import React from "react";
import './Product.css'

import Camera from './../../assets/camera.svg'

const Product = ({ item }) => {
    return (
        <div className="product">
            <div className="product__img">
                <img src={Camera} />
            </div>
            <div>
                <h2 className="product__title">{item.product}</h2>
                {item.brand ? <p>Бренд: {item.brand}</p> : ''}
                <p>Артикул: {item.id}</p>
                <p>Цена: {item.price}</p>
            </div>
        </div>
    )
}

export default Product;