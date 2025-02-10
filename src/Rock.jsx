import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import RockHair from "./RockHair.jsx";
import RockEyes from "./RockEyes.jsx";

export default function Rock() {
    const model = useGLTF('rock_10x10x10.glb', false);

    const { rockColor, rockRotationY, scale } = useControls(
        'Rock World',
        {
            'Rock': folder(
                {
                    rockColor: {value: '#b44141', label: 'color'},
                    rockRotationY: {value: 0, label: 'rotationY', min: -Math.PI, max: Math.PI},
                    scale: { value: 1, min: 0.1, max: 10, step: 0.1 },
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
            rotation-y={rockRotationY}
            scale={scale}
            geometry={model.scene.children[0].geometry}
            castShadow={true}
            receiveShadow={true}
        >
            <meshStandardMaterial color={rockColor}/>
            <RockHair />
            <RockEyes />
        </mesh>
    );
}

useGLTF.preload('rock_10x10x10.glb', false)
