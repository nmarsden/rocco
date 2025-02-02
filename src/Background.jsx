import {useControls} from "leva";

export default function Background() {
    const { color } = useControls(
        'Background',
        {
            color: '#ebebeb'
        },
        {
            collapsed: true
        }
    );

    return (
        <color attach='background' args={[color]}/>
    )
}