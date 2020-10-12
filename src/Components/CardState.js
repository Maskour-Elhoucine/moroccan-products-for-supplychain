import React, {Component} from 'react';
import gasPriceLogo from '../images/gas.png';
import gasLimitLogo from '../images/maximum.png';
class CardState extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            blockNumber: 0,
            gasPrice: 0,
            gasUsed: 0,
            gasLimit: 0,
            blockNumberTime: '',
            gasLimitTime: '',
            transactionBlockTimeout: 0
        };
    }
    async componentWillMount() {
        await this.renderWeb3();
    }

    async renderWeb3() {
        const web3 = window.web3
        this.setState({
            blockNumber: await web3.eth.getBlockNumber(),
            blockNumberTime: (await web3.eth.getBlock('latest', false)).timestamp,
            gasPrice: await web3.eth.getGasPrice() / Math.pow(10, 9),
            gasLimit: (await web3.eth.getBlock('latest', false)).gasLimit,
            gasLimitTime: (await web3.eth.getBlock('latest', false)).timestamp,
            transactionBlockTimeout: web3.eth.transactionBlockTimeout
        })
    }

    render() {
        return (
            <div className="row" style={{ marginTop: '30px', marginLeft: '80px', marginRight: '80px' }}>
                <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Block NUmber</h5>
                                    <span className="h2 font-weight-bold mb-0">{ this.state.blockNumber }</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                        <i className="fas fa-cubes"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Gas Price</h5>
                                    <span className="h2 font-weight-bold mb-0">{ this.state.gasPrice } GWei</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                        <img alt='gas price png' src={gasPriceLogo} style={{ width: '26px', height: '26px' }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Gas Limit</h5>
                                    <span className="h2 font-weight-bold mb-0">{ this.state.gasLimit }</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                        <i className="fas fa-door-closed"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6">
                    <div className="card card-stats">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h5 className="card-title text-uppercase text-muted mb-0">Transaction Block TimeOut</h5>
                                    <span className="h2 font-weight-bold mb-0">{ this.state.transactionBlockTimeout }</span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                        <i className="far fa-clock"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardState;
