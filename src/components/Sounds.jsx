import { Howl, Howler } from 'howler';
import {button, folder, useControls} from "leva";
import useRockState from "../stores/useRockState.js";
import {useEffect} from "react";

const SOUND_MODE = new Howl({ src: ['audio/mode.webm', 'audio/mode.mp3'], format: ['webm', 'mp3']});
const SOUND_MENU_ITEM = new Howl({ src: ['audio/menuItem.webm', 'audio/menuItem.mp3'], format: ['webm', 'mp3']});
const SOUND_TRICK = new Howl({ src: ['audio/trick.webm', 'audio/trick.mp3'], format: ['webm', 'mp3']});

export default function Sound() {
    useControls(
        'World',
        {
            'Sound': folder(
                {
                    volume: { value: 1, min: 0, max: 1, step: 0.1, onChange: value => Howler.volume(value) },
                    mode: button(() => SOUND_MODE.play()),
                    menuItem: button(() => SOUND_MENU_ITEM.play()),
                    trick: button(() => SOUND_TRICK.play())
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

    useEffect(() => {
        const unsubscribeMode = useRockState.subscribe(
            (state) => state.mode,
            () => SOUND_MODE.play()
        )
        const unsubscribeMenuItem = useRockState.subscribe(
            (state) => [state.mode, state.menuItem],
            (value, previousValue) => {
                if (value[0] !== previousValue[0]) {
                    return;  // do nothing if mode changed
                }
                if (value[1] === previousValue[1]) {
                    return; // do nothing if menuItem has not changed
                }
                SOUND_MENU_ITEM.play()
            }
        )
        const unsubscribeTrick = useRockState.subscribe(
            (state) => state.trick,
            () => SOUND_TRICK.play()
        )

        return () => {
            unsubscribeMode()
            unsubscribeMenuItem()
            unsubscribeTrick()
        }
    }, [])

    return <></>
}
