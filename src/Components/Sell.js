import React, { Component } from "react";

class Sell extends Component {
    constructor (props) {
        super(props);
        this.state = {
            accounts: []
        }
    }

    async componentWillMount() {
        //this.sellProductByFarmer();
    }


    render() {
        return (
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-8 order-xl-1">
                    <div className="nav-wrapper">
                        <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text"
                            role="tablist">
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab"
                                   data-toggle="tab" href="#tabs-icons-text-1" role="tab"
                                   aria-controls="tabs-icons-text-1" aria-selected="true"><i className="fas fa-seedling mr-2"></i> FARMER </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab"
                                   href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2"
                                   aria-selected="false"><i className="fas fa-boxes mr-2"></i> DISTRIBUTOR</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab"
                                   href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3"
                                   aria-selected="false"><i className="fas fa-trailer mr-2"></i> RETAILER</a>
                            </li>
                        </ul>
                    </div>

                    <div className="card shadow">
                        <div className="card-body">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc1 = this.upc1.value
                                        const price1 = window.web3.utils.toWei(this.price1.value, 'ether')
                                        this.props.sellProductByFarmer(upc1, price1)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is the <span style={{ color: "#881907" }}>Step 3</span> in the supply chain,
                                            it's about allows the farmer (Only the farmer) to sell the product created or produced.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="notes">Universal Product Code</label>
                                                        <input type="number" id="upc1" name="upc1" className="form-control"
                                                               ref={(input) => { this.upc1 = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="price1"> Price </label>
                                                        <div className="input-group">
                                                            <input type="number" id="price1" name="price1" className="form-control" aria-describedby="basic-addon1"
                                                                   ref={(input) => { this.price1 = input }}/>
                                                            <div className="input-group-append">
                                                                <span className="input-group-text">ETH</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Sell
                                        </button>
                                        <hr className="my-4"/>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc2 = this.upc2.value
                                        const price2 = window.web3.utils.toWei(this.price2.value, 'ether')
                                        this.props.sellProductByDistributor(upc2, price2)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is <span style={{ color: "#881907" }}>Step 9</span> in the supply chain,
                                            it's about allows the distributor (Only the distributor) to sell the product that he packaged.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="notes">Universal Product Code</label>
                                                        <input type="number" id="upc2" name="upc2" className="form-control"
                                                               ref={(input) => { this.upc2 = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="price2"> Price </label>
                                                        <div className="input-group">
                                                            <input type="number" id="price2" name="price2" className="form-control" aria-describedby="basic-addon1"
                                                                   ref={(input) => { this.price2 = input }}/>
                                                            <div className="input-group-append">
                                                                <span className="input-group-text">ETH</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Sell
                                        </button>
                                        <hr className="my-4"/>
                                    </form>
                                </div>


                                <div className="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc3 = this.upc3.value
                                        const price3 = window.web3.utils.toWei(this.price3.value, 'ether')
                                        this.props.sellProductByRetailer(upc3, price3)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is <span style={{ color: "#881907" }}>Step 12</span> in the supply chain,
                                            it's about allows the retailer (Only the retailer) to sell the product that he received.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="notes">Universal Product Code</label>
                                                        <input type="number" id="upc3" name="upc3" className="form-control"
                                                               ref={(input) => { this.upc3 = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="price3"> Price </label>
                                                        <div className="input-group">
                                                            <input type="number" id="price3" name="price3" className="form-control" aria-describedby="basic-addon1"
                                                                   ref={(input) => { this.price3 = input }}/>
                                                            <div className="input-group-append">
                                                                <span className="input-group-text">ETH</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Sell
                                        </button>
                                        <hr className="my-4"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sell;
