import React from "react";
import config from "../config.json";

interface SnakeGridProps {
    height: number;
    width: number;
    children: React.ReactNode;
}

const SnakeGrid = ({height, width, children}: SnakeGridProps) => {
    return (
        <div className={"bg-grid relative m-auto h-full"} style={{ height: height * config.cellSize, width: width * config.cellSize }}>
            {/* Grid items go here */}
            {children}
        </div>
    );
}

export default SnakeGrid;