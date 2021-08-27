import React from "react";
import { Card, CardContent, Text, Link, useTheme } from "vcc-ui";
import ProductI from "../../types/product";

import './ProductCard.css';

const ProductCard = ({ bodyType, title, modelType, image, links }: ProductI) => {
    const theme = useTheme();

    return (
        <Card>
            <CardContent>
                <Text 
                    extend={{ 
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        color: theme.color.foreground.secondary
                }}>
                    {bodyType}
                </Text>
                <Text extend={{fontWeight: 700}}>{title}</Text>
                <Text extend={{fontWeight: 400, color: theme.color.foreground.secondary}}>{modelType}</Text>
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