import React, { useEffect, useState } from "react";
import { Grid, Row, Col, Block, Logo, useTheme, Link } from "vcc-ui";

import { getWidth } from "../../../utils/getBrowserDimensions";
import mediaQueries from "../../../utils/mediaQueries";
import Close from "../../Icons/Close";

import './Nav.css';

interface props {
    show: boolean,
    setShow(show: boolean): void
}

const Nav = ({show, setShow}: props) => {
    const theme = useTheme();
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        navWidth();
        window.addEventListener('resize', navWidth);
    }, []);

    const navWidth = () => {
        const width = getWidth();
        
        if (width < mediaQueries.m) {
            setWindowWidth(getWidth());
        } else {
            setWindowWidth(400);
        }
    }

    return (
        <>
            <Block className="nav">
                <Block 
                    className="nav__menu"
                    extend={{ 
                        backgroundColor: theme.color.background.primary,
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        right: show ? 0 : -windowWidth,
                        width: windowWidth,
                        transition: 'right 0.5s',
                        zIndex: 10
                }}>
                    <Block extend={{ borderBottom: `1px solid ${theme.color.ornament.divider}` }}>
                        <Grid>
                            <Row>
                                <Col size={{ default: 3, [theme.breakpoints.fromL]: 6 }}>
                                    <Block extend={{ paddingTop: 20, marginBottom: 20 }} >
                                        <Logo type="spreadmark" height={7} />
                                    </Block>
                                </Col>
                                <Col size={{ default: 1, [theme.breakpoints.fromL]: 6 }}>
                                    <Block extend={{ paddingTop: 12, position: 'relative' }}>
                                        <button className="nav__close" onClick={() => setShow(false)}>
                                            <Close width={24} heigth={24} />
                                        </button>
                                    </Block>
                                </Col>
                            </Row>
                        </Grid>
                    </Block>
                    <Grid>
                        <Row>
                            <Col size={{ default: 4, [theme.breakpoints.fromL]: 12 }}>
                                <Link href="https://www.volvocars.com/" arrow="right">
                                    Visit Volvocars.com
                                </Link>
                            </Col>
                        </Row>
                    </Grid>
                </Block>
            </Block>
            <Block extend={{
                display: show ? 'block' : 'none',
                backgroundColor: theme.color.foreground.primary,
                opacity: 0.7,
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            }} />
        </>
    );
}

export default Nav;