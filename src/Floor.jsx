import {folder, useControls} from "leva";

export default function Floor() {
    const { color } = useControls(
        'World',
        {
            'Floor': folder(
                {
                    color: '#cecece'
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
        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow={true}>
            <planeGeometry/>
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}