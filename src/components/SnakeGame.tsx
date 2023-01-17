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

const SnakeGame = () => {
    const [gameState, setGameState] = useState({
        snake: {
            members: config.baseSnakeMembers,
            direction: config.baseDirection,
        },
        food: config.baseFood
    });


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
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

            setGameState({
                ...gameState,
                snake: {
                    ...gameState.snake,
                    members: newSnakeMembers
                }
            });
        }, config.gameSpeed);
        return () => clearInterval(interval);
    });

    return (<>
            <h1 className={"text-center text-4xl font-bold"}>Snake Game</h1>
            <SnakeGrid height={config.boardHeight} width={config.boardWidth}>
                <Snake members={gameState.snake.members}/>
                <Food x={gameState.food.x} y={gameState.food.y}/>
            </SnakeGrid>
    </>
    );
};

export default SnakeGame;
