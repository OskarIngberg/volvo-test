import React from "react";
import { Block, Logo, Grid, Row, Col } from "vcc-ui";

import MobileNav from "./MobileNav/MobileNav";

import './Header.css';
import Bars from "../Icons/Bars";

const Header = () => {
    return (
        <>
            <Block as="header" className="header">
                <Grid>
                    <Row>
                        <Col size={{ default: 3 }}>
                            <Block extend={{ paddingTop: 20 }} >
                                <Logo type="spreadmark" height={7} />
                            </Block>
                        </Col>
                        <Col size={{ default: 1 }}>
                            <Block extend={{ paddingTop: 12, position: 'relative' }}>
                                <Bars className="header__bars" />
                            </Block>
                        </Col>
                    </Row>
                </Grid>
            </Block>
            <MobileNav />
        </>
    )
};

export default Header;