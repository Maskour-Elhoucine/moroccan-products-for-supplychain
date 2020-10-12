import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false,
        };
    }

    render() {
        return (
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-12 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">CREATE PRODUCTS</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const upc = this.upc.value
                                const price = window.web3.utils.toWei(this.price.value.toString(), 'ether')
                                const notes = this.notes.value
                                const farmName = this.farmName.value
                                const farmInformation = this.farmInformation.value
                                const farmLatitude = this.farmLatitude.value
                                const farmLongitude = this.farmLongitude.value
                                this.props.createProductByFarmer(
                                    upc,
                                    price,
                                    notes,
                                    farmName,
                                    farmInformation,
                                    farmLatitude,
                                    farmLongitude
                                )
                            }}>
                                <h6 className="heading-small text-muted mb-4">This is the <span style={{ color: "#881907" }}>Step 2</span> in the supply chain, it's about ALLOWS THE FARMER TO CREATE A PRODUCT,
                                    and deploy it in the blockchain network.</h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="upc"> Universal Product Code </label>
                                                <input type="number" id="upc" name="upc" className="form-control"
                                                       ref={(input) => { this.upc = input }}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="price"> Product Price </label>
                                                <div className="input-group">
                                                    <input type="number" id="price" name="price" className="form-control" aria-describedby="basic-addon1"
                                                           ref={(input) => { this.price = input }}/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">ETH</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="notes"> Product Notes </label>
                                                <textarea rows="4" id="notes" name="notes" className="form-control" required
                                                    ref={(input) => { this.notes = input }}
                                                    placeholder="Anything related to the product, such as water pH, temperature, humidity, weight and more ..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4"/>
                                <h6 className="heading-small text-muted mb-4">Farm information</h6>
                                <div className="pl-lg-4">
                                      <div className="row">
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label className="form-control-label" htmlFor="farmName"> Farm Name </label>
                                                  <input type="text" id="farmName" name="farmName" className="form-control"
                                                         ref={(input) => { this.farmName = input }}/>
                                              </div>
                                          </div>
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label className="form-control-label" htmlFor="farmLatitude"> Farm Latitude </label>
                                                  <input type="text" id="farmLatitude" name="farmLatitude" className="form-control"
                                                         ref={(input) => { this.farmLatitude = input }}/>
                                              </div>
                                          </div>
                                          <div className="col-lg-4">
                                              <div className="form-group">
                                                  <label className="form-control-label" htmlFor="farmLongitude"> Farm Longitude </label>
                                                  <input type="text" id="farmLongitude" name="farmLongitude" className="form-control"
                                                         ref={(input) => { this.farmLongitude = input }}/>
                                              </div>
                                          </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="farmInformation">About The Farm</label>
                                                <textarea rows="4" id="farmInformation" name="farmInformation"  className="form-control"
                                                    ref={(input) => { this.farmInformation = input }}
                                                    placeholder="Some informations about the farmer and the farm, like: Name, Phone number, Address, Email ..." required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4"/>
                                <button type="submit" className="btn btn-icon btn-primary"
                                        style={{ width: '250px', alignItems: 'center', justifyContent: 'center', marginLeft: '580px', marginRight: '65px' }}>
                                    <i className="fas fa-plus-circle"/> Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Product;
