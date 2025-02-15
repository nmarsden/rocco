import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {button, folder, useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import useRockState from "../../stores/useRockState.js";
import {useEffect} from "react";

const defaultCameraPosition = new THREE.Vector3(0, 3, 8);
const desiredCameraPosition = new THREE.Vector3();
desiredCameraPosition.copy(defaultCameraPosition);

const LOOK_AT_MODES = ['NONE', 'SPIN', 'STAY', 'COME']

let cameraMode = 'NONE'

let cameraAnimationStartTime = new Date();

// Source: https://nicmulvaney.com/easing
function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInOutExpo(x) {
    if (x < 0.25) {
        return easeOutExpo(x * 4);
    }
    if (x > 0.75) {
        return 1 - easeOutExpo((x - 0.75) * 4);
    }
    else {
        return 1;
    }
}

export default function RockCameraControls({ children }) {
    const trick = useRockState((state) => state.trick)
    const unselectMenuItem = useRockState((state) => state.unselectMenuItem)

    const toggleCameraMode = (trick, durationMsecs) => {
        if (orbitControlsEnabled) {
            return;
        }
        cameraAnimationStartTime = new Date();
        cameraMode = trick

        setTimeout(() => {
            cameraMode = 'NONE'
            desiredCameraPosition.copy(defaultCameraPosition);
        }, durationMsecs)
    }

    const { orbitControlsEnabled } = useControls(
        'CameraControls',
        {
            orbitControlsEnabled: {
                value: false,
                label: 'orbit controls'
                // onChange: (value) => {
                //     console.log('--------- orbitControls ----------------------')
                //     console.log('orbitControlsEnabled=', value)
                // },
                // transient: false
            }
        },
        {
            collapsed: true
        }
    );
    const { aspect, fov, position } = useControls(
        'CameraControls',
        {
            'Camera': folder(
                {
                    aspect: {
                        value: 1,
                        min: 0.1,
                        max: 10,
                        step: 0.1
                    },
                    fov: {
                        value: 45,
                        min: 0,
                        max: 200,
                        step: 5
                    }
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

    const { cameraShakeDurationMSecs, cameraShakeMaxAmplitude } = useControls(
        'CameraControls',
        {
            'Shake': folder(
                {
                    cameraShakeDurationMSecs: {value: 3000, label: 'duration (msecs)', min: 1000, max: 10000, step: 200},
                    cameraShakeMaxAmplitude: {value: 2, label: 'maxAmplitude', min: 0.25, max: 10, step: 0.25}
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

    const { cameraSpinDurationMSecs } = useControls(
        'CameraControls',
        {
            'Spin': folder(
                {
                    cameraSpinDurationMSecs: {value: 2000, label: 'duration (msecs)', min: 1000, max: 10000, step: 200}
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

    const { cameraRollOverDurationMSecs, cameraRollOverPosition } = useControls(
        'CameraControls',
        {
            'RollOver': folder(
                {
                    cameraRollOverDurationMSecs: {
                        value: 2000,
                        label: 'duration (msecs)',
                        min: 1000,
                        max: 10000,
                        step: 200
                    },
                    cameraRollOverPosition: {
                        value: { x: 0, y: 0, z: 6 },
                        label: 'position'
                    }
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

    const { cameraStandDurationMSecs, cameraStandPosition, cameraStandLookAt } = useControls(
        'CameraControls',
        {
            'Stand': folder(
                {
                    cameraStandDurationMSecs: {
                        value: 4000,
                        label: 'duration (msecs)',
                        min: 1000,
                        max: 10000,
                        step: 200
                    },
                    cameraStandPosition: {
                        value: { x: 0, y: -1.4, z: 4 },
                        label: 'position'
                    },
                    cameraStandLookAt: {
                        value: { x: 0, y: 3, z: -3.5 },
                        label: 'lookAt'
                    }
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

    const { cameraStayDurationMSecs, cameraStayPosition } = useControls(
        'CameraControls',
        {
            'Stay': folder(
                {
                    cameraStayDurationMSecs: {
                        value: 6000,
                        label: 'duration (msecs)',
                        min: 1000,
                        max: 10000,
                        step: 200
                    },
                    cameraStayPosition: {
                        value: { x: 0, y: 0, z: 25 },
                        label: 'position'
                    }
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

    const { cameraComeDurationMSecs, cameraComePosition } = useControls(
        'CameraControls',
        {
            'Come': folder(
                {
                    cameraComeDurationMSecs: {
                        value: 6000,
                        label: 'duration (msecs)',
                        min: 1000,
                        max: 10000,
                        step: 200
                    },
                    cameraComePosition: {
                        value: { x: 0, y: 1, z: 5 },
                        label: 'position'
                    }
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

    useEffect(() => {
        if (trick === 'NONE') return
        if (trick === 'SHAKE') toggleCameraMode('SHAKE', cameraShakeDurationMSecs)
        if (trick === 'SPIN') toggleCameraMode('SPIN', cameraSpinDurationMSecs)
        if (trick === 'ROLLOVER') toggleCameraMode('ROLLOVER', cameraRollOverDurationMSecs)
        if (trick === 'STAND') toggleCameraMode('STAND', cameraStandDurationMSecs)
        if (trick === 'STAY') toggleCameraMode('STAY', cameraStayDurationMSecs)
        if (trick === 'COME') toggleCameraMode('COME', cameraComeDurationMSecs)

        unselectMenuItem()
    }, [trick]);

    useFrame((state, delta) => {
        if (orbitControlsEnabled) {
            return;
        }
        if (cameraMode === 'SHAKE') {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraShakeDurationMSecs;
            const cameraShakeAmplitude = cameraShakeMaxAmplitude * Math.sin(animationProgress * Math.PI);

            desiredCameraPosition.x = cameraShakeAmplitude * Math.sin(0.01 * elapsedTime)
        }
        if (cameraMode === 'SPIN') {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraSpinDurationMSecs;

            desiredCameraPosition.x = 6 * Math.sin(animationProgress * Math.PI * 2);
            desiredCameraPosition.z = 6 * Math.cos(animationProgress * Math.PI * 2);
            desiredCameraPosition.y = 0
        }
        if (cameraMode === 'ROLLOVER') {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraRollOverDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraRollOverPosition, easeInOut);

            state.camera.lookAt(0, 0, 0);
            state.camera.rotateZ(animationProgress * Math.PI * 2);
        }
        if (cameraMode === 'STAND') {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraStandDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraStandPosition, easeInOut);

            const targetX = cameraStandLookAt.x * easeInOut;
            const targetY = cameraStandLookAt.y * easeInOut;
            const targetZ = cameraStandLookAt.z * easeInOut;

            state.camera.lookAt(targetX, targetY, targetZ);
        }
        if (cameraMode === 'STAY') {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraStayDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraStayPosition, easeInOut);
        }
        if (cameraMode === 'COME') {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraComeDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraComePosition, easeInOut);
        }
        state.camera.position.lerp(desiredCameraPosition, 0.1)

        if (LOOK_AT_MODES.includes(cameraMode)) {
            state.camera.lookAt(0, 0, 0)
        }
    });

    return <>
        <OrbitControls
            makeDefault={true}
            enabled={orbitControlsEnabled}
        />
        <PerspectiveCamera
            makeDefault={true}
            manual={true}
            fov={fov}
            near={0.1}
            far={200}
            aspect={aspect}
            position={[0, 20, 0]}
        >
            {children}
        </PerspectiveCamera>
    </>
}