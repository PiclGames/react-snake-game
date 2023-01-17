import React from "react"
import config from "../config.json";

interface SnakeMember {
    x: number
    y: number
}

export interface SnakeProps {
    members: SnakeMember[],
}

export default function Snake(props: SnakeProps) {
    return (
        <div>
        {props.members.map((member: SnakeMember, index: number) => (
            <div
                className="absolute bg-blue-700 border-black border"
            key={index}
            style={{
                width: config.cellSize,
                height: config.cellSize,
                top: member.y * config.cellSize,
                left: member.x * config.cellSize,
            }}
            />
        ))}
        </div>
    )
}