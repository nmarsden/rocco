import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import {Leva} from "leva";

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
                position: [ 0, 3, 6 ]
                // position: [ - 4, 3, 6 ]
            } }
            shadows={true}
        >
            <Experience />
        </Canvas>
    </>
)