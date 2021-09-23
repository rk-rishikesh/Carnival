// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title ERC1155Token
 * ERC1155Token - ERC1155 contract that has create and mint functionality, and supports useful standards from OpenZeppelin
 */
 
contract ERC1155Token is ERC1155, Ownable{
    
    using SafeMath for uint256;
    
    // Token name
    string public name;
    // Token symbol
    string public symbol;
    
    uint256 private _currentTokenID = 0;
    
    mapping (uint256 => address) public creators;
    
    mapping (uint256 => uint256) public tokenSupply;
    
    constructor( string memory _name, string memory _symbol, string memory _baseURI) ERC1155(_baseURI){
        name = _name;
        symbol = _symbol;
    }
    
    /**
     * @dev Require msg.sender to be the creator of the token id
     */
    modifier creatorOnly(uint256 _id) {
        require(creators[_id] == msg.sender, "ERC1155Token#creatorOnly: ONLY_CREATOR_ALLOWED");
        _;
    }
  
    /**
     * @dev Gets the token name
     * @return string representing the token name
     */
    function getName() public view returns (string memory) {
        return name;
    }
    
    /**
     * @dev Gets the token symbol
     * @return string representing the token symbol
     */
    function getSymbol() public view returns (string memory) {
        return symbol;
    }
  
    function totalSupply(uint256 _id) public view returns (uint256) {
        return tokenSupply[_id];
    }      
    
    /**
     * @dev Will update the base URL of token's URI
     * @param _newBaseMetadataURI New base URL of token's URI
     */
    function setBaseMetadataURI(string memory _newBaseMetadataURI) public onlyOwner {
        _setURI(_newBaseMetadataURI);
    }
    
        /**
     * @dev Creates a new token type and assigns _initialSupply to an address
     * NOTE: remove onlyOwner if you want third parties to create new tokens on your contract (which may change your IDs)
     * @param _initialOwner address of the first owner of the token
     * @param _initialSupply amount to supply the first owner
     * @param _uri URI for this token type
     * @param _data Data to pass if receiver is contract
     * @return The newly created token ID
     */
    function _createNFT(
        address _initialOwner,
        uint256 _initialSupply,
        string calldata _uri,
        bytes memory _data) 
        public returns (uint256) {
        
        uint256 _id = _getNextTokenID();
        _incrementTokenTypeId();
        creators[_id] = msg.sender;
    
        if (bytes(_uri).length > 0) {
          emit URI(_uri, _id);
        }
    
        _mint(_initialOwner, _id, _initialSupply, _data);
        tokenSupply[_id] = _initialSupply;
        return _id;
    }
    
    /**
     * @dev Mints some amount of tokens to an address
     * @param _to          Address of the future owner of the token
     * @param _id          Token ID to mint
     * @param _quantity    Amount of tokens to mint
     * @param _data        Data to pass if receiver is contract
     */
    function mint(
        address _to,
        uint256 _id,
        uint256 _quantity,
        bytes memory _data
      ) public creatorOnly(_id) {
        _mint(_to, _id, _quantity, _data);
        tokenSupply[_id] = tokenSupply[_id].add(_quantity);
      }
      
    /**
     * @dev Mint tokens for each id in _ids
     * @param _to          The address to mint tokens to
     * @param _ids         Array of ids to mint
     * @param _quantities  Array of amounts of tokens to mint per id
     * @param _data        Data to pass if receiver is contract
     */
    function batchMint(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _quantities,
        bytes memory _data
        ) public {
        for (uint256 i = 0; i < _ids.length; i++) {
          uint256 _id = _ids[i];
          require(creators[_id] == msg.sender, "ERC1155Token#batchMint: ONLY_CREATOR_ALLOWED");
          uint256 quantity = _quantities[i];
          tokenSupply[_id] = tokenSupply[_id].add(quantity);
        }
        _mintBatch(_to, _ids, _quantities, _data);
    }
      
    /**
     * @dev Change the creator address for given tokens
     * @param _to   Address of the new creator
     * @param _ids  Array of Token IDs to change creator
     */
    function setCreator(
        address _to,
        uint256[] memory _ids
      ) public {
        require(_to != address(0), "ERC1155Tradable#setCreator: INVALID_ADDRESS.");
        for (uint256 i = 0; i < _ids.length; i++) {
          uint256 id = _ids[i];
          _setCreator(_to, id);
        }
    }
    
    /**
     * @dev Change the creator address for given token
     * @param _to   Address of the new creator
     * @param _id  Token IDs to change creator of
     */
    function _setCreator(address _to, uint256 _id) internal creatorOnly(_id)
    {
        creators[_id] = _to;
    }
  
    /**
     * @dev Returns whether the specified token exists by checking to see if it has a creator
     * @param _id uint256 ID of the token to query the existence of
     * @return bool whether the token exists
     */
    function _exists(
        uint256 _id
    ) internal view returns (bool) {
        return creators[_id] != address(0);
    }
    
    /**
     * @dev calculates the next token ID based on value of _currentTokenID
     * @return uint256 for the next token ID
     */
    function _getNextTokenID() private view returns (uint256) {
        return _currentTokenID.add(1);
    }
    
    /**
     * @dev increments the value of _currentTokenID
     */
    function _incrementTokenTypeId() private  {
        _currentTokenID++;
    }
}

