import {folder, useControls} from "leva";

export default function Lights() {
    const { ambientIntensity, directionalPosition, directionalIntensity } = useControls('Lights', {
        'Ambient': folder({
            ambientIntensity: { value: 1.5, label: 'intensity', min: 0, max: 10 }
        }),
        'Directional': folder({
            directionalPosition: { value: [3,3,3], label: 'position' },
            directionalIntensity: { value: 4.5, label: 'intensity', min: 0, max: 10 }
        })
    });
    return <>
        <ambientLight intensity={ambientIntensity}/>
        <directionalLight
            position={directionalPosition}
            intensity={directionalIntensity}
            castShadow={true}
        />
    </>
}