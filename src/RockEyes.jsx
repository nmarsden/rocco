import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import React from "react";

export default function RockEyes() {
    const { nodes, materials } = useGLTF('eye_10x10x4.glb', false)

    const { positionY, positionZ, offsetX, rotationZ, scale } = useControls(
        'Rock World',
        {
            'Eyes': folder(
                {
                    positionY: { value: 0.7, min: 0, max: 10, step: 0.1 },
                    positionZ: { value: 1.9, min: 0, max: 10, step: 0.1 },
                    offsetX: { value: 0.5, min: 0, max: 10, step: 0.1 },
                    rotationZ: {value: 0, min: -Math.PI, max: Math.PI},
                    scale: { value: 0.6, min: 0.1, max: 10, step: 0.1 },
                },
                {
                    collapsed: true
                }
            )
        },
        {
            collapsed: true
        }
    );

    return (
        <>
            <group
                position={[-offsetX, positionY, positionZ]}
                scale={scale}
                rotation-z={rotationZ}
                castShadow={true}
                receiveShadow={true}
            >
                <mesh geometry={nodes.name.geometry} material={materials['Eye Base']}/>
                <mesh geometry={nodes.name_1.geometry} material={materials['Eye Pupil']}/>
            </group>
            <group
                position={[offsetX, positionY, positionZ]}
                scale={scale}
                rotation-z={rotationZ}
                castShadow={true}
                receiveShadow={true}
            >
                <mesh geometry={nodes.name.geometry} material={materials['Eye Base']}/>
                <mesh geometry={nodes.name_1.geometry} material={materials['Eye Pupil']}/>
            </group>
        </>
    );
}

useGLTF.preload('eye_10x10x4.glb', false)
