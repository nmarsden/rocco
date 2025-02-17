import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import React from "react";
import useRockState from "../../../stores/useRockState.js";

export default function RockMouth() {
    const model = useGLTF('models/mouth.glb', false)
    const mouth = useRockState((state) => state.mouth)

    const { color, positionY, positionZ, rotationY, scale } = useControls(
        'Rock World',
        {
            'Mouth': folder(
                {
                    color: {value: '#b44141', label: 'color'},
                    positionY: { value: -0.3, min: -2, max: 10, step: 0.01 },
                    positionZ: { value: 1.74, min: 0, max: 10, step: 0.01 },
                    scale: { value: 0.3, min: 0.1, max: 10, step: 0.1 },
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
            position-y={positionY}
            position-z={positionZ}
            scale={(mouth === 'LARGE' ? scale : scale * 0.5)}
            geometry={model.scene.children[0].geometry}
            castShadow={true}
            receiveShadow={true}
            visible={mouth !== 'NONE'}
        >
            <meshStandardMaterial color={color}/>
        </mesh>
    );
}

useGLTF.preload('models/mouth.glb', false)
