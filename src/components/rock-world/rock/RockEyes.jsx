import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import React from "react";
import useRockState from "../../../stores/useRockState.js";

export default function RockEyes() {
    const { nodes, materials } = useGLTF('models/eye_10x10x4.glb', false)
    const eyes = useRockState((state) => state.eyes)

    const { positionY, positionZ, offsetX, rotationZ, scale } = useControls(
        'Rock World',
        {
            'Eyes': folder(
                {
                    positionY: { value: 0.7, min: 0, max: 10, step: 0.01 },
                    positionZ: { value: 1.6, min: 0, max: 10, step: 0.01 },
                    offsetX: { value: 0.5, min: 0, max: 10, step: 0.01 },
                    rotationZ: {value: 0, min: -Math.PI, max: Math.PI},
                    scale: { value: 0.6, min: 0.1, max: 10, step: 0.01 },
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
                position={[(eyes === 'ONE' ? 0 : -offsetX), positionY, positionZ]}
                scale={scale}
                rotation-z={rotationZ}
                visible={eyes !== 'NONE'}
            >
                <mesh geometry={nodes.name.geometry} material={materials['Eye Base']} castShadow={true} receiveShadow={true} />
                <mesh geometry={nodes.name_1.geometry} material={materials['Eye Pupil']} castShadow={true} receiveShadow={true} />
            </group>
            <group
                position={[offsetX, positionY, positionZ]}
                scale={scale}
                rotation-z={rotationZ}
                castShadow={true}
                receiveShadow={true}
                visible={eyes === 'TWO'}
            >
                <mesh geometry={nodes.name.geometry} material={materials['Eye Base']} castShadow={true} receiveShadow={true} />
                <mesh geometry={nodes.name_1.geometry} material={materials['Eye Pupil']} castShadow={true} receiveShadow={true} />
            </group>
        </>
    );
}

useGLTF.preload('models/eye_10x10x4.glb', false)
