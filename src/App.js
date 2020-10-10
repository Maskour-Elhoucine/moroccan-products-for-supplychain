import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            account: '',
            loading: true
        }
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Supplychain.networks[networkId]

        if(networkData) {
            const supplychain = web3.eth.Contract(Supplychain.abi, networkData.address)
            this.setState({ supplychain })
            this.setState({ loading: false })
        } else {
            window.alert('Supplychain contract not deployed to detected network.')
        }
    }

    render() {
        const appJS = (
            <div>

            </div>
        )

        const waitingForWeb3JS = (
            <div>
                Waiting for web3...
            </div>
        )

        return (
            <div>
                {this.state.account ? appJS : waitingForWeb3JS}
            </div>
        )
    }

}

export default App;
