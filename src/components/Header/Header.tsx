import React, { ReactElement, useState } from "react";
import { Block, Logo, Grid, Row, Col, useTheme } from "vcc-ui";

import Nav from "./Nav/Nav";

import './Header.css';
import Bars from "../Icons/Bars";

const Header = (): ReactElement<HTMLDivElement> => {
    const theme = useTheme();
    const [showMobileNav, setShowMobileNav] = useState(false);

    return (
        <>
            <Block as="header" className="header" extend={{ borderBottom: `1px solid ${theme.color.ornament.divider}` }}>
                <Grid>
                    <Row>
                        <Col size={{ default: 3, [theme.breakpoints.fromL]: 6 }}>
                            <Block extend={{ paddingTop: 20, marginBottom: 20 }} >
                                <Logo type="spreadmark" height={7} />
                            </Block>
                        </Col>
                        <Col size={{ default: 1, [theme.breakpoints.fromL]: 6 }}>
                            <Block extend={{ paddingTop: 12, position: 'relative' }}>
                                <button className="header__bars" onClick={() => setShowMobileNav(true)}>
                                    <Bars width={24} heigth={24} />
                                </button>
                            </Block>
                        </Col>
                    </Row>
                </Grid>
            </Block>
            <Nav show={showMobileNav} setShow={setShowMobileNav} />
        </>
    )
};

export default Header;