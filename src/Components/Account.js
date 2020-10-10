import React, { Component } from 'react';
import blockies from "ethereum-blockies-png";
import blockAccount from '../images/blockAccount.png';


class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            balance: 0,
            account: null,
            networkId: 0,
            networkType: ''
        };

    }

    async componentWillMount() {
        await this.renderAcc();
    }

    async renderAcc() {
        const web3 = window.web3
        let balance;
        const accounts =  await web3.eth.getAccounts()
        let account = accounts[0]
        if (web3.utils.isAddress(account)) {
            balance = web3.utils.fromWei(await web3.eth.getBalance(account)).slice(0, 7);
        } else {
            account = await web3.utils.toChecksumAddress(account)
            balance = web3.utils.fromWei(await web3.eth.getBalance(account)).slice(0, 7);
        }

        this.setState({
            balance: balance,
            account: account,
            networkId: await web3.eth.net.getId(),
            networkType: await web3.eth.net.getNetworkType()
        })
    }

    render() {
        return (
            <div className="row" style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '120px' }}>
                <div className="col-xl-6 order-xl-2">
                    <div className="card card-profile">
                        <img src={blockAccount} alt="Image placeholder" className="card-img-top" style={{ flex: 1 }} />
                            <div className="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="card-profile-image">
                                            <img alt="Profile avatar" className="rounded-circle" style={{ width: '100rem' }} src={
                                                blockies.createDataURL({ scale: 7, seed: this.state.account })
                                            }/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    <div className="font-weight-bolder text-uppercase">
                                        Network ID <br /> <span className="btn btn-sm btn-info  mr-4 ">{ this.state.networkId }</span>
                                    </div>

                                    <div className="font-weight-bolder text-uppercase">
                                        Network Type <br />
                                        <span className="btn btn-sm btn-default float-right">{ this.state.networkType }</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="table-responsive" style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                                    <table className="table align-items-center table-flush" style={{width: '60%'}}>
                                        <tr>
                                            <th scope="col" className="font-weight-bolder bg-gradient-secondary">ADDRESS</th>
                                            <td className="list">{ this.state.account }</td>
                                        </tr>

                                        <tr>
                                            <th scope="col" className="font-weight-bolder bg-gradient-secondary">BALANCE</th>
                                            <td className="list">{ this.state.balance } ETH</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;
