import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import RoccoText from "./RoccoText.jsx";
import React from "react";

export default function Case() {
    const { nodes} = useGLTF('case-transformed.glb')

    const { caseColor, buttonColor, roughness, metalness } = useControls(
        'World',
        {
            'Case': folder(
                {
                    caseColor: {value: '#be3b37', label: 'case color'},
                    buttonColor: {value: '#e2d9d9', label: 'button color'},
                    roughness: {value: 0.0, label: 'roughness', min: 0, max: 10, step: 0.1},
                    metalness: {value: 0.45, label: 'metalness', min: 0, max: 10, step: 0.1},
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
        <group dispose={null}>
            <mesh
                geometry={nodes.Case003.geometry}
                castShadow={true}
                receiveShadow={true}
            >
                <meshStandardMaterial
                    roughness={roughness}
                    metalness={metalness}
                    color={caseColor}
                />
                <RoccoText/>
            </mesh>
            <mesh
                geometry={nodes.Button.geometry}
                castShadow={true}
                receiveShadow={true}
            >
                <meshStandardMaterial
                    roughness={roughness}
                    metalness={metalness}
                    color={buttonColor}
                />
            </mesh>

        </group>
    );
}

useGLTF.preload('case-transformed.glb')