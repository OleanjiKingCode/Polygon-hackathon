import React, {useEffect, useRef, useState} from 'react'
import {BallMovement} from "./BallMovement";
import WallCollision from "./WallCollision"
import Paddle from "./Paddle"
import data from "./data"
import Brick from './Brick';
import BrickCollision from './BrickCollision';
import PaddleHit from "./PaddleHit"
import PlayerStats from './PlayerStats';
import AllBroken from './AllBroken';
import ResetBall from "./ResetBall"
import swal from 'sweetalert';
import nossr from '../nossr'

let bricks = [];
let {ballObj, paddleProps, brickObj, player} = data;

function Runner() {
const canvasRef = useRef(null);
const [width, setWidth] = useState(0)
const [height, setHeight] = useState(0)

const game = () =>{
  const render = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    paddleProps.y = canvas.height - 30;

    // Assign Bricks
    let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

    if (newBrickSet && newBrickSet.length > 0) {
      bricks = newBrickSet;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    PlayerStats(ctx, player, canvas);

    // Display Bricks
    bricks.map((brick) => {
      return brick.draw(ctx);
    });

    // Handle Ball Movement
    BallMovement(ctx, ballObj);

    // Check all broken
    AllBroken(bricks, player, canvas, ballObj);

    if (player.lives === 0) {
      swal("Game Over", "Please return home", "warning")
      .then(() => {
        swal('Return home to play again', "", "warning");
      });

      player.lives = 5;
      player.level = 1;
      player.score = 0;
      ResetBall(ballObj, canvas, paddleProps);
      bricks.length = 0;
    }
    // Ball and Wall Collision
    WallCollision(ballObj, canvas, player, paddleProps);

    // Brick Collision
    let brickCollision;

    for (let i = 0; i < bricks.length; i++) {
      brickCollision = BrickCollision(ballObj, bricks[i]);

      if (brickCollision.hit && !bricks[i].broke) {
        // console.log(brickCollision);
        if (brickCollision.axis === "X") {
          ballObj.dx *= -1;
          bricks[i].broke = true;
        } else if (brickCollision.axis === "Y") {
          ballObj.dy *= -1;
          bricks[i].broke = true;
        }
        player.score += 10;
      }
    }
    Paddle(ctx, canvas, paddleProps);

    // Paddle + Ball Collision
    PaddleHit(ballObj, paddleProps);

    requestAnimationFrame(render);
  };
  render();
}

useEffect(() => {
  game();
},[]);

  return (
    <>
    <nossr>
      <div>
        <canvas onMouseMove={(event) => paddleProps.x = event.clientX - paddleProps.width / 2} height={height} width={width} ref={canvasRef}></canvas>
      </div>
    </nossr>
    </>
  )
}

export default Runner