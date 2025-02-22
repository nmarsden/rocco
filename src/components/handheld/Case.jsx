import {useCursor, useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import RoccoText from "./RoccoText.jsx";
import ButtonText from "./ButtonText.jsx";
import ButtonArrow from "./ButtonArrow.jsx";
import {useCallback, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import useRockState from "../../stores/useRockState.js";
import {MathUtils} from "three";

const buttonMaterial = new THREE.MeshStandardMaterial({
    color: '#e2d9d9',
    roughness: 0.0,
    metalness: 0.45
})

let animating = 'NONE'
let animationStartTime;
const buttonAnimationDurationMSecs = 500

export default function Case() {
    const { nodes} = useGLTF('models/case.glb', false)
    const toggleMode = useRockState((state) => state.toggleMode)
    const selectMenuItem = useRockState((state) => state.selectMenuItem)
    const previousMenuItem = useRockState((state) => state.previousMenuItem)
    const nextMenuItem = useRockState((state) => state.nextMenuItem)
    const unselectMenuItem = useRockState((state) => state.unselectMenuItem)
    const [hovered, setHovered] = useState()
    const modeButton = useRef()
    const selectButton = useRef()
    const backButton = useRef()
    const previousButton = useRef()
    const nextButton = useRef()

    useCursor(hovered)

    useFrame(() => {
        if (animating === 'NONE') return

        const elapsedTime = new Date() - animationStartTime
        const animationProgress = elapsedTime / buttonAnimationDurationMSecs
        if (animationProgress > 1) {
            animating = 'NONE'
            return;
        }
        const positionZ = -0.15 * Math.sin(animationProgress * Math.PI)

        if (animating === 'MODE') modeButton.current.position.z = positionZ
        if (animating === 'SELECT') selectButton.current.position.z = positionZ
        if (animating === 'BACK') backButton.current.position.z = positionZ
        if (animating === 'PREVIOUS') previousButton.current.position.z = positionZ
        if (animating === 'NEXT') nextButton.current.position.z = positionZ

    })

    const buttonClicked = useCallback((e, fn, anim) => {
        return () => {
            if (e.object.name === 'ButtonText' || e.object.name === 'ButtonArrow') return;
            animationStartTime = new Date();
            animating = anim
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
        <group
            dispose={null}
        >
            <mesh
                geometry={nodes.Cube006.geometry}
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
            <mesh ref={modeButton}
                  castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Up_Button002.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, toggleMode, 'MODE')()}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
            >
                <ButtonText position={[0, -1.5, 1.17]} text={'MODE'}/>
            </mesh>
            <mesh ref={selectButton}
                  castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Center_Button002.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, selectMenuItem, 'SELECT')()}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
            >
                <ButtonText position={[0, -3.65, 1.17]} text={'SELECT'}/>
            </mesh>
            <mesh ref={backButton}
                  castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Down_Button002.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, unselectMenuItem, 'BACK')()}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
            >
                <ButtonText position={[0, -5.9, 1.17]} text={'BACK'}/>
            </mesh>
            <mesh ref={previousButton}
                  castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Left_Button002.geometry}
                  material={buttonMaterial}
                  onClick={(e) => buttonClicked(e, previousMenuItem, 'PREVIOUS')()}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial
                    roughness={roughness}
                    metalness={metalness}
                    color={buttonColor}
                />
                <ButtonArrow position={[-2.2, -3.65, 1.0]} rotationZ={Math.PI}/>
            </mesh>
            <mesh ref={nextButton}
                  castShadow={true}
                  receiveShadow={true}
                  geometry={nodes.Right_Button002.geometry}
                  onClick={(e) => buttonClicked(e, nextMenuItem, 'NEXT')()}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
            >
                <meshStandardMaterial
                    roughness={roughness}
                    metalness={metalness}
                    color={buttonColor}
                />
                <ButtonArrow position={[2.2, -3.65, 1.0]}/>
            </mesh>
        </group>
    );
}

useGLTF.preload('models/case.glb', false)