import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Product from './Product';
import Account from "./Account";
import FetchData from "./FetchData";
import Roles from "./Roles";
import Process from "./Process";
import TXHistory from "./TXHistory";
import Sell from "./Sell";
import Purchase from "./Purchase";
import Package from "./Package";
import Ship from "./Ship";
import Receive from "./Receive";
import Tracking from "./TimeLine/Tracking";

class Content extends Component {
    render() {
        return (
            <div id="panel" className="main-content container-fluid mt--6">
                <BrowserRouter>
                    <Route exact path='/roles' component={ Roles } />
                    <Route exact path='/createProduct' render={(props) => ( <Product {...props} createProductByFarmer = { this.props.createProductByFarmer } /> )} />
                    <Route exact path='/processProduct' render={(props) => ( <Process {...props} processProductByDistributor = { this.props.processProductByDistributor } /> )}/>
                    <Route exact path='/sellProduct' render = {
                        (props) => (
                            <Sell {...props}
                                  sellProductByFarmer = { this.props.sellProductByFarmer }
                                  sellProductByDistributor =  { this.props.sellProductByDistributor }
                                  sellProductByRetailer = { this.props.sellProductByRetailer }
                            />
                        )
                    } />
                    <Route exact path='/purchaseProduct' render = {
                        (props) => (
                            <Purchase {...props}
                                      purchaseProductByDistributor = { this.props.purchaseProductByDistributor }
                                      purchaseProductByRetailer = { this.props.purchaseProductByRetailer }
                                      purchaseProductByConsumer = { this.props.purchaseProductByConsumer }
                            />
                        )
                    } />
                    <Route exact path='/packageProduct' render={(props) => ( <Package {...props} packageProductByDistributor = { this.props.packageProductByDistributor } /> )} />
                    <Route exact path='/shipProduct' render = {
                        (props) => (
                            <Ship {...props}
                                  shipProductByFarmer = { this.props.shipProductByFarmer }
                                  shipProductByDistributor = {this.props.shipProductByDistributor }
                            />
                        )
                    } />
                    <Route exact path='/receiveProduct' render = {
                        (props) => (
                            <Receive {...props}
                                 receiveProductByDistributor = { this.props.receiveProductByDistributor }
                                 receiveProductByRetailer = { this.props.receiveProductByRetailer }
                            />
                        )
                    } />
                    <Route exact path='/fetchData' component={ FetchData } />
                    <Route exact path='/tracker' component={ Tracking } />
                    <Route exact path='/transactionsHistory' component={ TXHistory } />
                    <Route exact path="/account" render={(props) => ( <Account {...props} account = { this.props.account } /> )}  />
                </BrowserRouter>
            </div>
        );
    }
}

export default Content;
