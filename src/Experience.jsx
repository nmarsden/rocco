import { OrbitControls, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const roccoModel = useGLTF('rocco.glb')

    const { showPerf } = useControls('Performance', {
        showPerf: { value: true, label: 'show' }
    })
    const { color } = useControls('Rock', {
        color: 'red'
    })

    return <>
        {showPerf && window.isDebug ? <Perf position={'top-left'} /> : null}

        <OrbitControls makeDefault/>

        <directionalLight position={[1, 2, 3]} intensity={4.5} castShadow={true}/>
        <ambientLight intensity={1.5}/>

        <mesh geometry={roccoModel.scene.children[0].geometry} castShadow={true}>
            <meshStandardMaterial color={color}/>
        </mesh>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow={true}>
            <planeGeometry/>
            <meshStandardMaterial color="greenyellow"/>
        </mesh>
    </>
}

useGLTF.preload('rocco.glb')