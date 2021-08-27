import React, { useEffect, useState } from "react";
import { Grid, Row, Col, Block, Logo, useTheme } from "vcc-ui";
import { getWidth } from "../../../utils/getBrowserDimensions";

import Close from "../../Icons/Close";

import './MobileNav.css';

const MobileNav = () => {
    const theme = useTheme();
    const [windowWidth, setWindowWidth] = useState(0);
    const [active, setActive] = useState(true);

    useEffect(() => {
        setWindowWidth(getWidth());
    }, [])

    return (
        <Block className="mobile-nav">
            <Block 
                className={`mobile-nav__menu ${active ? 'active' : ''}`}
                extend={{ 
                    backgroundColor: theme.color.background.primary,
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    right: -windowWidth,
                    width: windowWidth,
                    transition: 'right 0.5s'
            }}>
                <Block extend={{ borderBottom: `1px solid ${theme.color.ornament.divider}` }}>
                    <Grid>
                        <Row>
                            <Col size={{ default: 3 }}>
                                <Block extend={{ paddingTop: 20, marginBottom: 20 }} >
                                    <Logo type="spreadmark" height={7} />
                                </Block>
                            </Col>
                            <Col size={{ default: 1 }}>
                                <Block extend={{ paddingTop: 12, position: 'relative' }}>
                                    <button onClick={() => setActive(false)}>
                                        <Close className="mobile-nav__close"/>
                                    </button>
                                </Block>
                            </Col>
                        </Row>
                    </Grid>
                </Block>
            </Block>
        </Block>
    );
}

export default MobileNav;