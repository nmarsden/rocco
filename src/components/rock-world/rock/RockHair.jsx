import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import React from "react";
import useRockState from "../../../stores/useRockState.js";

export default function RockHair() {
    const model = useGLTF('models/hair_10x5x10.glb', false)
    const hair = useRockState((state) => state.hair)

    const { color, positionY, positionZ, rotationY, scale } = useControls(
        'Rock World',
        {
            'Hair': folder(
                {
                    color: {value: '#d18126', label: 'color'},
                    positionY: { value: 1.75, min: 0, max: 10, step: 0.01 },
                    positionZ: { value: 0.2, min: 0, max: 10, step: 0.1 },
                    rotationY: {value: -1.6, min: -Math.PI, max: Math.PI},
                    scale: { value: 0.4, min: 0.1, max: 10, step: 0.1 },
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
        <mesh
            rotation-y={rotationY}
            position-y={positionY}
            position-z={positionZ}
            scale={(hair === 'LARGE' ? scale : scale * 0.5)}
            geometry={model.scene.children[0].geometry}
            castShadow={true}
            receiveShadow={true}
            visible={hair !== 'NONE'}
        >
            <meshStandardMaterial color={color}/>
        </mesh>
    );
}

useGLTF.preload('models/hair_10x5x10.glb', false)
