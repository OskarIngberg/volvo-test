import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Block, useTheme} from "vcc-ui";

import CarI from "../../types/car";

import Carousel from "./Carousel/Carousel";
import DesktopButtons from "./DesktopButtons/DesktopButtons";
import MobileButtons from "./MobileButtons/MobileButtons";

import { getWidth } from "../../utils/getBrowserDimensions";
import mediaQueries from "../../utils/mediaQueries";

import './ProductCarousel.css';
import detectMobileDevice from "../../utils/detectMobileDevice";

interface props {
    items: Array<CarI>  
}

const ProductCarousel = ({ items }: props): ReactElement<HTMLDivElement> => {
    const theme = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [productCardWidth, setProductCardWidth] = useState(0);
    const [left, setLeft] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const carousel = useRef<HTMLDivElement>(null!);

    const scrollMobile = useCallback((index: number): void => {
        if (index > items.length - 1 || index < 0) return;
        setActiveIndex(index);
        setLeft(index === items.length - 1 ? -(productCardWidth * index) + 40 : -(productCardWidth * index));
    }, [items.length, productCardWidth]);

    const scrollRightDesktop = (): void => {
        const carouselWidth = carousel.current.offsetWidth;
        const carouselLeft = Number(carousel.current.style.left.replace('px', ''));

        if (carouselLeft < -carouselWidth) {
            return;
        } else {
            setLeft(carouselLeft - productCardWidth);
        }
    };

    const mobileSwipe = useCallback((element: HTMLDivElement): void => {
        let touchstartX = 0;
        let touchendX = 0;
        
        const handleGesture = () => {
          if (touchendX < touchstartX) scrollMobile(activeIndex + 1);
          if (touchendX > touchstartX) scrollMobile(activeIndex - 1);
        }

        const touchStart = (e: TouchEvent) => {
          touchstartX = e.changedTouches[0].screenX;
        };

        const touchEnd = (e: TouchEvent) => {
            touchendX = e.changedTouches[0].screenX;
            handleGesture();
            element.removeEventListener('touchstart', touchStart);
            element.removeEventListener('touchend', touchEnd);
        }

        element.addEventListener('touchstart', touchStart);
        element.addEventListener('touchend', touchEnd);
    }, [activeIndex, scrollMobile]);

    const desktopSwipe = useCallback((element: HTMLDivElement): void => {
        let mouseStartX = 0;
        let mouseEndX = 0;

        const handleGesture = () => {
            if (mouseEndX < mouseStartX) scrollMobile(activeIndex + 1);
            if (mouseEndX > mouseStartX) scrollMobile(activeIndex - 1);
        }

        const mousedown = (e: MouseEvent) => {
            mouseStartX = e.screenX;
        }

        const mouseup = (e: MouseEvent) => {
            mouseEndX = e.screenX;
            handleGesture();
            element.removeEventListener('mousedown', mousedown);
            element.removeEventListener('mouseup', mouseup);
        }

        element.addEventListener('mousedown', mousedown);
        element.addEventListener('mouseup', mouseup);
    }, [activeIndex, scrollMobile]);

    const scrollLeftDesktop = (): void => {
        const carouselLeft = Number(carousel.current.style.left.replace('px', ''));

        if (carouselLeft >= 0) {
            return;
        } else {
            setLeft(carouselLeft + productCardWidth > 0 ? 0 : carouselLeft + productCardWidth);
        }
    };

    const init = useCallback((productCard: Element): void => {
        setProductCardWidth(productCard.getBoundingClientRect().width);
        setWindowWidth(getWidth());

        if (detectMobileDevice()) {
            mobileSwipe(carousel.current);
        } else if (windowWidth < mediaQueries.m) {
            desktopSwipe(carousel.current);
        }

    }, [mobileSwipe, windowWidth, desktopSwipe]);

    useEffect((): void => {
        const productCard = document.getElementsByClassName('product-carousel__product-card')[0];
        init(productCard);

        window.addEventListener('resize', () => {
            init(productCard);
            setLeft(0);
        });
    }, [windowWidth, mobileSwipe, init]);

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