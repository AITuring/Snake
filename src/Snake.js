import React, { useState, useEffect, useRef } from "react";
import "./snake.css";

const Snake = () => {
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 37:
        setDirection("LEFT");
        break;
      case 38:
        setDirection("UP");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 40:
        setDirection("DOWN");
        break;
      default:
        break;
    }
  };

  const getRandomFood = () => {
    const x = Math.floor(Math.random() * 40);
    const y = Math.floor(Math.random() * 40);
    return { x, y };
  };

  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(getRandomFood());
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case "LEFT":
        head.x--;
        break;
      case "UP":
        head.y--;
        break;
      case "RIGHT":
        head.x++;
        break;
      case "DOWN":
        head.y++;
        break;
      default:
        break;
    }
    const newSnake = [head, ...snake.slice(0, -1)];
    setSnake(newSnake);

    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomFood());
      setScore(score + 1);
      setSpeed(Math.max(50, speed - 10));
      setSnake([...newSnake, snake[snake.length - 1]]);
    }

    if (
      head.x < 0 ||
      head.x >= 40 ||
      head.y < 0 ||
      head.y >= 40 ||
      newSnake.slice(1).some((cell) => cell.x === head.x && cell.y === head.y)
    ) {
      setGameOver(true);
    }
  };

  useInterval(() => {
    moveSnake();
  }, speed);

  return (
    <div className="snake-game">
      <div className="game-board">
        {/* 绘制蛇身 */}
        {snake.map((cell, index) => (
          <div
            key={index}
            className="snake-cell"
            style={{ left: `${cell.x * 10}%`, top: `${cell.y * 10}%` }}
          ></div>
        ))}
        {/* 绘制食物 */}
        <div
          className="food-cell"
          style={{ left: `${food.x * 10}%`, top: `${food.y * 10}%` }}
        ></div>
      </div>
      {/* 显示分数 */}
      <div className="score">Score: {score}</div>
      {/* 显示游戏结束 */}
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default Snake;
