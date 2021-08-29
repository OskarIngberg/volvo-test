import React from 'react';
import { Flex, Block, useTheme } from "vcc-ui";
import CarI from '../../../types/car';

import './MobileButton.css';

interface props {
    items: Array<CarI>,
    activeIndex: number
    scrollMobile(index: number): void
}

const MobileButtons = ({ items, activeIndex, scrollMobile }: props) => {
    const theme = useTheme();

    return (
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
    )
};

export default MobileButtons;