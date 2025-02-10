import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import RoccoText from "./RoccoText.jsx";
import React from "react";
import * as THREE from "three";

const buttonMaterial = new THREE.MeshStandardMaterial({
    color: '#e2d9d9',
    roughness: 0.0,
    metalness: 0.45
})

export default function Case() {
    const { nodes} = useGLTF('case.glb', false)

    const { caseColor, buttonColor, roughness, metalness } = useControls(
        'World',
        {
            'Case': folder(
                {
                    caseColor: {value: '#be3b37', label: 'case color'},
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
            <mesh castShadow={true} receiveShadow={true} geometry={nodes.Center_Button.geometry} material={buttonMaterial}/>
            <mesh castShadow={true} receiveShadow={true} geometry={nodes.Down_Button.geometry} material={buttonMaterial}/>
            <mesh castShadow={true} receiveShadow={true} geometry={nodes.Left_Button.geometry} material={buttonMaterial}/>
            <mesh castShadow={true} receiveShadow={true} geometry={nodes.Right_Button.geometry} material={buttonMaterial}/>
            <mesh castShadow={true} receiveShadow={true} geometry={nodes.Up_Button.geometry} material={buttonMaterial}/>
        </group>
    );
}

useGLTF.preload('case.glb', false)