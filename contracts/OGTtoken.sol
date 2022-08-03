//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error UpkeepNotNeeded();

contract GameToken is ERC20("OleanjiGameToken" , "OGT"), VRFConsumerBaseV2 {


    using Counters for Counters.Counter;
    Counters.Counter public NumOfAllPlayers;

    bool public gameStarted;

    uint public entryFee = 50;

    uint spinBoardPrice = 200;

    uint gamePlayPrice = 60;

    uint no_of_items_on_board = 0;
    uint public immutable interval;

    struct Players {
        string UserName;
        address PlayersAddress;
        uint PlayersId;
        uint MyGames;
        string Datejoined;
        uint TokenOwned;
        uint[] Scores;
        uint HighestScore;
        bool spinning;
        uint lastSpinningTime;
    }

    address[] public PeopleWhoSpinned;

    event PlayerJoined(
        string username,
        address player,
        uint playerId,
        uint noOfGames,
        string dateJoined,
        uint rewardTokensOwned,
        uint[] Scores,
        uint highestScore,
       bool spinning,
        uint lastSpinningTime
    );
    
    event GameEnded(
        uint PlayerId,
        address playersAddress,
        uint tokensEarned,
        uint Score
    );

    mapping (address => bool) private areyouAPlayer;
     mapping (address => bool) private Spinned;
    mapping (uint => Players) private IdOfPlayers;
    mapping (address => uint) private AddressOfPlayers;
    uint mintToNewPlayers = 130;

     VRFCoordinatorV2Interface COORDINATOR;


    uint64 s_subscriptionId;


    address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;


    bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

    uint32 callbackGasLimit = 300000;

    
    uint16 requestConfirmations = 3;

    uint32 numWords =  1;

    uint256 public s_randomLuck;
    address public winner;
    uint256 public s_requestId;
    address s_owner;


    constructor (
        uint _totalSupply,
        uint64 subscriptionId,
        uint items_on_board,
        uint _interval) 
        VRFConsumerBaseV2(vrfCoordinator) 
    {
        no_of_items_on_board = items_on_board;
        uint amount = _totalSupply * 10 ** 18;
        _mint(address(this), amount);
        gameStarted = false;
        interval = _interval;
        s_subscriptionId = subscriptionId;
    }

    

    function NewPlayer(string memory _date, string memory _name) public payable  {
        require(areyouAPlayer[msg.sender] == false, 'you are already a player');

        NumOfAllPlayers.increment();
        uint value_given_to_new_players = mintToNewPlayers * 10 ** 18;
        _mint(msg.sender, value_given_to_new_players);
        uint[] memory _scores = new uint[] (0);
        uint currentplayerId = NumOfAllPlayers.current();
        IdOfPlayers[currentplayerId] = Players (
            _name,
            msg.sender,
            currentplayerId,
            0,
            _date,
            mintToNewPlayers,
            _scores,
            0,
            false,
            block.timestamp
        );
        AddressOfPlayers[msg.sender] = currentplayerId;
        
        areyouAPlayer[msg.sender] == true;

        emit PlayerJoined (
             _name,
            msg.sender,
            currentplayerId,
            0,
            _date,
            mintToNewPlayers,
           _scores,
            0,
            false,
            block.timestamp
        );

    }

    function gameEnded ( uint _id, uint score , uint rewardtokens ) public {
      uint AllPlayer =  NumOfAllPlayers.current();
      uint addedrewards;
      for (uint i = 0; i < AllPlayer; i++) {
        if (_id == IdOfPlayers[i+1].PlayersId) {
            uint currentTokens = IdOfPlayers[i+1].TokenOwned;
            addedrewards =  currentTokens + rewardtokens;
            IdOfPlayers[i+1].TokenOwned = addedrewards;
        }
      }
      transferFrom(address(this), msg.sender ,rewardtokens );
      emit GameEnded (
        _id,
        msg.sender,
        rewardtokens,
        score
      );
    }

    function SpinBoard(uint pricePaid) internal  {
        require(pricePaid >= spinBoardPrice, "The price for the spin board is not enough" );
        require(areyouAPlayer[msg.sender] == true, 'you are not a player');
        Spinned[msg.sender] = true;
        uint AllPlayer =  NumOfAllPlayers.current();
        for (uint i = 0; i < AllPlayer; i++) {
            if (msg.sender == IdOfPlayers[i+1].PlayersAddress) {
                IdOfPlayers[i+1].spinning = true;
            }
        }
        
        PeopleWhoSpinned.push(msg.sender);

    }


    function checkUpkeep( 
        bytes memory /* checkData */
        )public
          
        returns (bool upkeepNeeded, bytes memory /* performData */) {
        
        for (uint i = 0; i < PeopleWhoSpinned.length; i++) {
            address currentAddress = PeopleWhoSpinned[i];

            bool isAMember = areyouAPlayer[currentAddress];
            bool heSpinned =  Spinned[currentAddress];
            uint _id = AddressOfPlayers[currentAddress];
            uint time = IdOfPlayers[_id].lastSpinningTime;
            bool lastTime = ((block.timestamp - time ) > interval);
            bool PlayerSpin = IdOfPlayers[_id].spinning;
            upkeepNeeded = (isAMember && heSpinned && PlayerSpin && lastTime );
            if(upkeepNeeded) {
                areyouAPlayer[currentAddress] = false;

            }
        }
        return (upkeepNeeded, "0x0");
      
    }



    function performUpkeep(bytes calldata /* performData */) external {

       (bool upkeepNeeded, ) = checkUpkeep("");
        if(!upkeepNeeded) {
            revert UpkeepNotNeeded();
        }
        s_requestId = COORDINATOR.requestRandomWords(
        keyHash,
        s_subscriptionId,
        requestConfirmations,
        callbackGasLimit,
        numWords
        );
    }

    function fulfillRandomWords(
    uint256, /* requestId */
    uint256[] memory randomWords)
     internal override {

    s_randomLuck = (randomWords[0] % no_of_items_on_board) + 1;
    ResetApplication();
  }
    function remove(uint index) public{
        PeopleWhoSpinned[index] = PeopleWhoSpinned[PeopleWhoSpinned.length - 1];
        PeopleWhoSpinned.pop();
    }

    
  function ResetApplication () public {
    for (uint i = 0; i < PeopleWhoSpinned.length; i++) {
        address currentAddress = PeopleWhoSpinned[i];
        if(areyouAPlayer[currentAddress] == false && Spinned[currentAddress] == true  ) {
            uint _id = AddressOfPlayers[currentAddress];
            IdOfPlayers[_id].lastSpinningTime = block.timestamp;
            IdOfPlayers[_id].spinning = false;
            Spinned[currentAddress] = false;
            remove(i);
        }
    }
  }

    
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}