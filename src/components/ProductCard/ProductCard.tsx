import React, { ReactElement } from "react";
import { Text, Link, Flex, Block, useTheme } from "vcc-ui";
import ProductI from "../../types/product";

import './ProductCard.css';

interface props extends ProductI {
    className: string
}

const ProductCard = ({ bodyType, title, modelType, image, links, className }: props): ReactElement<HTMLDivElement> => {
    const theme = useTheme();

    return (
        <Block
            className={`product-card ${className}`}
            extend={{
            width: '80%',
            flexShrink: 0,
            flexGrow: 1,
            padding: 10,
            [theme.breakpoints.fromM]: {
                width: '23%'
            },
            [theme.breakpoints.fromL]: {
                width: '23.9%'
            },
            [theme.breakpoints.fromXL]: {
                width: '23.9%'
            }
        }}>
            <Text 
                extend={{ 
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: theme.color.foreground.secondary
            }}>
                {bodyType}
            </Text>
            <Text extend={{fontWeight: 700}}>{title}</Text>
            <Text extend={{fontWeight: 400, color: theme.color.foreground.secondary, marginBottom: 8}}>{modelType}</Text>
            <img className="product-card__image" src={image.src} alt={image.alt} />
            <Flex extend={{ flexDirection: 'row', justifyContent: 'center' }}>
                { links.map((link) => (
                    <Block key={link.text} extend={{ marginRight: '18px' }}>
                        <Link href={link.href} arrow="right">
                            {link.text}
                        </Link>
                    </Block>
                )) }
            </Flex>
        </Block>
    );
};

export default ProductCard;