import {useControls} from "leva";

export default function Background() {
    const { color } = useControls('Background', {
        color: '#ebebeb'
    });
    return (
        <color attach='background' args={[color]}/>
    )
}