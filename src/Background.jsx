import {folder, useControls} from "leva";

export default function Background() {
    const { color } = useControls(
        'World',
        {
            'Background': folder(
                {
                    color: '#ebebeb'
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

    return (
        <color attach='background' args={[color]}/>
    )
}