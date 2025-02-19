import {Decal, useTexture} from "@react-three/drei";
import {folder, useControls} from "leva";

export default function RoccoText({ position, rotationZ=0 }) {
    const texture = useTexture('textures/arrow.png');

    const { visible, scale, polygonOffsetFactor, polygonOffsetUnits } = useControls(
        'World',
        {
            'Case': folder({
                'ButtonArrow': folder(
                    {
                        visible: true,
                        scale: {value: 1.4, min: 0.5, max: 5, step: 0.01},
                        polygonOffsetFactor: {value: -0.1, min: -10, max: 10, step: 0.1},
                        polygonOffsetUnits: {value: -10, min: -10, max: 10, step: 0.1},
                    },
                    {
                        collapsed: true
                    }
                )
            })
        },
        {
            collapsed: true
        }
    );

    return (
        <Decal
            name={"ButtonArrow"}
            debug={false}
            visible={visible}
            position={position}
            scale={scale}
            rotation={[0, 0, rotationZ]}
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

useTexture.preload('textures/arrow.png')
