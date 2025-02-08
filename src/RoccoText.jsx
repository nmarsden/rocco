import {Decal, useTexture} from "@react-three/drei";
import {folder, useControls} from "leva";

export default function RoccoText() {
    const texture = useTexture('rocco_text.png');

    const { visible, scale, position, polygonOffsetFactor, polygonOffsetUnits } = useControls(
        'World',
        {
            'Rocco Text': folder(
                {
                    visible: true,
                    scale: { value: 2.8, min: 0.5, max: 5, step: 0.01 },
                    position: [0, 3.4, 1],
                    polygonOffsetFactor: { value: -0.1, min: -10, max: 10, step: 0.1 },
                    polygonOffsetUnits: { value: -10, min: -10, max: 10, step: 0.1 },
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
        <Decal
            debug={false}
            visible={visible}
            position={position}
            scale={scale}
            rotation={[0, 0, 0]}
        >
            <meshStandardMaterial
                map={texture}
                map-anisotropy={16}
                polygonOffset={true}
                polygonOffsetFactor={polygonOffsetFactor}
                polygonOffsetUnits={polygonOffsetUnits}
                transparent={true}
            />
        </Decal>
    );
}

useTexture.preload('rocco_text.png')
