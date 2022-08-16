import { BigInt } from "@graphprotocol/graph-ts"
import {
  GameToken,
  Approval,
  GameEnded,
  PlayerJoined,
  Transfer
} from "../generated/GameToken/GameToken"
import { Player } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())

  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())

  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }

  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner
  // entity.spender = event.params.spender

  // // Entities can be written to the store with `.save()`
  // entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.GetAplayerdetails(...)
  // - contract.NumOfAllPlayers(...)
  // - contract.PeopleWhoSpinned(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.areYouAPlayer(...)
  // - contract.balanceOf(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.entryFee(...)
  // - contract.gameStarted(...)
  // - contract.increaseAllowance(...)
  // - contract.lastTimeStamp(...)
  // - contract.name(...)
  // - contract.s_randomLuck(...)
  // - contract.s_requestId(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.winner(...)
}



export function handlePlayerJoined(event: PlayerJoined): void {
  let entity = Player.load(event.params.playerId.toString())
  if (!entity) {
    entity = new Player(event.params.playerId.toString())

  }

  entity.uaername = event.params.username;
  entity.Date = event.params.dateJoined;
  entity.TokensOwned = event.params.rewardTokensOwned;
  entity.owner = event.params.player;
  entity.No_Of_Games = event.params.noOfGames;
  entity.Games =[];
  entity.Highest = event.params.highestScore;

  entity.save()
}

export function handleGameEnded(event: GameEnded): void {
  let entity = Player.load(event.params.PlayerId.toString());
  if(!entity) {
    return ;
  }
  entity.TokensOwned = event.params.tokensEarned;
  let scores = entity.Games;
  if(!scores) {
    return ;
  }
  scores.push(event.params.Score)
  entity.Games = scores;

  let array = entity.Games;
  let largest = entity.Highest;

  if(!array) {
    return ;
  }

  if(!largest) {
    return ;
  }

  for (let i=0; i<array.length; i++){
      if (array[i] > largest) {
          largest=array[i];
      }
  }
  entity.Highest = largest;
  entity.save()
}


export function handleTransfer(event: Transfer): void {}
