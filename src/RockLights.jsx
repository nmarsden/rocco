import {folder, useControls} from "leva";

export default function RockLights() {
    const { ambientIntensity, ambientColor, directionalColor, directionalPosition, directionalIntensity } = useControls(
        'Rock World',
        {
            'Lights': folder(
                {
                    'Ambient': folder({
                        ambientColor: {value: '#ffffff', label: 'color'},
                        ambientIntensity: {value: 1.5, label: 'intensity', min: 0, max: 10}
                    }),
                    'Directional': folder({
                        directionalColor: {value: '#ffffff', label: 'color'},
                        directionalPosition: {value: [3, 3, 3], label: 'position'},
                        directionalIntensity: {value: 4.5, label: 'intensity', min: 0, max: 10}
                    })
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

    return <>
        <ambientLight
            color={ambientColor}
            intensity={ambientIntensity}
        />
        <directionalLight
            color={directionalColor}
            position={directionalPosition}
            intensity={directionalIntensity}
            castShadow={true}
        />
    </>
}