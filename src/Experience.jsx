import { OrbitControls, useGLTF } from '@react-three/drei'
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

const desiredCameraPosition = new THREE.Vector3(0, 3, 6);
let cameraShaking = false;
let cameraAnimationStartTime = new Date();

export default function Experience()
{
    const roccoModel = useGLTF('rocco.glb')
    const { camera } = useThree();

    const { showPerf } = useControls('Performance', {
        showPerf: { value: true, label: 'show' }
    })
    const { enableOrbitControls } = useControls('OrbitControls', {
        enableOrbitControls: { value: false, label: 'enabled' }
    })
    const { rockColor, rockRotationY, shake } = useControls('Rock', {
        rockColor: { value: 'red', label: 'color' },
        rockRotationY: { value: 0, label: 'rotationY', min: -Math.PI, max: Math.PI },
        shake: button(() => {
            cameraAnimationStartTime = new Date();
            cameraShaking = true

            setTimeout(() => {
                cameraShaking = false
                desiredCameraPosition.x = 0
                desiredCameraPosition.y = 3
                desiredCameraPosition.z = 6
            }, 2000)
        })
    })

    useFrame(state => {
        if (cameraShaking) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            desiredCameraPosition.x = Math.sin(0.01 * elapsedTime)
        }
        state.camera.position.lerp(desiredCameraPosition, 0.05)
    });

    return <>
        {showPerf && window.isDebug ? <Perf position={'top-left'} /> : null}

        <OrbitControls
            makeDefault={true}
            enabled={enableOrbitControls}
        />

        <axesHelper args={[5]}/>

        <directionalLight
            position={[3, 3, 3]}
            // position={[1, 2, 3]}
            intensity={4.5}
            castShadow={true}
        />
        <ambientLight intensity={1.5}/>

        <mesh
            rotation-y={rockRotationY}
            geometry={roccoModel.scene.children[0].geometry}
            castShadow={true}
            onClick={shake}
        >
            <meshStandardMaterial color={rockColor}/>
        </mesh>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow={true}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
    </>
}

useGLTF.preload('rocco.glb')