import React from "react";
import { Card, CardContent, Text, Link } from "vcc-ui";
import ProductI from "../../types/product";

import './ProductCard.css';

const ProductCard = ({ carType, title, engineType, image, links }: ProductI) => {
    return (
        <Card>
            <CardContent>
                <Text>{carType}</Text>
                <Text>{title}</Text>
                <Text>{engineType}</Text>
                <img src={image.src} alt={image.alt} />
                { links.map((link) => (
                    <Link href={link.href} arrow="right">
                        {link.text}
                    </Link>
                )) }
            </CardContent>
        </Card>
    );
};

export default ProductCard;