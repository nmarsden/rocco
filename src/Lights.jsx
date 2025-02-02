export default function Lights() {
    return <>
        <directionalLight
            position={[3, 3, 3]}
            intensity={4.5}
            castShadow={true}
        />
        <ambientLight intensity={1.5}/>
    </>
}