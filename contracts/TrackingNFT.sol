//SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.17;

// Import delle librerie necessarie
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AccessControl.sol";

// Dichiarazione del contratto
contract NFTFactory is ERC721, AccessControl {
    // Struttura per memorizzare le informazioni del NFT
    struct NFT {
        string name;
        string uri;
    }

    // Array per tenere traccia di tutti i NFT creati
    NFT[] public nfts;

    // Mapping per associare il token ID a un particolare NFT
    mapping(uint256 => uint256) public tokenIdToNftId;

    // Evento emesso quando un nuovo NFT viene creato
    event NFTCreated(uint256 indexed tokenId, uint256 indexed nftId);

    // Costruttore del contratto
    constructor() ERC721("NFTFactory", "NFTF") {}

    // Funzione per creare un nuovo tipo di NFT
    function createNFT(string memory _name, string memory _uri) external onlyOwner {
        NFT memory newNFT = NFT(_name, _uri);
        uint256 nftId = nfts.length;
        nfts.push(newNFT);

        uint256 tokenId = nftId + 1;
        tokenIdToNftId[tokenId] = nftId;

        _safeMint(msg.sender, tokenId);
        emit NFTCreated(tokenId, nftId);
    }

    // Override delle funzioni base del contratto ERC721
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://example.com/nfts/";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        uint256 nftId = tokenIdToNftId[tokenId];
        string memory uri = nfts[nftId].uri;
        string memory baseUri = _baseURI();
        return bytes(baseUri).length > 0 ? string(abi.encodePacked(baseUri, uri)) : uri;
    }
}
