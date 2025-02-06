import {folder, useControls} from "leva";

export default function RockBackground() {
    const { color } = useControls(
        'Rock World',
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