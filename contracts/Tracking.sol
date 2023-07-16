//SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.17;
import "./AccessControl.sol";

contract Tracking is AccessControl {
    struct StatusData {
        bytes dataValue;
        uint256 timestamp;
        uint256 blockNumber;
        bool closed;
    }
    struct TrackData {
        bytes32 code;
        uint256 index;
        bool closed;
        mapping(uint256 => StatusData) histories;
    }
    mapping(bytes32 => TrackData) private _trackedCodes;

    //
    // Revert Section
    //
    /// @notice Track allowed only with code not closed
    error Tracking__CodeAlreadyClosed(bytes32 code);

    //
    // Constructor Section
    //
    constructor() {
        _owner = msg.sender;
    }

    //
    // External Section
    //
    function InsertTrack(bytes32 code, bytes calldata dataValue, bool closed) external onlyAdmin {
        InsertData(code, dataValue, closed);
    }

    function MultiInsertTrack(
        bytes32[] memory code,
        bytes[] calldata dataValue,
        bool[] calldata closed
    ) external onlyAdmin {
        for (uint i = 0; i < code.length; i++) {
            InsertData(code[i], dataValue[i], closed[i]);
        }
    }

    //
    // External Section
    //
    function InsertData(bytes32 code, bytes calldata dataValue, bool closed) private onlyAdmin {
        TrackData storage trackData = _trackedCodes[code];
        if (trackData.closed) {
            revert Tracking__CodeAlreadyClosed(code);
        }
        StatusData storage statusData = trackData.histories[trackData.index];
        statusData.dataValue = dataValue;
        statusData.timestamp = block.timestamp;
        statusData.blockNumber = block.number;
        statusData.closed = closed;
        trackData.index++;
        trackData.closed = closed;
    }

    //
    // View Section
    //
    function GetCodeTracking(bytes32 code) public view returns (StatusData[] memory) {
        TrackData storage trackData = _trackedCodes[code];
        StatusData[] memory ret = new StatusData[](trackData.index);
        for (uint i = 0; i < trackData.index; i++) {
            ret[i] = trackData.histories[i];
        }
        return ret;
    }
}
