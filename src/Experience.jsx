import Performance from "./Performance.jsx";
import CameraControls from "./CameraControls.jsx";
import Lights from "./Lights.jsx";
import Background from "./Background.jsx";
import Floor from "./Floor.jsx";
import Rock from "./Rock.jsx";
import {OrbitControls, RenderTexture} from "@react-three/drei";
import DotScreenEffect from "./DotScreenEffect.jsx";

export default function Experience() {
    return <>
        <Performance/>
        <OrbitControls makeDefault={true}/>
        <mesh>
            <planeGeometry/>
            <meshBasicMaterial>
                <RenderTexture attach="map">
                    <CameraControls/>
                    <Lights/>
                    <Background/>
                    <Floor/>
                    <Rock/>
                    <DotScreenEffect/>
                </RenderTexture>
            </meshBasicMaterial>
        </mesh>
    </>
}
