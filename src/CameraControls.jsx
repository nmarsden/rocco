import {OrbitControls} from "@react-three/drei";
import {button, folder, useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const desiredCameraPosition = new THREE.Vector3(0, 3, 6);
let cameraShaking = false;
let cameraSpin = false;
let cameraRollOver = false;
let cameraAnimationStartTime = new Date();

export default function CameraControls() {
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
                            desiredCameraPosition.x = 0
                            desiredCameraPosition.y = 3
                            desiredCameraPosition.z = 6
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
                            desiredCameraPosition.x = 0
                            desiredCameraPosition.y = 3
                            desiredCameraPosition.z = 6
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

    const { cameraRollOverDurationMSecs } = useControls(
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
                    rollOver: button((get) => {
                        if (orbitControlsEnabled) {
                            return;
                        }
                        cameraAnimationStartTime = new Date();
                        cameraRollOver = true

                        setTimeout(() => {
                            cameraRollOver = false
                            desiredCameraPosition.x = 0
                            desiredCameraPosition.y = 3
                            desiredCameraPosition.z = 6
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

    useFrame(state => {
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
            desiredCameraPosition.y = 1
        }
        if (cameraRollOver) {
            const elapsedTime = new Date() - cameraAnimationStartTime
            const animationProgress = elapsedTime / cameraRollOverDurationMSecs;

            state.camera.rotation.z = animationProgress * Math.PI * 2;
        }
        state.camera.position.lerp(desiredCameraPosition, 0.05)
        if (!cameraShaking && !cameraRollOver) {
            state.camera.lookAt(0, 0, 0)
        }
    });

    return <>
        <OrbitControls
            makeDefault={true}
            enabled={orbitControlsEnabled}
        />
    </>
}