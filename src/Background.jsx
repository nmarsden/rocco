import {folder, useControls} from "leva";

export default function Background() {
    const { color } = useControls(
        'World',
        {
            'Background': folder(
                {
                    color: '#eb9a6a'
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