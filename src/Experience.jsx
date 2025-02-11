import Performance from "./Performance.jsx";
import {OrbitControls, RenderTexture} from "@react-three/drei";
import Background from "./Background.jsx";
import Lights from "./Lights.jsx";
import Case from "./Case.jsx";
import RockCameraControls from "./RockCameraControls.jsx";
import RockLights from "./RockLights.jsx";
import RockBackground from "./RockBackground.jsx";
import RockFloor from "./RockFloor.jsx";
import Rock from "./Rock.jsx";
import RockDotScreenEffect from "./RockDotScreenEffect.jsx";
import ModeText from "./ModeText.jsx";

export default function Experience() {
    return <>
        <Performance/>
        <OrbitControls makeDefault={true}/>
        <Background/>
        <Lights/>
        <Case/>
        <mesh position-z={0.82} scale={5.8}>
            <planeGeometry/>
            <meshBasicMaterial>
                <RenderTexture attach="map">
                    <RockCameraControls>
                        <ModeText/>
                    </RockCameraControls>
                    <RockLights/>
                    <RockBackground/>
                    <RockFloor/>
                    <Rock/>
                    <RockDotScreenEffect/>
                </RenderTexture>
            </meshBasicMaterial>
        </mesh>
    </>
}
