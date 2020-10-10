import React, { Component } from "react";

class Purchase extends Component {
    constructor (props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-8 order-xl-1">
                    <div className="nav-wrapper">
                        <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab"
                                   data-toggle="tab" href="#tabs-icons-text-1" role="tab"
                                   aria-controls="tabs-icons-text-1" aria-selected="true"><i className="fas fa-boxes mr-2"></i> DISTRIBUTOR</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab"
                                   href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2"
                                   aria-selected="false"><i className="fas fa-store mr-2"></i>  RETAILER</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab"
                                   href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3"
                                   aria-selected="false"><i className="ni ni-cart mr-2"></i>CONSUMER</a>
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
                                        this.props.purchaseProductByDistributor(upc1)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is <span style={{ color: "#881907" }}>Step 4</span> in the supply chain,
                                            it's about allows the distributor (Only the distributor) to purchase the product that offered for sale by the farmer.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="upc1">Universal Product Code</label>
                                                        <input type="number" id="upc1" name="upc1" className="form-control"
                                                               ref={(input) => { this.upc1 = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Purchase
                                        </button>
                                        <hr className="my-4"/>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc2 = this.upc2.value
                                        this.props.purchaseProductByRetailer(upc2)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is <span style={{ color: "#881907" }}>Step 10</span> in the supply chain,
                                            it's about allows the retailer (Only the retailer) to purchase the product that offered for sale by the distributor.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="upc2">Universal Product Code</label>
                                                        <input type="number" id="upc2" name="upc2" className="form-control"
                                                               ref={(input) => { this.upc2 = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Purchase
                                        </button>
                                        <hr className="my-4"/>
                                    </form>
                                </div>


                                <div className="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc3 = this.upc3.value
                                        this.props.purchaseProductByConsumer(upc3)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is <span style={{ color: "#881907" }}>Step 13</span> (the last) in the supply chain,
                                            it's about allows the consumer (Only the consumer) to purchase the product that offered for sale by the retailer.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="upc3">Universal Product Code</label>
                                                        <input type="number" id="upc3" name="upc3" className="form-control"
                                                               ref={(input) => { this.upc3 = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Purchase
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

export default Purchase;
