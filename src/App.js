import React, {Component} from 'react';
import './App.css';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/NavbarS';
import Content from './Components/Content';
import Supplychain from '../src/abis/Supplychain.json';
import Web3 from 'web3';

class App extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            account: '',
            items: [],
            isOpen: true
        };

        this.createProductByFarmer = this.createProductByFarmer.bind(this);
        this.sellProductByFarmer = this.sellProductByFarmer.bind(this);
        this.purchaseProductByDistributor = this.purchaseProductByDistributor.bind(this);
        this.shipProductByFarmer = this.shipProductByFarmer.bind(this);
        this.receiveProductByDistributor = this.receiveProductByDistributor.bind(this);
        this.processProductByDistributor = this.processProductByDistributor.bind(this);
        this.packageProductByDistributor = this.packageProductByDistributor.bind(this);
        this.sellProductByDistributor = this.sellProductByDistributor.bind(this);
        this.purchaseProductByRetailer = this.purchaseProductByRetailer.bind(this);
        this.shipProductByDistributor = this.shipProductByDistributor.bind(this);
        this.receiveProductByRetailer = this.receiveProductByRetailer.bind(this);
        this.sellProductByRetailer = this.sellProductByRetailer.bind(this);
        this.purchaseProductByConsumer = this.purchaseProductByConsumer.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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

    createProductByFarmer(upc, price, notes, farmName, farmInformation, farmLatitude, farmLongitude) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.createProductByFarmer(
            upc,
            price,
            notes,
            farmName,
            farmInformation,
            farmLatitude,
            farmLongitude
        ).send({ from: this.state.account }).on('error', function () {
            this.setState({
                isOpen: false,
            })
        }).once('receipt', (receipt) => {
            localStorage.setItem('PPBF'+upc, new Date(Date.now()).toUTCString());
            toast.success('Product Created!', { position: toast.POSITION.TOP_RIGHT, transition: Slide});
            this.setState({ isOpen: false });
        }).on('error', (error) => {
            toast.error('Transaction rejected!', { position: toast.POSITION.TOP_RIGHT, transition: Slide});
            this.setState({ isOpen: false })
        })
    }

    sleep (milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    sellProductByFarmer(upc, price) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '0') {
                this.state.supplychain.methods.sellProductByFarmer(
                    upc,
                    price
                ).send({ from: this.state.account }).once('receipt', function (receipt) {
                    localStorage.setItem('PFSBF'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now for sale by the farmer, check roles for appropriates addresses', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    toast.success('Transactions History gives you a transaction hash, you can verify it', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or farmer has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Farmers can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already set for sale, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    purchaseProductByDistributor (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            const balance = result.productPrice;
            if (theState === '1') {
                this.state.supplychain.methods.purchaseProductByDistributor(
                    upc
                ).send({ from: localStorage.getItem('distributorID'), value: balance }).once('receipt', function (receipt) {
                    localStorage.setItem('PPBD'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now purchased by the distributor.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    toast.success('Transactions History gives you a transaction hash, you can verify it', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or distributor has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Distributors can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already purchased, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    shipProductByFarmer (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '2') {
                this.state.supplychain.methods.shipProductByFarmer(
                    upc
                ).send({ from: localStorage.getItem('farmerID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PSBF'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now shipped by the farmer.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    toast.success('Transactions History gives you a transaction hash, you can verify it', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or farmer has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Farmers can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already shipped, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    receiveProductByDistributor (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '3') {
                this.state.supplychain.methods.receiveProductByDistributor(
                    upc
                ).send({ from: localStorage.getItem('distributorID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PRBD'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now received by the distributor.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    toast.success('Transactions History gives you a transaction hash, you can verify it', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or distributor has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Distributors can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already received, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    processProductByDistributor (upc, slices) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '4') {
                this.state.supplychain.methods.processProductByDistributor(
                    upc,
                    slices
                ).send({ from: localStorage.getItem('distributorID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PPCSBD'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now processed by the distributor.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    toast.success('Transactions History gives you a transaction hash, you can verify it', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or distributor has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Distributors can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already processed, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    packageProductByDistributor (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '5') {
                this.state.supplychain.methods.packageProductByDistributor(
                    upc
                ).send({ from: localStorage.getItem('distributorID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PPCKBD'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now packaged by the distributor.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    toast.success('Transactions History gives you a transaction hash, you can verify it', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or distributor has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Distributor can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already packaged, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    sellProductByDistributor(upc, price) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '6') {
                this.state.supplychain.methods.sellProductByDistributor(
                    upc,
                    price
                ).send({ from: this.state.account }).once('receipt', function (receipt) {
                    localStorage.setItem('PFSBD'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now for sale by the distributor', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or distributor has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Distributors can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already set for sale, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    purchaseProductByRetailer (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            const balance = result.productPrice;
            if (theState === '7') {
                this.state.supplychain.methods.purchaseProductByRetailer(
                    upc
                ).send({ from: localStorage.getItem('retailerID'), value: balance }).once('receipt', function (receipt) {
                    localStorage.setItem('PPCHBR'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now purchased by the retailer.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or retailer has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Retailers can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already purchased, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    shipProductByDistributor (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '8') {
                this.state.supplychain.methods.shipProductByDistributor(
                    upc
                ).send({ from: localStorage.getItem('distributorID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PSBD'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now shipped by the distributor.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or distributor has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Distributors can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already shipped, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    receiveProductByRetailer (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '9') {
                this.state.supplychain.methods.receiveProductByRetailer(
                    upc
                ).send({ from: localStorage.getItem('retailerID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PRBR'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now received by the retailer.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or retailer has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Retailers can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already received, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    sellProductByRetailer (upc, price) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            if (theState === '10') {
                this.state.supplychain.methods.sellProductByRetailer(
                    upc,
                    price
                ).send({ from: localStorage.getItem('retailerID') }).once('receipt', function (receipt) {
                    localStorage.setItem('PFSBR'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now for sale by the retailer', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                    this.setState({ isOpen: false });
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or retailer has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Retailers can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already set for sale, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    purchaseProductByConsumer (upc) {
        this.setState({ isOpen: true })
        this.state.supplychain.methods.getItemBufferTwo(upc).call((err, result) => {
            const theState = result.itemState;
            const balance = result.productPrice;
            if (theState === '11') {
                this.state.supplychain.methods.purchaseProductByConsumer(
                    upc
                ).send({ from: localStorage.getItem('consumerID'), value: balance }).once('receipt', function (receipt) {
                    localStorage.setItem('PPCHBC'+upc, new Date(Date.now()).toUTCString());
                    toast.success('The product is now purchased by the consumer.', { position: toast.POSITION.TOP_RIGHT, transition: Bounce});
                }).on('error', function (reject) {
                    toast.error('May be no product associated to that Universal Product Code, Or consumer has not been connected yet to MetaMask', { position: toast.POSITION.TOP_RIGHT, transition: Zoom});
                    toast.info('Only Consumers can do that process', { position: toast.POSITION.TOP_RIGHT, transition: Zoom });
                    console.log(reject)
                });
            } else {
                toast.warning('The product already purchased, you can fetch data to verify the traceability of the product', { position: toast.POSITION.TOP_RIGHT, transition: Flip});
            }
        });
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Supplychain.networks[networkId]
        if(networkData) {
            const supplychain = new web3.eth.Contract(Supplychain.abi, networkData.address)
            this.setState({ supplychain })
            this.setState({ isOpen: false })
        } else {
            window.alert('Supplychain contract not deployed to detected network.')
        }
    }

    render() {
        const appJsx = (
            <div>
                <ToastContainer autoClose={10000} style={{ width: "500px" }}/>
                <Navbar account = { this.state.account } />
                <Content
                    createProductByFarmer = { this.createProductByFarmer }
                    account = { this.state.account }
                    sellProductByFarmer = { this.sellProductByFarmer }
                    purchaseProductByDistributor = { this.purchaseProductByDistributor }
                    shipProductByFarmer = { this.shipProductByFarmer }
                    receiveProductByDistributor = { this.receiveProductByDistributor }
                    processProductByDistributor = { this.processProductByDistributor }
                    packageProductByDistributor = { this.packageProductByDistributor }
                    sellProductByDistributor = { this.sellProductByDistributor }
                    purchaseProductByRetailer = { this.purchaseProductByRetailer }
                    shipProductByDistributor = { this.shipProductByDistributor }
                    receiveProductByRetailer = { this.receiveProductByRetailer }
                    sellProductByRetailer = { this.sellProductByRetailer }
                    purchaseProductByConsumer = { this.purchaseProductByConsumer }
                />

            </div>
        )

        // const waitingForWeb3Jsx = (
        //     <div style={{ textAlign: "center", padding: "3em", fontSize: '2rem' }}>
        //         <i className="fas fa-exclamation-triangle text-yellow"/>
        //         <span className="text-uppercase font-weight-bold"> Waiting for web3 ... </span>
        //     </div>
        // )

        return (
            <div>
                { appJsx }
            </div>
        )
    }
}

export default App;
