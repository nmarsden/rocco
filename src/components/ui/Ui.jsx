import './Ui.css';
import {useCallback, useState} from "react";

export default function Ui() {
    const [showOverlay, setShowOverlay] = useState(false)
    const onInfoButtonClicked = useCallback(() => setShowOverlay(true));
    const onCloseButtonClicked = useCallback(() => setShowOverlay(false));

    return (
        <>
            {showOverlay ? '' : <div className="infoButton" onClick={onInfoButtonClicked}></div>}
            <div className={`infoOverlay ${showOverlay ? 'show' : 'hide'}`}>
                <div className="closeButton" onClick={onCloseButtonClicked}></div>
                <div className="heading">*********</div>
                <div className="heading">* ROCCO *</div>
                <div className="heading">*********</div>
                <div className="tagLine">The digital pet rock</div>
                <div className="author">by Neil Marsden</div>
                <div className="links">
                    <a href="https://github.com/nmarsden/rocco" target="_blank">github</a>|
                    <a href="https://nmarsden.com" target="_blank">projects</a>
                </div>
                <div className="sub-heading">-= credits =-</div>
                <div className="links">
                    <a href="https://dustyroom.com/free-casual-game-sounds" target="_blank">sound</a>|
                    <a href="https://fonts.google.com/specimen/Doto" target="_blank">font</a>|
                    <a href="https://drububu.com/miscellaneous/voxelizer" target="_blank">voxelizer</a>
                </div>
            </div>
        </>
    )
}