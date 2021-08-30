import React, { ReactElement } from 'react';
import { Flex, Block } from "vcc-ui";
import ChevronCircled from '../../Icons/Chevron-circled';

import './DesktopButtons.css';

interface props {
    scrollLeft(): void,
    scrollRight(): void,
    rightDisabled?: boolean,
    leftDisabled?: boolean
}

const DesktopButtons = ({ scrollLeft, scrollRight, rightDisabled, leftDisabled }: props): ReactElement<HTMLDivElement> => {
    return (
        <Flex extend={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Block
                className="product-carousel__chevron"
                extend={{ marginRight: 8, opacity: leftDisabled ? 0.3 : 1 }}
                onClick={scrollLeft}
            >
                <ChevronCircled className="product-carousel__chevron-rotate" width={28} heigth={28} />
            </Block>
            <Block
                className="product-carousel__chevron"
                extend={{ opacity: rightDisabled ? 0.3 : 1 }}
                onClick={scrollRight}
            >
                <ChevronCircled width={28} heigth={28} />
            </Block>
        </Flex>
    );
}

export default DesktopButtons;