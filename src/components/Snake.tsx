import React from "react"
import config from "../config.json";
import {RoundedBox} from "@react-three/drei";

interface SnakeMember {
    x: number
    y: number
}

export interface SnakeProps {
    members: SnakeMember[],
}

export default function Snake(props: SnakeProps) {
    return (<>
            {props.members.map((member: SnakeMember, index: number) => (
                <RoundedBox args={[1, 1, 1]} radius={0.1} position={[member.x, member.y, 1.5]} key={`${member.x}-${member.y}`}>
                    <meshStandardMaterial color={index === 0 ? "blue" : "darkblue"}/>
                </RoundedBox>
            ))}
    </>
    )
}