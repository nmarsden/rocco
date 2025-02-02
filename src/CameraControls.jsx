import {OrbitControls} from "@react-three/drei";
import {button, useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const desiredCameraPosition = new THREE.Vector3(0, 3, 6);
let cameraShaking = false;
let cameraSpin = false;
let cameraAnimationStartTime = new Date();

export default function CameraControls() {
    const { orbitControlsEnabled } = useControls(
        'OrbitControls',
        {
            orbitControlsEnabled: {
                value: false,
                label: 'enabled'
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
        'Shake',
        {
            cameraShakeDurationMSecs: { value: 3000, label: 'duration (msecs)', min: 1000, max: 10000, step: 200 },
            cameraShakeMaxAmplitude: { value: 2, label: 'maxAmplitude', min: 0.25, max: 10, step: 0.25 },
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
                }, get('Shake.cameraShakeDurationMSecs'))
            })
        },
        {
            collapsed: true
        }
    );

    const { cameraSpinDurationMSecs } = useControls(
        'Spin',
        {
            cameraSpinDurationMSecs: { value: 2000, label: 'duration (msecs)', min: 1000, max: 10000, step: 200 },
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
                }, get('Spin.cameraSpinDurationMSecs'))
            })
        },
        {
            collapsed: false
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
        state.camera.position.lerp(desiredCameraPosition, 0.05)
        if (!cameraShaking) {
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