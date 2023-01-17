import React, {useEffect, useState} from 'react';
import Snake from './Snake';
import Food from './Food';
import config from '../config.json';
import SnakeGrid from "./SnakeGrid";

export enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
}

const initialGameState = {
    isRunning: true,
    isLost: false,
    score: 0,
    snake: {
        members: config.baseSnakeMembers,
        direction: config.baseDirection,
    },
    food: config.baseFood
}

const SnakeGame = () => {
    const [gameState, setGameState] = useState(initialGameState);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'Space':
                    setGameState(initialGameState);
                    break;
                case 'KeyP':
                    setGameState(state => ({...state, isRunning: !state.isRunning}));
                    break;
                case 'ArrowUp':
                    setGameState(state => ({
                        ...state,
                        snake: {
                            ...state.snake,
                            direction: Direction.Up
                        }
                    }));
                    break;
                case 'ArrowDown':
                    setGameState(state => ({
                        ...state,
                        snake: {
                            ...state.snake,
                            direction: Direction.Down
                        }
                    }));
                    break;
                case 'ArrowLeft':
                    setGameState(state => ({
                        ...state,
                        snake: {
                            ...state.snake,
                            direction: Direction.Left
                        }
                    }));
                    break;
                case 'ArrowRight':
                    setGameState(state => ({
                        ...state,
                        snake: {
                            ...state.snake,
                            direction: Direction.Right
                        }
                    }));
                    break;
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    /* game main loop */
    useEffect(() => {
        if(!gameState.isRunning || gameState.isLost) return;
        const interval = setInterval(() => {
            const newSnakeMembers = [...gameState.snake.members];
            const newHead = {...newSnakeMembers[0]};

            switch (gameState.snake.direction) {
                case Direction.Up:
                    newHead.y -= 1;
                    break;
                case Direction.Down:
                    newHead.y += 1;
                    break;
                case Direction.Left:
                    newHead.x -= 1;
                    break;
                case Direction.Right:
                    newHead.x += 1;
                    break;
            }

            newSnakeMembers.unshift(newHead);
            newSnakeMembers.pop();

            /* check if snake is colliding with borders */
            if (newHead.x < 0 || newHead.x >= config.boardWidth || newHead.y < 0 || newHead.y >= config.boardHeight) {
                setGameState(state => ({...state, isLost: true}));
                return;
            }

            /* check if snake is colliding with itself */
            if (newSnakeMembers.some((member, index) => index !== 0 && member.x === newHead.x && member.y === newHead.y)) {
                setGameState(state => ({...state, isLost: true}));
                return;
            }

            /* check if snake is colliding with food */
            if (newHead.x === gameState.food.x && newHead.y === gameState.food.y) {
                newSnakeMembers.push({...newSnakeMembers[newSnakeMembers.length - 1]});
                setGameState(state => ({
                    ...state,
                    food: {
                        x: Math.floor(Math.random() * config.boardWidth),
                        y: Math.floor(Math.random() * config.boardHeight)
                    },
                    score: state.score + 1
                }));
            }

            setGameState(state => ({
                ...state,
                snake: {
                    ...state.snake,
                    members: newSnakeMembers
                }
            }));
        }, config.gameSpeed);
        return () => clearInterval(interval);
    });

    return (<>
            <h1 className={"text-center text-4xl font-bold"}>Snake Game</h1>
            {gameState.isLost && <h2 className={"text-center text-2xl font-bold"}>You lost!</h2>}
            {!gameState.isRunning && <h2 className={"text-center text-2xl font-bold"}>Game paused!</h2>}
            <h2 className={"text-center text-2xl font-bold"}>Score: {gameState.score}</h2>
            <SnakeGrid height={config.boardHeight} width={config.boardWidth}>
                <Snake members={gameState.snake.members}/>
                <Food x={gameState.food.x} y={gameState.food.y}/>
            </SnakeGrid>
    </>
    );
};

export default SnakeGame;
