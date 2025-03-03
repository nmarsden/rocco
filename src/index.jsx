import './style.css'
import ReactDOM from 'react-dom/client'
import {Canvas} from '@react-three/fiber'
import {Leva} from "leva";
import {Suspense} from "react";
import {Loader} from "@react-three/drei";
import Experience from './Experience.jsx'
import Ui from "./components/ui/Ui.jsx";

const root = ReactDOM.createRoot(document.querySelector('#root'))

window.isDebug = window.location.hash === '#debug';

root.render(
    <>
        <Leva hidden={!window.isDebug} />
        <Canvas
            camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 0, 25 ]
            } }
            shadows={true}
        >
            <Suspense>
                <Experience />
            </Suspense>
        </Canvas>
        <Ui />
        <Loader containerStyles={{ background: '#ffffff' }}/>
    </>
)