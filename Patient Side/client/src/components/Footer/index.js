import React from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap'
import '../Navbar/styles.css';

/**
* @author
* @function Footer
**/

const currentDate = new Date();
const year = currentDate.getFullYear();

const Footer = (props) => {
    return (
            <Navbar fixed = "bottom" className='navbar-main'>
                <Container style={{ textAlign: "center", color: "#fff", backgroundColor: "#02353C"}}>
                    <NavbarBrand >
                        <Container style={{ textAlign: "center", color: "#fff", backgroundColor: "#02353C"}}>
                            © Insurachain {year}. All Rights Reserved.
                        </Container>
                    </NavbarBrand>
                </Container>
            </Navbar>
    )

}

export default Footer