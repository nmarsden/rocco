import useRockState from "../../../stores/useRockState.js";
import {Text} from "@react-three/drei";
import {folder, useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {MathUtils} from "three";

let animating = 'NONE'
let animationStartTime;
const versusTextAnimationDurationMSecs = 500
const resultTextAnimationDurationMSecs = 7000

export default function RockPaperScissors() {
    const shoot = useRockState((state) => state.shoot)
    const versusText = useRef()
    const resultText = useRef()

    const {
        versusScale,
        versusPosition,
        resultScale,
        resultPosition,
        overlayColor, overlayOpacity,
        textFont, textColor, textOutlineColor, textOutlineWidth
    } = useControls(
        'HUD',
        {
            'Rock Paper Scissors': folder(
                {
                    versusScale: {value: 0.05, min: 0, max: 5, step: 0.001},
                    versusPosition: [0, 0.15, -0.7],
                    resultScale: {value: 0.09, min: 0, max: 5, step: 0.001},
                    resultPosition: [0, -0.16, -0.7],
                    'Overlay': folder(
                        {
                            overlayColor: {label: 'color', value: 'white'},
                            overlayOpacity: {label: 'opacity', value: 0.5, min: 0, max: 1, step: 0.01},
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

    useEffect(() => {
        if (shoot === 'NONE') return

        animationStartTime = new Date();
        versusText.current.scale.x = 0
        versusText.current.scale.y = 0
        versusText.current.scale.z = 0
        resultText.current.scale.x = 0
        resultText.current.scale.y = 0
        resultText.current.scale.z = 0

        animating = 'VERSUS'
    }, [shoot])

    useFrame(() => {
        if (animating === 'NONE') return

        if (animating === 'VERSUS') {
            const elapsedTime = new Date() - animationStartTime
            const animationProgress = elapsedTime / versusTextAnimationDurationMSecs;

            if (animationProgress > 1) {
                animationStartTime = new Date();
                animating = 'RESULT'
                return;
            }
            const newScale = MathUtils.lerp(versusText.current.scale.x, versusScale, animationProgress)
            versusText.current.scale.x = newScale
            versusText.current.scale.y = newScale
            versusText.current.scale.z = newScale
        }
        if (animating === 'RESULT') {
            const elapsedTime = new Date() - animationStartTime
            const animationProgress = elapsedTime / resultTextAnimationDurationMSecs;

            if (animationProgress > 1) {
                animating = 'NONE'
                return;
            }
            const newScale = MathUtils.lerp(resultText.current.scale.x, resultScale, animationProgress)

            resultText.current.scale.x = newScale
            resultText.current.scale.y = newScale
            resultText.current.scale.z = newScale
        }
    })

    return (
        <>
            <group
                ref={versusText}
                visible={shoot !== 'NONE'}
                position={versusPosition}
            >
                <mesh
                    position-z={-0.1}
                    scale={[40, 1.5, 1]}
                >
                    <planeGeometry/>
                    <meshBasicMaterial color={overlayColor} transparent={true} opacity={overlayOpacity}/>
                </mesh>
                <Text
                    font={textFont}
                    color={textColor}
                    outlineColor={textOutlineColor}
                    outlineWidth={textOutlineWidth}
                    anchorX="center"
                    anchorY="middle"
                >
                    {`${shoot} vs ROCK`}
                </Text>
            </group>
            <group
                ref={resultText}
                visible={shoot !== 'NONE'}
                position={resultPosition}
            >
                <mesh
                    position-z={-0.1}
                    scale={[40, 1.5, 1]}
                >
                    <planeGeometry/>
                    <meshBasicMaterial color={overlayColor} transparent={true} opacity={overlayOpacity}/>
                </mesh>
                <Text
                    font={textFont}
                    color={textColor}
                    outlineColor={textOutlineColor}
                    outlineWidth={textOutlineWidth}
                    anchorX="center"
                    anchorY="middle"
                >
                    {shoot === 'ROCK' ? 'DRAW!' : shoot === 'PAPER' ? 'YOU WIN!' : 'YOU LOSE!'}
                </Text>
            </group>
        </>
    )
}
