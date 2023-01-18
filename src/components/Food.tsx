import React from "react";
import config from '../config.json';
import {RoundedBox} from "@react-three/drei";

export interface FoodProps {
    x: number;
    y: number;
}

const Food = (props: FoodProps) =>
    <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.2} position={[props.x, props.y, 0.75]} key={`${props.x}-${props.y}`}>
        <meshStandardMaterial color={"red"}/>
    </RoundedBox>

export default Food;