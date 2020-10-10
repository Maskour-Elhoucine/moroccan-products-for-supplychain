import React, { Component } from "react";

class Ship extends Component {
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
                        <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text"
                            role="tablist">
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab"
                                   data-toggle="tab" href="#tabs-icons-text-1" role="tab"
                                   aria-controls="tabs-icons-text-1" aria-selected="true"><i className="fas fa-seedling mr-2"></i> FARMER</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab"
                                   href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2"
                                   aria-selected="false"><i className="fas fa-boxes mr-2"></i> DISTRIBUTOR</a>
                            </li>
                        </ul>
                    </div>

                    <div className="card shadow">
                        <div className="card-body">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc = this.upc.value
                                        this.props.shipProductByFarmer(upc)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is the <span style={{ color: "#881907" }}>Step 5</span> in the supply chain,
                                            it's about allows the farmer (Only the farmer) to ship the product that the distributor has been purchased.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="upc">Universal Product Code</label>
                                                        <input type="number" id="upc" name="upc" className="form-control"
                                                               ref={(input) => { this.upc = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Ship
                                        </button>
                                        <hr className="my-4"/>
                                    </form>
                                </div>

                                <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                                    <form onSubmit={(event) => {
                                        event.preventDefault()
                                        const upc = this.upc.value
                                        this.props.shipProductByDistributor(upc)
                                    }}>
                                        <h6 className="heading-small text-muted mb-4">This is the <span style={{ color: "#881907" }}>Step 11</span> in the supply chain,
                                            it's about allows the distributor (Only the distributor) to ship the product that the retailer has been purchased.</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" htmlFor="upc">Universal Product Code</label>
                                                        <input type="number" id="upc" name="upc" className="form-control"
                                                               ref={(input) => { this.upc = input }} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-icon btn-primary">
                                            Ship
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

export default Ship;
