import {folder, useControls} from "leva";
import {Environment} from "@react-three/drei";
import {suspend} from "suspend-react";
// @ts-ignore
const files = import('@pmndrs/assets/hdri/venice.exr').then((module) => module.default)

export default function Background() {
    const {
        color,
        background,
        intensity,
        blur,
        rotationX,
        rotationY,
        rotationZ
    } = useControls(
        'World',
        {
            'Background': folder(
                {
                    background: true,
                    intensity: { value: 0.05, min: 0, max: 1, step: 0.01 },
                    blur: { value: 1, min: 0, max: 1, step: 0.01 },
                    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
                    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
                    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
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
        <Environment
            files={suspend(files)}
            background={background}
            environmentIntensity={intensity}
            environmentRotation={[rotationX, rotationY, rotationZ]}
            blur={blur}
        />
    )
}