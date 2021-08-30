import React, { ReactElement, useEffect, useState } from "react";
import { Block, Text } from "vcc-ui";

import { cars } from "../../utils/apiUrls";
import getJSON from "../../utils/getJSON";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

import './Homepage.css';

const Homepage = (): ReactElement<HTMLDivElement> => {
    const [carProducts, setCarProducts] = useState([]);

    useEffect(() => {
        getJSON(cars)
            .then((data) => {
                setCarProducts(data);
            }).catch((error) => {
                throw error
            });
    });

    return (
        <Block>
            { carProducts.length > 0 ?
                    <ProductCarousel items={carProducts} />
                :
                    <Text>No products</Text>
            }
        </Block>
    );
};

export default Homepage;