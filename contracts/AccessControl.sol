//SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.17;

contract AccessControl {
    address internal _owner;

    // int as value is cheaper than boolean:
    mapping(address => uint256) private _admins;

    //
    // Revert Section
    //
    /// @notice Operation reserved to owner
    error Tracking__OnlyOwner(address forbiddenAddress);
    /// @notice Operation reserved to owner or admins
    error Tracking__OnlyOwnerOrAdmin(address forbiddenAddress);

    //
    // Modifier Section
    //
    modifier onlyOwner() {
        if (msg.sender != _owner) revert Tracking__OnlyOwner(msg.sender);
        _;
    }

    modifier onlyAdmin() {
        if (msg.sender != _owner && !IsAdmin(msg.sender))
            revert Tracking__OnlyOwnerOrAdmin(msg.sender);
        _;
    }

    //
    // External Section
    //
    function AddAdmin(address adminAddress) external onlyOwner {
        require(adminAddress != address(0), "Admin cannot be the zero address");
        _admins[adminAddress] = 1;
    }

    function RevokeAdmin(address adminAddress) external onlyOwner {
        delete _admins[adminAddress];
    }

    function TransferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Owner cannot be the zero address");
        _owner = newOwner;
    }

    //
    // View Section
    //
    function GetOwner() external view returns (address) {
        return _owner;
    }

    function IsAdmin(address adminAddress) public view returns (bool) {
        return _admins[adminAddress] == 1;
    }
}
