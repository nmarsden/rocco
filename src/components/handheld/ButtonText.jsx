import {Text} from "@react-three/drei";
import {folder, useControls} from "leva";

export default function ButtonText({ position, text }) {
    const {
        scale, textColor, textOutlineColor, textOutlineWidth
    } = useControls(
        'World',
        {
            'Case': folder(
                {
                    'ButtonText': folder(
                        {
                            scale: {value: 0.38, min: 0, max: 5, step: 0.001},
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
        <Text
            position={position}
            scale={scale}
            color={textColor}
            outlineColor={textOutlineColor}
            outlineWidth={textOutlineWidth}
            anchorX="center"
            anchorY="middle"
        >
            {text}
        </Text>
    );
}
