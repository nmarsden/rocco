import Performance from "./components/Performance.jsx";
import {OrbitControls, RenderTexture} from "@react-three/drei";
import Sound from "./components/Sounds.jsx";
import Background from "./components/Background.jsx";
import Lights from "./components/Lights.jsx";
import Case from "./components/handheld/Case.jsx";
import RockCameraControls from "./components/rock-world/RockCameraControls.jsx";
import RockLights from "./components/rock-world/RockLights.jsx";
import RockBackground from "./components/rock-world/RockBackground.jsx";
import RockFloor from "./components/rock-world/RockFloor.jsx";
import Rock from "./components/rock-world/rock/Rock.jsx";
import RockDotScreenEffect from "./components/rock-world/RockDotScreenEffect.jsx";
import Hud from "./components/rock-world/hud/Hud.jsx";

export default function Experience() {
    return <>
        <Performance/>
        <OrbitControls makeDefault={true}/>
        <Sound/>
        <Background/>
        <Lights/>
        <Case>
            <mesh position-y={3} position-z={0.82} scale={5.8}>
                <planeGeometry/>
                <meshBasicMaterial>
                    <RenderTexture attach="map">
                        <RockCameraControls>
                            <Hud/>
                        </RockCameraControls>
                        <RockLights/>
                        <RockBackground/>
                        <RockFloor/>
                        <Rock/>
                        <RockDotScreenEffect/>
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
        </Case>
    </>
}
