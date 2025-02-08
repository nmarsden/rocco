import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";
import RoccoText from "./RoccoText.jsx";

export default function Case() {
    const model = useGLTF('case.glb');

    const { caseColor, roughness, metalness } = useControls(
        'World',
        {
            'Case': folder(
                {
                    caseColor: {value: '#b43f3a', label: 'color'},
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
        <mesh
            geometry={model.scene.children[0].geometry}
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
    );
}

useGLTF.preload('case.glb')