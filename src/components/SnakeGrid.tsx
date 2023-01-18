import React from "react";
import {PerspectiveCamera, RoundedBox} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

interface SnakeGridProps {
    height: number;
    width: number;
    children: React.ReactNode;
}

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

const SnakeGrid = ({height, width, children}: SnakeGridProps) => {

    return (
        <div className={"h-5/6 m-auto w-5/6"}>
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    position={[width/2, -width/2, width/2]}
                    fov={75}
                    rotation={[deg2rad(60), 0, 0]}
                    zoom={2}
                />

                <ambientLight intensity={0.5}/>
                <pointLight position={[width/2, height/2, 20]}/>

                {/* all meshes for squares */}
                <group>
                    {[...Array(height)].map((_, y) => (
                        [...Array(width)].map((_, x) => (
                            <RoundedBox args={[1, 1, 1]} radius={0.1} position={[x, y, 0]} key={`${x}-${y}`}>
                                <meshStandardMaterial color={"green"}/>
                            </RoundedBox>
                        ))
                    ))}
                </group>

                <group>
                    {children}
                </group>
            </Canvas>
        </div>
    );
}

export default SnakeGrid;