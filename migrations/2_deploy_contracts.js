var FarmerRole = artifacts.require("./FarmerRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var RetailerRole = artifacts.require("./RetailerRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var Supplychain = artifacts.require("./Supplychain.sol");

module.exports = function(deployer) {
    deployer.deploy(FarmerRole);
    deployer.deploy(DistributorRole);
    deployer.deploy(RetailerRole);
    deployer.deploy(ConsumerRole);
    deployer.deploy(Supplychain);
};
