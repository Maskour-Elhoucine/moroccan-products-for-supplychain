import React, { Component } from "react";

class Process extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-8 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">PROCESS PRODUCT</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const upc = this.upc.value
                                const slices = this.slices.value
                                this.props.processProductByDistributor(upc, slices)
                            }}>
                                <h6 className="heading-small text-muted mb-4">This is the <span style={{ color: "#881907" }}>Step 7</span> in the supply chain,
                                    it's about allows the distributor (Only the distributor) to process the product that he received.
                                </h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="notes">Universal Product Code</label>
                                                <input type="number" id="upc" name="upc" className="form-control"
                                                       ref={(input) => { this.upc = input }} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="slices">Product Slices</label>
                                                <input type="number" id="slices" name="slices" className="form-control"
                                                       ref={(input) => { this.slices = input }} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-icon btn-primary">
                                     Process
                                </button>
                                <hr className="my-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Process;
