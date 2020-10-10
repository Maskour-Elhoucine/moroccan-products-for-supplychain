const Supplychain = artifacts.require('Supplychain.sol')
//let catchRevert = require('./Exceptions').catchRevert
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Supplychain', (accounts)=> {
    let supplychain
    const owner = accounts[0]
    const farmerId = accounts[1]
    const farmName = "Taliouin 15S"
    const farmInformation = "More about the Farm"
    const farmLatitude = "-38.239770"
    const farmLongitude = "144.341490"
    const description = "Safran01 is a version 1 from the fram X"
    const price =  web3.utils.toWei('1', 'ether')
    const temperature = 20
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    console.log("Ganache accounts used are: ")
    console.log("Contract Owner Or Admin: accounts[0] => ", accounts[0])
    console.log("Farmer: accounts[1] => ", accounts[1])
    console.log("Distributor: accounts[2] => ", accounts[2])
    console.log("Retailer: accounts[3] => ", accounts[3])
    console.log("Consumer: accounts[4] => ", accounts[4])

    before(async () => {
        supplychain = await Supplychain.deployed()
    })

    describe('Deployment', async () => {
        it('Check if the contract deployed successfully', async () => {
            const address = await supplychain.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('Check if the contract has a name and owner', async () => {
            const name = await supplychain.name()
            const ownerId = await supplychain.admin()

            assert.equal(name, 'Supplychain Smart Contract')
            assert.equal(ownerId, owner)
        })
    })

    describe('Products', async () => {
        let result, productCount

        before(async () => {
            result = await supplychain.createProduct(description, price, temperature, farmerId, farmLatitude, farmLongitude, { from: owner })
            productCount = await supplychain.productCount()
        })

        it('Testing smart contract function createProduct() that allows a the owner to create a product', async () => {
            assert.equal(productCount, 1)
            // Success
            const event = result.logs[0].args
            assert.equal(event.productCount.toNumber(), productCount.toNumber(), 'Product Count is correct')
            assert.equal(event.description, 'Safran01 is a version 1 from the fram X', 'Description is correct')
            assert.equal(event.price, price, 'Price is correct')
            assert.equal(event.temperature.toNumber(), temperature, 'Temperature is correct')
            assert.equal(event.farmerId, farmerId, 'Address of farmer is correct')
            assert.equal(event.farmLatitude, farmLatitude, 'Farm latitude is correct')
            assert.equal(event.farmLongitude, farmLongitude, 'Farm longitude is correct')
            assert.equal(event.owner, owner, 'owner is correct')

            // FAILURE: Product must have a Description
            await await supplychain.createProduct('', price, temperature, farmerId, farmLatitude, farmLongitude, {from: owner}).should.be.fulfilled;

            // FAILURE: Product must have a Price
            await supplychain.createProduct(description, web3.utils.toWei('0', 'Ether'), temperature, farmerId, farmLatitude, farmLongitude, {from: owner}).should.be.rejected;

            // FAILURE: Product must have a Temperature
            await supplychain.createProduct(description, price, 0, farmerId, farmLatitude, farmLongitude, {from: owner}).should.be.rejected;

            // FAILURE: Product must have a Farmer ID
            await supplychain.createProduct(description, price, temperature, emptyAddress, farmLatitude, farmLongitude, {from: owner}).should.be.rejected;

            // FAILURE: Product must have a Farm Latitude
            await supplychain.createProduct(description, price, temperature, farmerId, '', farmLongitude, {from: owner}).should.be.fulfilled;

            // FAILURE: Product must have a Farm Longitude
            await await supplychain.createProduct(description, price, temperature, farmerId, farmLongitude, '', { from: owner }).should.be.fulfilled;
        })

        it('Lists all of products', async () => {
            const product = await supplychain.products(productCount)
            //assert.equal(product.productCount.toNumber(), productCount.toNumber(), 'Product Count is correct')
            assert.equal(product.description, 'Safran01 is a version 1 from the fram X', 'Description is correct')
            assert.equal(product.price, price, 'Price is correct')
            assert.equal(product.temperature.toNumber(), temperature, 'Temperature is correct')
            assert.equal(product.farmerId, farmerId, 'Address of farmer is correct')
            assert.equal(product.farmLatitude, farmLatitude, 'Farm latitude is correct')
            assert.equal(product.farmLongitude, farmLongitude, 'Farm longitude is correct')
            assert.equal(product.owner, owner, 'owner is correct')

        })
    })

})
