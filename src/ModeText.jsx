import {Text} from "@react-three/drei";
import {folder, useControls} from "leva";

export default function ModeText() {
    const { visible, font, color, outlineColor, outlineWidth, scale, position } = useControls(
        'UI',
        {
            'Mode Text': folder(
                {
                    visible: true,
                    font: {
                        value: 'fonts/Doto-Black.ttf',
                        options: ['fonts/Doto-Bold.ttf', 'fonts/Doto-ExtraBold.ttf', 'fonts/Doto-Black.ttf', 'fonts/Doto_Rounded-Black.ttf']
                    },
                    color: 'black',
                    outlineColor: 'grey',
                    outlineWidth: { value: 0.025, min: 0, max: 5, step: 0.001 },
                    scale: { value: 0.06, min: 0, max: 5, step: 0.001 },
                    position: [-0.27, 0.21, -0.7],
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
        <Text
            visible={visible}
            font={font}
            color={color}
            outlineColor={outlineColor}
            outlineWidth={outlineWidth}
            anchorX="left"
            anchorY="bottom"
            position={position}
            scale={scale}
        >
            TRICK
        </Text>
    );
}
