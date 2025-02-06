import {useGLTF} from "@react-three/drei";
import {folder, useControls} from "leva";

export default function Rock() {
    const model = useGLTF('rock.glb');

    const { rockColor, rockRotationY } = useControls(
        'Rock World',
        {
            'Rock': folder(
                {
                    rockColor: {value: '#b44141', label: 'color'},
                    rockRotationY: {value: 0, label: 'rotationY', min: -Math.PI, max: Math.PI},
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
            geometry={model.scene.children[0].geometry}
            castShadow={true}
        >
            <meshStandardMaterial color={rockColor}/>
        </mesh>
    );
}

useGLTF.preload('rock.glb')