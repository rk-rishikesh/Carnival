const Carnival = artifacts.require("Carnival");

module.exports = function(deployer) {
  deployer.deploy(Carnival,"Carnival","CRN", "");
};

