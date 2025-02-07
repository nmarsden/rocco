import {folder, useControls} from "leva";

export default function RockFloor() {
    const { color } = useControls(
        'Rock World',
        {
            'Floor': folder(
                {
                    color: '#b4b4b4'
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