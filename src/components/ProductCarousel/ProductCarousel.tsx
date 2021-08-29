import React, { useEffect, useRef, useState } from "react";
import { Flex, Block, useTheme} from "vcc-ui";

import CarI from "../../types/car";
import { getWidth } from "../../utils/getBrowserDimensions";
import mediaQueries from "../../utils/mediaQueries";
import ChevronCircled from "../Icons/Chevron-circled";
import Carousel from "./Carousel/Carousel";
import DesktopButtons from "./DesktopButtons/DesktopButtons";
import MobileButtons from "./MobileButtons/MobileButtons";

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
            <Carousel ref={carousel} left={left} items={items} />
            { windowWidth < mediaQueries.m ?
                    <MobileButtons items={items} activeIndex={activeIndex} scrollMobile={scrollMobile} />
                :
                    <DesktopButtons scrollLeft={scrollLeftDesktop} scrollRight={scrollRightDesktop} />
            }
        </Block>
    );
};

export default ProductCarousel;