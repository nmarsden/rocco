import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {button, folder, useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const defaultCameraPosition = new THREE.Vector3(0, 3, 6);
const desiredCameraPosition = new THREE.Vector3();
desiredCameraPosition.copy(defaultCameraPosition);

let cameraShaking = false;
let cameraSpin = false;
let cameraRollOver = false;
let cameraStand = false;
let cameraStay = false;
let cameraCome = false;
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

export default function RockCameraControls() {
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
                    cameraShakeMaxAmplitude: {value: 2, label: 'maxAmplitude', min: 0.25, max: 10, step: 0.25},
                    shake: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraShaking = true

                        setTimeout(() => {
                            cameraShaking = false
                            desiredCameraPosition.copy(defaultCameraPosition);
                        }, get('CameraControls.Shake.cameraShakeDurationMSecs'))
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

    const { cameraSpinDurationMSecs } = useControls(
        'CameraControls',
        {
            'Spin': folder(
                {
                    cameraSpinDurationMSecs: {value: 2000, label: 'duration (msecs)', min: 1000, max: 10000, step: 200},
                    spin: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraSpin = true

                        setTimeout(() => {
                            cameraSpin = false
                            desiredCameraPosition.copy(defaultCameraPosition);
                        }, get('CameraControls.Spin.cameraSpinDurationMSecs'))
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
                    },
                    rollOver: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraRollOver = true

                        setTimeout(() => {
                            cameraRollOver = false
                            desiredCameraPosition.copy(defaultCameraPosition);
                        }, get('CameraControls.RollOver.cameraRollOverDurationMSecs'))
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
                        value: { x: 0, y: -1, z: 3 },
                        label: 'position'
                    },
                    cameraStandLookAt: {
                        value: { x: 0, y: 1, z: -1 },
                        label: 'lookAt'
                    },
                    stand: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraStand = true

                        setTimeout(() => {
                            cameraStand = false
                            desiredCameraPosition.copy(defaultCameraPosition);
                        }, get('CameraControls.Stand.cameraStandDurationMSecs'))
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
                    },
                    stay: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraStay = true

                        setTimeout(() => {
                            cameraStay = false
                            desiredCameraPosition.copy(defaultCameraPosition);
                        }, get('CameraControls.Stay.cameraStayDurationMSecs'))
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
                        value: { x: 0, y: 0, z: 2.5 },
                        label: 'position'
                    },
                    come: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraCome = true

                        setTimeout(() => {
                            cameraCome = false
                            desiredCameraPosition.copy(defaultCameraPosition);
                        }, get('CameraControls.Come.cameraComeDurationMSecs'))
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

    useFrame((state, delta) => {
        if (orbitControlsEnabled) {
            return;
        }
        if (cameraShaking) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraShakeDurationMSecs;
            const cameraShakeAmplitude = cameraShakeMaxAmplitude * Math.sin(animationProgress * Math.PI);

            desiredCameraPosition.x = cameraShakeAmplitude * Math.sin(0.01 * elapsedTime)
        }
        if (cameraSpin) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraSpinDurationMSecs;

            desiredCameraPosition.x = 6 * Math.sin(animationProgress * Math.PI * 2);
            desiredCameraPosition.z = 6 * Math.cos(animationProgress * Math.PI * 2);
            desiredCameraPosition.y = 0
        }
        if (cameraRollOver) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraRollOverDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraRollOverPosition, easeInOut);

            state.camera.lookAt(0, 0, 0);
            state.camera.rotateZ(animationProgress * Math.PI * 2);
        }
        if (cameraStand) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraStandDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraStandPosition, easeInOut);

            const targetX = cameraStandLookAt.x * easeInOut;
            const targetY = cameraStandLookAt.y * easeInOut;
            const targetZ = cameraStandLookAt.z * easeInOut;

            state.camera.lookAt(targetX, targetY, targetZ);
        }
        if (cameraStay) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraStayDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraStayPosition, easeInOut);
        }
        if (cameraCome) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraComeDurationMSecs;

            const easeInOut = easeInOutExpo(animationProgress)

            desiredCameraPosition.lerpVectors(defaultCameraPosition, cameraComePosition, easeInOut);
        }
        state.camera.position.lerp(desiredCameraPosition, 0.1)

        if (!cameraShaking && !cameraRollOver && !cameraStand) {
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
        />
    </>
}