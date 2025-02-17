import {Text} from "@react-three/drei";
import {folder, useControls} from "leva";
import useRockState from "../../../stores/useRockState.js";

export default function ModeText() {
    const mode = useRockState((state) => state.mode)
    const setting = useRockState((state) => state.setting)

    const {
        visible, scale, position,
        overlayColor, overlayOpacity,
        textFont, textColor, textOutlineColor, textOutlineWidth
    } = useControls(
        'HUD',
        {
            'Mode': folder(
                {
                    visible: { label: 'visible', value: true },
                    scale: {value: 0.03, min: 0, max: 5, step: 0.001},
                    position: [-0.27, 0.28, -0.7],
                    'Overlay': folder(
                        {
                            overlayColor: {label: 'color', value: 'white'},
                            overlayOpacity: {label: 'opacity', value: 0.25, min: 0, max: 1, step: 0.01},
                        }),
                    'Text': folder(
                        {
                            textFont: {
                                label: 'font',
                                value: 'fonts/Doto-Black.ttf',
                                options: ['fonts/Doto-Bold.ttf', 'fonts/Doto-ExtraBold.ttf', 'fonts/Doto-Black.ttf', 'fonts/Doto_Rounded-Black.ttf']
                            },
                            textColor: { label: 'color', value: 'black' },
                            textOutlineColor: { label: 'outlineColor', value: 'grey' },
                            textOutlineWidth: { label: 'outlineWidth', value: 0.025, min: 0, max: 5, step: 0.001 }
                        })
                },
                {
                    collapsed: true
                })
        },
        {
            collapsed: true
        }
    );

    return (
        <group
            visible={visible}
            position={position}
            scale={scale}
        >
            <mesh
                position-z={-0.1}
                scale={[40, 3, 1]}
            >
                <planeGeometry/>
                <meshBasicMaterial color={overlayColor} transparent={true} opacity={overlayOpacity}/>
            </mesh>
            <Text
                font={textFont}
                color={textColor}
                outlineColor={textOutlineColor}
                outlineWidth={textOutlineWidth}
                anchorX="left"
                anchorY="top"
            >
                {`${mode} MODE ${setting === 'NONE' ? '' : `[${setting}]`}`}
            </Text>
        </group>
    );
}
