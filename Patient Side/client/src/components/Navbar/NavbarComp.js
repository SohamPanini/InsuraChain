import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from '../images/logo.png';
import './styles.css';

export default class NavbarComp extends Component{
    render(){
        return(
                    <Navbar className="navbar-main" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src={logo}
                                    width="45"
                                    height="45"
                                    className="d-inline justify-content-center align-center mx-auto"
                                />{' '}
                                Insurachain
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
        )
    }
}