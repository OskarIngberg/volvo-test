import React from "react";
import CarI from "../../types/car";
import ProductCard from "../ProductCard/ProductCard";

import './ProductCarousel';

interface props {
    items: Array<CarI>
}

const ProductCarousel = ({ items }: props) => {
    return (
        <>
            { items.map((item) => {
                return (
                    <ProductCard
                        key={item.id}
                        bodyType={item.bodyType}
                        title={item.modelName}
                        modelType={item.modelType}
                        image={{ src: item.imageUrl, alt: item.modelName }}
                        links={[
                            {
                                text: 'Learn',
                                href: `/learn/${item.id}`
                            },
                            {
                                text: 'Shop',
                                href: `/show/${item.id}`
                            }
                        ]}/>
                    );
                }) }
        </>
    );
};

export default ProductCarousel;