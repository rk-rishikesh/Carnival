// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC1155Token.sol";

contract Carnival is ERC1155Token{
    
    constructor(string memory _name, 
                string memory _symbol,
                string memory _baseURI) 
                ERC1155Token(_name, _symbol, _baseURI){}
                
    uint256 internal streamingRate = 10;
   
    mapping(uint256 => address[]) public subowners;
    mapping(uint256 => mapping(address => uint256)) public shares;
    mapping(uint256 => uint256[]) public relatedNFTs; //tokenNo to array of tokenNos
    mapping(uint256 => uint256) public specialSwag;
    mapping(uint256 => uint256) public swagPrice;

    function setStreamingRate(uint256 rate) public onlyOwner {
        streamingRate = rate;
    }
    
    function getStreamingRate() public view returns (uint256 ){
        return streamingRate;
    }
    
    function uploadVideo(
        address _producer, 
        string calldata _uri) 
        public returns (uint256){
            uint256 _id = _createNFT(_producer, 1, _uri, "");
            return _id;
    }

    function addFractionalOwners(
        uint256 _tokenId, 
        address[] calldata _subowners, 
        uint256[] memory _share) public {
        
        require(creators[_tokenId] == msg.sender, "Carnival#addFractionalOwners: ONLY_CREATOR_ALLOWED");
        require(_subowners.length == _share.length, "Carnival#addFractionalOwners: INVALID_INPUT_SUBOWNERS_OR_SHARE");
        for (uint256 i = 0; i < _subowners.length; i++) {
            subowners[_tokenId].push(_subowners[i]);
            shares[_tokenId][_subowners[i]] = _share[i];
        }
    }
    
    function createSwagNFT(
        uint256 _tokenId, 
        uint256 _quantity,
        uint256 _price, 
        string calldata _uri)
        public returns (uint256){
            require(creators[_tokenId] == msg.sender, "Carnival#createSwagNFT: ONLY_CREATOR_ALLOWED");
            uint256 _id = _createNFT(msg.sender, _quantity, _uri, "");
            relatedNFTs[_tokenId].push(_id);
            swagPrice[_id] = _price;
            return _id;
    }
    
    function createSpecialSwag(
        uint256 _tokenId,
        string calldata _uri)
        public returns (uint256) {
            require(creators[_tokenId] == msg.sender, "Carnival#createSwagNFT: ONLY_CREATOR_ALLOWED");
            uint256 _id = _createNFT(msg.sender, 1, _uri, "");
            specialSwag[_tokenId] = _id;
            return _id;
        }

    //watch video

    //buy swag nft
}
