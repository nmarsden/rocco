import {Perf} from "r3f-perf";
import {useControls} from "leva";

export default function Performance() {
    const { showPerf } = useControls(
        'Performance',
        {
            showPerf: { value: true, label: 'show' }
        },
        {
            collapsed: true
        }
    );

    return <>
        {showPerf && window.isDebug ? <Perf position={'bottom-left'} /> : null}
    </>
}