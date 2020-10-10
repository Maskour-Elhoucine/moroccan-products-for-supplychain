import React, { Component } from 'react';
import logo from '../images/safran3.svg';
import { Nav } from 'react-bootstrap';
import blockies from 'ethereum-blockies-png';
import CardState from "./CardState";

class NavbarS extends Component {

    render() {
        return (
            <>
                <Nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
                     id="sidenav-main">
                    <div className="scrollbar-inner">
                        <div className="sidenav-header  align-items-center">
                            <a className="navbar-brand" href="/">
                                <header className="App-header">
                                    <img src={logo} className="App-logo" alt="logo"/>
                                    <h4 style={{ color: '#8069ad' }}> SAFFRON TRACE </h4>
                                </header>
                            </a>
                        </div>
                        <br /> <br />
                        <div className="navbar-inner">
                            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                                <ul className="navbar-nav">
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/">
                                            <i className="ni ni-tv-2 text-primary" />
                                            <span className="nav-link-text">Home</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/roles">
                                            <i className="ni ni-ungroup text-orange" />
                                            <span className="nav-link-text">Add Roles</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/createProduct">
                                            <i className="far fa-plus-square text-purple" />
                                            <span className="nav-link-text">Create Product</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/processProduct">
                                            <img src="https://img.icons8.com/color/48/000000/serial-tasks.png" style={{ width: '20px', height: '20px' }}/> &nbsp;&nbsp;
                                            <span className="nav-link-text">Process Product</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/packageProduct">
                                            <img src="https://img.icons8.com/fluent/48/000000/box-settings-1.png" style={{ width: '20px', height: '20px' }}/> &nbsp;&nbsp;
                                            <span className="nav-link-text">Package Product</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/shipProduct">
                                            <img src="https://img.icons8.com/color/48/000000/shipped.png" style={{ width: '20px', height: '20px' }}/> &nbsp;&nbsp;
                                            <span className="nav-link-text">Ship Product</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/purchaseProduct">
                                            <img src="https://img.icons8.com/color/48/000000/purchase-order.png" style={{ width: '20px', height: '20px' }}/> &nbsp;&nbsp;
                                            <span className="nav-link-text">Purchase Product</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/receiveProduct">
                                            <img src="https://img.icons8.com/color/48/000000/2f-swipe-left.png" style={{ width: '20px', height: '20px' }}/> &nbsp;&nbsp;
                                            <span className="nav-link-text">Receive Product</span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/fetchData">
                                            <i className="far fa-eye text-green" />
                                            <span className="nav-link-text">Fetch Data</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <br />
                                    <hr className="my-2" />
                                    <Nav.Item>
                                        <Nav.Link className="navbar-brand" href="/transactionsHistory">
                                            <i className="fas fa-microchip text-info" />
                                            <span className="nav-link-text">Transactions History</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Nav>

                <div className="main-content" id="panel">
                    <Nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-gradient-success py-1">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default"
                                aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar-default">
                            <div className="navbar-collapse-header">
                                <div className="row">
                                    <div className="col-6 collapse-close">
                                        <button type="button" className="navbar-toggler" data-toggle="collapse"
                                                data-target="#navbar-default" aria-controls="navbar-default"
                                                aria-expanded="false" aria-label="Toggle navigation">
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <ul className="navbar-nav ml-lg-auto" >
                                <Nav.Item>
                                <li className="nav-item dropdown">
                                    <Nav.Link href='/account' className="nav-link nav-link-icon" role="button">
                                        <span id="account" className="nav-link-inner--text text-uppercase font-weight-bold"> Account
                                            <img alt="Profile avatar" style={{marginLeft: "10px", width:"20px", height:"20px", borderRadius:"3px"}} src={
                                                blockies.createDataURL({ scale: 5, seed: this.props.account})
                                            }/>
                                        </span>
                                    </Nav.Link>
                                </li>
                                </Nav.Item>
                            </ul>

                        </div>
                    </Nav>
                    <CardState />
                </div>
            </>
        );
    }
}

export default NavbarS;
