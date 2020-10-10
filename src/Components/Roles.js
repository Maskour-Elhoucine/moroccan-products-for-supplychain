import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Supplychain from "../abis/Supplychain.json";

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskAccountId: "0x0000000000000000000000000000000000000000",
            farmerID: "0x0000000000000000000000000000000000000000",
            distributorID: "0x0000000000000000000000000000000000000000",
            retailerID: "0x0000000000000000000000000000000000000000",
            consumerID: "0x0000000000000000000000000000000000000000"
        };
    }

    async componentWillMount () {
        await this.getMetaMaskAccounts();
    }

    async getMetaMaskAccounts (fd = '', dd = '', rd = '', cd = '') {
        const web3 = window.web3;
        await web3.eth.getAccounts((err, res) => {
            if (err) {
                console.log('(GetMetaMaskAccounts function) => ', err);
                return;
            }
            this.setState({ metaMaskAccountId: res[0] });
            if (res.length > 1) {
                ReactDOM("Ganache Address", document.getElementById('divType'));
                console.log("Using Ganache");
                this.setState({ farmerID: res[1] });
                ReactDOM(this.state.farmerID, document.getElementById('farmerID'));
                this.setState({ distributorID: res[2] });
                ReactDOM(this.state.distributorID, document.getElementById('distributorID'));
                this.setState({ retailerID: res[3] });
                ReactDOM(this.state.retailerID, document.getElementById('retailerID'));
                this.setState({ consumerID: res[4] });
                ReactDOM.render(this.state.consumerID, document.getElementById('consumerID'));
            } else {
                ReactDOM.render("Using MetaMask Address", document.getElementById('divType'));

                this.setState({
                    farmerID: fd,
                    distributorID: dd,
                    retailerID: rd,
                    consumerID: cd
                });
            }
        });
    }

    async FarmerAD() {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Supplychain.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address);
            this.setState({ supplychain })
            var checkRole = await supplychain.methods.isFarmer(this.state.farmerID).call((err, result) => {
                checkRole = result;
            });

            if (checkRole === false) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-danger font-weight-bold'>false</a>, document.getElementById('isFarmer'));
                await supplychain.methods.addFarmer(
                    this.state.farmerID
                ).send({ from: this.state.metaMaskAccountId, gas: 3000000 });
            }

            if (checkRole === true) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-success font-weight-bold'>true</a>, document.getElementById('isFarmer'));
            }
        }
    }

    async DistributorAD() {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Supplychain.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address);
            this.setState({ supplychain })
            var checkRole = await supplychain.methods.isDistributor(this.state.distributorID).call((err, result) => {
                checkRole = result;
            });

            if (checkRole === false) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-danger font-weight-bold'>false</a>, document.getElementById('isDistributor'));
                await supplychain.methods.addDistributor(
                    this.state.distributorID
                ).send({ from: this.state.metaMaskAccountId, gas: 3000000 });
            }
            if (checkRole === true) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-success font-weight-bold'>true</a>, document.getElementById('isDistributor'));
            }
        }
    }

    async RetailerAD() {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Supplychain.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address);
            this.setState({ supplychain })
            var checkRole = await supplychain.methods.isRetailer(this.state.retailerID).call((err, result) => {
                checkRole = result;
            });
            if (checkRole === false) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-danger font-weight-bold'>false</a>, document.getElementById('isRetailer'));
                await supplychain.methods.addRetailer(
                    this.state.retailerID
                ).send({ from: this.state.metaMaskAccountId, gas: 3000000 });
            }
            if (checkRole === true) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-success font-weight-bold'>true</a>, document.getElementById('isRetailer'));
            }
        }
    }

    async ConsumerAD() {
        const web3 = window.web3
        const networkId = await web3.eth.net.getId();
        const networkData = Supplychain.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address);
            this.setState({ supplychain })
            var checkRole = await supplychain.methods.isConsumer(this.state.consumerID).call((err, result) => {
                checkRole = result;
            });
            if (checkRole === false) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-danger font-weight-bold'>false</a>, document.getElementById('isConsumer'));
                await supplychain.methods.addConsumer(
                    this.state.consumerID
                ).send({ from: this.state.metaMaskAccountId, gas: 3000000 });
            }
            if (checkRole === true) {
                ReactDOM.render(<a className='btn btn-secondary disabled text-success font-weight-bold'>true</a>, document.getElementById('isConsumer'));
            }
        }
    }
    render() {
        return (
            <div className="row" style={{ alignItems: 'center', justifyContent: 'center', marginTop: '120px', marginLeft: '315px', marginRight: '65px' }}>
                <div className="col-xl-12 order-xl-1">
                    <div className="card">
                        <div className="card-header">
                            <div className="row align-items-center">
                                <div className="col-8">
                                    <h3 className="mb-0">ADD ROLES</h3>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h6 className="heading-small text-muted mb-4">This is the <span style={{ color: "#881907" }}>Step 1</span> in the supply chain,
                                it's about Adding Addresses to the appropriate roles,
                                the smart contract checks if the addresses given are associated with the participants,
                                if it returns false, then try again to add a participant to the network.
                            </h6>
                            <div className="pl-lg-4">
                                <div id="divType" className="text-uppercase text-success font-weight-bold"></div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={(event) => {
                                            event.preventDefault()
                                            const fd = this.farmerID.value
                                            this.getMetaMaskAccounts(fd)
                                            this.FarmerAD()
                                        }}>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="farmerID" />
                                                <div className="input-group">
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-primary" style={{ width: '180px' }} onClick={() => {
                                                            localStorage.setItem('farmerID', this.farmerID.value)
                                                        }}>Add Farmer</button>
                                                    </div>
                                                    <input type="text" id="farmerID" name="farmerID" className="form-control" aria-describedby="basic-addon1"
                                                           ref={(input) => { this.farmerID = input }}/>
                                                    <div id="isFarmer"></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={(event) => {
                                            event.preventDefault()
                                            const dd = this.distributorID.value
                                            this.getMetaMaskAccounts('', dd, '', '')
                                            this.DistributorAD()
                                        }}>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="distributorID" />
                                                <div className="input-group">
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-primary" style={{ width: '180px' }} onClick={() => {
                                                            localStorage.setItem('distributorID', this.distributorID.value)
                                                        }}>Add Distributor</button>
                                                    </div>
                                                    <input type="text" id="distributorID" name="distributorID" className="form-control" aria-describedby="basic-addon1"
                                                       ref={(input) => { this.distributorID = input }}/>
                                                   <div id="isDistributor"></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={(event) => {
                                            event.preventDefault()
                                            const rd = this.retailerID.value
                                            this.getMetaMaskAccounts('', '', rd, '')
                                            this.RetailerAD()
                                        }}>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="retailerID" />
                                                <div className="input-group">
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-primary" style={{ width: '180px' }} onClick={() => {
                                                            localStorage.setItem('retailerID', this.retailerID.value)
                                                        }}>Add Retailer</button>
                                                    </div>
                                                    <input type="text" id="retailerID" name="retailerID" className="form-control" aria-describedby="basic-addon1"
                                                           ref={(input) => { this.retailerID = input }}/>
                                                    <div id="isRetailer"></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={(event) => {
                                            event.preventDefault()
                                            const cd = this.consumerID.value
                                            this.getMetaMaskAccounts('', '', '', cd)
                                            this.ConsumerAD()
                                        }}>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="consumerID" />
                                                <div className="input-group">
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-primary" style={{ width: '180px' }} onClick={() => {
                                                            localStorage.setItem('consumerID', this.consumerID.value)
                                                        }}>Add Consumer</button>
                                                    </div>
                                                    <input type="text" id="consumerID" name="consumerID" className="form-control" aria-describedby="basic-addon1"
                                                           ref={(input) => { this.consumerID = input }}/>
                                                    <div id="isConsumer"></div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            <hr className="my-4"/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


export default Roles;
