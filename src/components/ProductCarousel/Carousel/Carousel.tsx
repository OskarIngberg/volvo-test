import React, { forwardRef } from "react";
import { Flex } from "vcc-ui";

import CarI from "../../../types/car";
import ProductCard from "../../ProductCard/ProductCard";

import './Carousel.css';

interface props {
    left: number,
    items: Array<CarI>
}

const Carousel = forwardRef<HTMLDivElement, props>(({ left, items }, ref) => {
    return (
        <Flex
            ref={ref}
            style={{ left }}
            extend={{ 
                flexDirection: 'row', 
                flexWrap: 'nowrap',
                position: 'relative',
                transition: 'left 0.5s',
            }}
        >
            { items.map((item, index) => (
                    <ProductCard
                        className="product-carousel__product-card"
                        key={`product-carousel__product-card-${index}`}
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
            )) }
        </Flex>
    );
});

export default Carousel;