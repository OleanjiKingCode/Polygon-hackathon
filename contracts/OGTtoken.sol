//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameToken is ERC20("OleanjiGameToken" , "OGT") {


    using Counters for Counters.Counter;
    Counters.Counter public NumOfAllPlayers;

    bool public gameStarted;

    uint public entryFee = 50;


    struct Players {
        string UserName;
        address PlayersAddress;
        uint PlayersId;
        uint MyGames;
        string Datejoined;
        uint TokenOwned;
        uint[] Scores;
        uint HighestScore;
    }



    event PlayerJoined(
        string username,
        address player,
        uint playerId,
        uint noOfGames,
        string dateJoined,
        uint rewardTokensOwned,
        uint[] Scores,
        uint highestScore
    );
    
    event GameEnded(
        uint PlayerId,
        address playersAddress,
        uint tokensEarned,
        uint Score,
    )

    mapping (address => bool) private areyouAPlayer;
    mapping (uint => Players) private IdOfPlayers;
    uint mintToNewPlayers = 130;

    constructor (uint _totalSupply)  {
        uint amount = _totalSupply * 10 ** 18;
       _mint(address(this), amount);
       gameStarted = false;
    }

    

    function NewPlayer(string memory _date, string memory _name) public payable  {
        require(areyouAPlayer[msg.sender] == false, 'you are already a player');

        NumOfAllPlayers.increment();
        uint value_given_to_new_players = mintToNewPlayers * 10 ** 18
        _mint(msg.sender, value_given_to_new_players)
        uint currentplayerId = NumOfAllPlayers.current();
        IdOfPlayers[currentplayerId] = Players (
            _name,
            msg.sender,
            currentplayerId,
            0,
            _date,
            mintToNewPlayers,
            [],
            0
        );

        areyouAPlayer[msg.sender] == true;

        emit PlayerJoined (
             _name,
            msg.sender,
            currentplayerId,
            0,
            _date,
            mintToNewPlayers,
            [],
            0
        );

    }

    function GameEnded ( uint _id, uint score , uint rewardtokens ) public {
      uint AllPlayer =  NumOfAllPlayers.current();
      uint addedrewards;
      for (uint i = 0; i < AllPlayer; i++) {
        if (_id == IdOfPlayers[i+1].PlayersId) {
            uint currentTokens = IdOfPlayers[i+1].TokenOwned;
            addedrewards =  currentTokens + rewardtokens;
            IdOfPlayers[i+1].TokenOwned = addedrewards;
        }
      }

      emit GameEnded (
        _id,
        msg.sender,
        rewardtokens,
        score
      );
    }

    
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}