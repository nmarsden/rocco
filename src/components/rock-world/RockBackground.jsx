import {folder, useControls} from "leva";

export default function RockBackground() {
    const { color } = useControls(
        'Rock World',
        {
            'Background': folder(
                {
                    color: '#e5e2e2'
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