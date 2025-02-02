export default function Floor() {
    return (
        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow={true}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
    )
}