import React, { useEffect, useRef, useState } from "react";
import { Flex, Block, useTheme} from "vcc-ui";

import CarI from "../../types/car";
import { getWidth } from "../../utils/getBrowserDimensions";
import mediaQueries from "../../utils/mediaQueries";
import ChevronCircled from "../Icons/Chevron-circled";
import ProductCard from "../ProductCard/ProductCard";

import './ProductCarousel.css';

interface props {
    items: Array<CarI>
}

const ProductCarousel = ({ items }: props) => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [productCardWidth, setProductCardWidth] = useState(0);
    const [left, setLeft] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const productCard = document.getElementsByClassName('product-carousel__product-card')[0];
        setProductCardWidth(productCard.getBoundingClientRect().width);
        setWindowWidth(getWidth());

        window.addEventListener('resize', () => {
            setProductCardWidth(productCard.getBoundingClientRect().width);
            setWindowWidth(getWidth());
            setLeft(0);
        });
    }, [windowWidth]);

    const scrollMobile = (index: number) => {
        setActiveIndex(index);
        setLeft(index === items.length - 1 ? -(productCardWidth * index) + 40 : -(productCardWidth * index));
    }

    const scrollRightDesktop = () => {
        const carouselWidth = carousel.current.offsetWidth;
        const carouselLeft = Number(carousel.current.style.left.replace('px', ''));

        if (carouselLeft < -carouselWidth) {
            return;
        } else {
            setLeft(carouselLeft - productCardWidth);
        }
    };

    const scrollLeftDesktop = () => {
        const carouselLeft = Number(carousel.current.style.left.replace('px', ''));

        if (carouselLeft >= 0) {
            return;
        } else {
            setLeft(carouselLeft + productCardWidth > 0 ? 0 : carouselLeft + productCardWidth);
        }
    }

    return (
        <Block extend={{
            overflow: 'hidden',
            [theme.breakpoints.fromM]: {
                padding: '0 12px'
            },
        }}>
            <Flex
                ref={carousel}
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
            { windowWidth < mediaQueries.m ?
                    <Flex extend={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {items.map((item, index) => (
                            <Block
                                key={`carousel-selector-${index}`}
                                extend={{ 
                                    backgroundColor: index === activeIndex ? theme.color.foreground.primary : theme.color.ornament.divider,
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    marginRight: 8,
                                    cursor: 'pointer'
                                }}
                                onClick={() => scrollMobile(index)}
                            />
                        ))}
                    </Flex>
                :
                    <Flex extend={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Block
                            className="product-carousel__chevron"
                            extend={{ marginRight: 8 }}
                            onClick={scrollLeftDesktop}
                        >
                            <ChevronCircled className="product-carousel__chevron-rotate" width={28} heigth={28} />
                        </Block>
                        <Block
                            className="product-carousel__chevron" 
                            onClick={scrollRightDesktop}
                        >
                            <ChevronCircled width={28} heigth={28} />
                        </Block>
                    </Flex>
            }
        </Block>
    );
};

export default ProductCarousel;