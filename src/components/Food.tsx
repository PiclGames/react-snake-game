import React from "react";
import config from '../config.json';

export interface FoodProps {
    x: number;
    y: number;
}

const Food = (props: FoodProps) =>
    <div
        className={"absolute bg-red-500 border-black border"}
        style={{
            width: config.cellSize,
            height: config.cellSize,
            top: props.y * config.cellSize,
            left: props.x * config.cellSize,
        }}
    />

export default Food;