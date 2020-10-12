import React, { Component } from 'react';
import Supplychain from "../abis/Supplychain.json";

class FetchData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            productDate: '',
            productPrice: 0,
            stateX: '0'
        };
    }

    merge_objetcs(obj1, obj2) {
        var obj3 = {};
        for (var attrname1 in obj1) { obj3[attrname1] = obj1[attrname1]; }
        for (var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
        return obj3;
    }

    getState (itemState) {
        let stateX = '';
        switch (itemState) {
            case '0': return stateX = 'Produced By Farmer'; break;
            case '1': return stateX = 'For Sale By Farmer'; break;
            case '2': return stateX = 'Purchased By Distributor'; break;
            case '3': return stateX = 'Shipped By Farmer'; break;
            case '4': return stateX = 'Received By Distributor'; break;
            case '5': return stateX = 'Processed By Distributor'; break;
            case '6': return stateX = 'Packaged By Distributor'; break;
            case '7': return stateX = 'For Sale By Distributor'; break;
            case '8': return stateX = 'Purchased By Retailer'; break;
            case '9': return stateX = 'Shipped By Distributor'; break;
            case '10': return stateX = 'Received By Retailer'; break;
            case '11': return stateX = 'For Sale By Retailer'; break;
            case '12': return stateX = 'Purchased By Consumer'; break;
        }
        return stateX;
    }

    async renderData (upc) {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Supplychain.networks[networkId];
        let item = [];
        if(networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address);
            this.setState({ supplychain })
            const item1 = await supplychain.methods.getItemBufferOne(upc).call((err, result) => {
                if (err) console.log(err);
            })

            const item2 = await supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
                if (err) console.log(err);
            })
            item = this.merge_objetcs(item1, item2);
            this.setState({
                item: item,
                productDate: new Date(item2.productDate * 1000).toUTCString(),
                productPrice: web3.utils.fromWei(item.productPrice),
                stateX: this.getState(item.itemState)
            });
        }
    }

    render() {

        return (
            <div>
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-8 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">Product Overview</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const upc = this.upc.value
                                this.renderData(upc)
                            }}>
                                <h6 className="heading-small text-muted mb-4"></h6>
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

                                </div>
                                <button type="submit" className="btn btn-icon btn-primary" onClick={() => {
                                    var data = document.getElementById("dataTable");
                                    data.style.display = 'block';
                                }}>
                                    Fetch Buffer One
                                </button>
                                <hr className="my-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginLeft: '315px', marginRight: '65px', display: "none" }} id="dataTable">
                <div className="col-xl-12 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">Product Overview</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>ProductID</th>
                                        <td> { this.state.item.productId } </td>
                                    </tr>
                                    <tr>
                                        <th>Universal Product Code</th>
                                        <td>{ this.state.item.itemUPC }</td>
                                    </tr>
                                    <tr>
                                        <th>Stock Keeping Unit</th>
                                        <td>{ this.state.item.itemSKU }</td>
                                    </tr>
                                    <tr>
                                        <th>Product Price</th>
                                        <td> { this.state.productPrice } ETH</td>
                                    </tr>
                                    <tr>
                                        <th>Product Notes</th>
                                        <td>{ this.state.item.productNotes } </td>
                                    </tr>
                                    <tr>
                                        <th>Product Date</th>
                                        <td>{ this.state.productDate }</td>
                                    </tr>
                                    <tr>
                                        <th>Product Slices</th>
                                        <td>{ this.state.item.productSliced }</td>
                                    </tr>
                                    <tr>
                                        <th>Owner ID</th>
                                        <td>{ this.state.item.ownerID }</td>
                                    </tr>
                                    <tr>
                                        <th>Farm ID</th>
                                        <td>{ this.state.item.farmId }</td>
                                    </tr>
                                    <tr>
                                        <th>Farm Name</th>
                                        <td>{ this.state.item.farmName }</td>
                                    </tr>
                                    <tr>
                                        <th>Farm Information</th>
                                        <td>{ this.state.item.farmInformation }</td>
                                    </tr>
                                    <tr>
                                        <th>Farm Latitude</th>
                                        <td>{ this.state.item.farmLatitude }</td>
                                    </tr>
                                    <tr>
                                        <th>Farm Longitude</th>
                                        <td>{ this.state.item.farmLongitude }</td>
                                    </tr>
                                    <tr>
                                        <th>Farmer ID</th>
                                        <td>{ this.state.item.farmerID }</td>
                                    </tr>
                                    <tr>
                                        <th>Distributor ID</th>
                                        <td>{ localStorage.getItem('distributorID') }</td>
                                    </tr>
                                    <tr>
                                        <th>Retailer ID</th>
                                        <td>{ localStorage.getItem('retailerID') }</td>
                                    </tr>
                                    <tr>
                                        <th>Consumer ID</th>
                                        <td>{ localStorage.getItem('consumerID') }</td>
                                    </tr>
                                    <tr>
                                        <th>State</th>
                                        <td className="font-weight-bold" style={{ color: '#2F1468' }}>
                                            {
                                                this.state.stateX === 'Purchased By Consumer'
                                                    ? <div>{ this.state.stateX }. &nbsp; <span className="text-danger"><sup><i className="fas fa-exclamation-triangle" /></sup> It is no longer available.</span></div>
                                                    : this.state.stateX
                                            }
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


export default FetchData;
