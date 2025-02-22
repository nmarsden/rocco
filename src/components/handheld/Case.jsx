import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import RoccoText from "./RoccoText.jsx";
import ButtonText from "./ButtonText.jsx";
import ButtonArrow from "./ButtonArrow.jsx";
import {useCallback} from "react";
import * as THREE from "three";
import useRockState from "../../stores/useRockState.js";

const buttonMaterial = new THREE.MeshStandardMaterial({
    color: '#e2d9d9',
    roughness: 0.0,
    metalness: 0.45
})

export default function Case() {
    const { nodes} = useGLTF('models/case.glb', false)
    const toggleMode = useRockState((state) => state.toggleMode)
    const selectMenuItem = useRockState((state) => state.selectMenuItem)
    const previousMenuItem = useRockState((state) => state.previousMenuItem)
    const nextMenuItem = useRockState((state) => state.nextMenuItem)
    const unselectMenuItem = useRockState((state) => state.unselectMenuItem)

    const buttonClicked = useCallback((e, fn) => {
        return () => {
            if (e.object.name === 'ButtonText' || e.object.name === 'ButtonArrow') return;
            fn()
        }
    })

    const { caseColor, buttonColor, roughness, metalness } = useControls(
        'World',
        {
            'Case': folder(
                {
                    caseColor: { value: '#be3b37', label: 'case color' },
                    buttonColor: { value: '#e2d9d9', label: 'button color' },
                    roughness: { value: 0.0, label: 'roughness', min: 0, max: 10, step: 0.1 },
                    metalness: { value: 0.45, label: 'metalness', min: 0, max: 10, step: 0.1 },
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
                geometry={nodes.Case004.geometry}
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
            <mesh castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Up_Button001.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, toggleMode)()}
            >
                <ButtonText position={[0, -2.2, 1.17]} text={'MODE'}/>
            </mesh>
            <mesh castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Center_Button001.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, selectMenuItem)()}
            >
                <ButtonText position={[0, -4.35, 1.17]} text={'SELECT'}/>
            </mesh>
            <mesh castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Down_Button001.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, unselectMenuItem)()}
            >
                <ButtonText position={[0, -6.6, 1.17]} text={'BACK'}/>
            </mesh>
            <mesh castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Left_Button001.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, previousMenuItem)()}
            >
                <meshStandardMaterial
                    roughness={roughness}
                    metalness={metalness}
                    color={buttonColor}
                />
                <ButtonArrow position={[-2.2, -4.35, 1.0]} rotationZ={Math.PI}/>
            </mesh>
            <mesh castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Right_Button001.geometry}
                  onClick={(e) => buttonClicked(e, nextMenuItem)()}
            >
                <meshStandardMaterial
                    roughness={roughness}
                    metalness={metalness}
                    color={buttonColor}
                />
                <ButtonArrow position={[2.2, -4.35, 1.0]}/>
            </mesh>
        </group>
    );
}

useGLTF.preload('models/case.glb', false)