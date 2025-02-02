import {useGLTF} from "@react-three/drei";
import {useControls} from "leva";

export default function Rock() {
    const roccoModel = useGLTF('rocco.glb');

    const { rockColor, rockRotationY } = useControls('Rock', {
        rockColor: { value: 'red', label: 'color' },
        rockRotationY: { value: 0, label: 'rotationY', min: -Math.PI, max: Math.PI },
    });

    return (
        <mesh
            rotation-y={rockRotationY}
            geometry={roccoModel.scene.children[0].geometry}
            castShadow={true}
        >
            <meshStandardMaterial color={rockColor}/>
        </mesh>
    );
}

useGLTF.preload('rocco.glb')