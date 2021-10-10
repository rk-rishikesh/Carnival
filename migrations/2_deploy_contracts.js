const Carnival = artifacts.require("Carnival");
const SpecialSwag = artifacts.require("SpecialSwag");

module.exports = function(deployer) {
  deployer.deploy(Carnival,"Carnival","CRN", "");
  deployer.deploy(SpecialSwag);
};

