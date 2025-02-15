import {Text} from "@react-three/drei";
import {folder, useControls} from "leva";
import useRockState from "../../../stores/useRockState.js";
import {useCallback, useEffect, useState} from "react";

const MAX_MENU_ITEMS = 10;
const INITIAL_MENU_ITEM_WIDTHS = new Array(MAX_MENU_ITEMS).fill(0);

// TODO highlight menu item when selected
export default function Menu() {
    const menuItem = useRockState((state) => state.menuItem)
    const menuItems = useRockState((state) => state.menuItems)
    const [initializing, setInitializing] = useState(true)
    const [menuItemWidths, setMenuItemWidths] = useState(INITIAL_MENU_ITEM_WIDTHS)
    const [texts, setTexts] = useState([])

    const {
        menuScale, menuPosition,
        overlayColor, overlayOpacity,
        textVisible, textFont, textColor, textOutlineColor, textOutlineWidth, textSecondaryOpacity
    } = useControls(
        'HUD',
        {
            'Menu': folder(
             {
                menuScale: { label: 'scale', value: 0.03, min: 0, max: 5, step: 0.001 },
                menuPosition: { label: 'position', value: [0, -0.28, -0.7] },
                'Overlay': folder(
                {
                    overlayColor: { label: 'color', value: 'white' },
                    overlayOpacity: { label: 'opacity', value: 0.25, min: 0, max: 1, step: 0.01 },
                }),
                'Text': folder(
                {
                    textVisible: { label: 'visible', value: true },
                    textFont: {
                        label: 'font',
                        value: 'fonts/Doto-Black.ttf',
                        options: ['fonts/Doto-Bold.ttf', 'fonts/Doto-ExtraBold.ttf', 'fonts/Doto-Black.ttf', 'fonts/Doto_Rounded-Black.ttf']
                    },
                    textColor: { label: 'color', value: 'black' },
                    textOutlineColor: { label: 'outlineColor', value: 'grey'},
                    textOutlineWidth: { label: 'outlineWidth', value: 0.025, min: 0, max: 5, step: 0.001 },
                    textSecondaryOpacity: {
                        label: 'opacity',
                        value: 0.5,
                        min: 0,
                        max: 1,
                        step: 0.01,
                        onChange: value => setTexts(texts.map(text => ({...text, opacity: text.text === menuItem ? 1 : value}))),
                        transient: false
                    }
                })
             },
             {
                collapsed: true
             })
        },
        {
            collapsed: true
        }
    );

    const updateTexts = useCallback(() => {
        const index = menuItems.indexOf(menuItem)
        const previousIndex = (index === 0) ? menuItems.length - 1 : (index - 1)
        const nextIndex = (index + 1) % menuItems.length
        const gap = 1
        const previousPositionX = -((menuItemWidths[index] * 0.5) + gap + (menuItemWidths[previousIndex] * 0.5))
        const nextPositionX = (menuItemWidths[index] * 0.5) + gap + (menuItemWidths[nextIndex] * 0.5)

        const texts = [
            {
                text: menuItems[previousIndex],
                positionX: previousPositionX,
                opacity: textSecondaryOpacity,
            },
            {
                text: menuItems[index],
                positionX: 0,
                opacity: 1,
            },
            {
                text: menuItems[nextIndex],
                positionX: nextPositionX,
                opacity: textSecondaryOpacity,
            },
        ]
        if (menuItems.length >= 5) {
            const previousIndex2 = (previousIndex === 0) ? menuItems.length - 1 : (previousIndex - 1)
            const previousPositionX2 = -((menuItemWidths[index] * 0.5) + gap + menuItemWidths[previousIndex] + gap + (menuItemWidths[previousIndex2] * 0.5))
            texts.unshift({
                text: menuItems[previousIndex2],
                positionX: previousPositionX2,
                opacity: textSecondaryOpacity,
            })
            const nextIndex2 = (index + 2) % menuItems.length
            const nextPositionX2 = (menuItemWidths[index] * 0.5) + gap + menuItemWidths[nextIndex] + gap + (menuItemWidths[nextIndex2] * 0.5)
            texts.push({
                text: menuItems[nextIndex2],
                positionX: nextPositionX2,
                opacity: textSecondaryOpacity,
            })
        }
        setTexts(texts)
    }, [menuItem, menuItems, menuItemWidths, textSecondaryOpacity])

    const isMenuItemWidthsInitialized = useCallback((menuItemWidths, numMenuItems) => {
        return menuItemWidths.every((item, index) => item > 0 || index >= numMenuItems);
    }, [])

    useEffect(() => {
        if (isMenuItemWidthsInitialized(menuItemWidths, menuItems.length)) {
            updateTexts()
            setInitializing(false)
        }
    }, [menuItemWidths])

    useEffect(() => {
        updateTexts()
    }, [menuItem])

    useEffect(() => {
        setMenuItemWidths(INITIAL_MENU_ITEM_WIDTHS)
        setInitializing(true)
    }, [menuItems])

    return (
        <>
            {initializing ? menuItems.map((menuItem, index) => {
                return (
                    <Text
                        key={index}
                        visible={textVisible}
                        font={textFont}
                        color={textColor}
                        outlineColor={textOutlineColor}
                        outlineWidth={textOutlineWidth}
                        anchorX="center"
                        anchorY="bottom"
                        position={menuPosition}
                        fillOpacity={0}
                        outlineOpacity={0}
                        onSync={(mesh)=> {
                            const visibleBounds = mesh.textRenderInfo.visibleBounds;
                            const width = visibleBounds[2] - visibleBounds[0];
                            setMenuItemWidths((prevState) => {
                                return prevState.with(index, width);
                            })
                        }}
                    >
                        {menuItem}
                    </Text>
                )
            }) : (
                <group
                    position={menuPosition}
                    scale={menuScale}
                >
                    <mesh
                        position-z={-0.1}
                        scale={[20, 3, 1]}
                    >
                        <planeGeometry/>
                        <meshBasicMaterial color={overlayColor} transparent={true} opacity={overlayOpacity}/>
                    </mesh>
                    {texts.map((text, index) => {
                        return (
                            <Text
                                key={index}
                                visible={textVisible}
                                font={textFont}
                                color={textColor}
                                outlineColor={textOutlineColor}
                                outlineWidth={textOutlineWidth}
                                anchorX="center"
                                anchorY="bottom"
                                position-x={text.positionX}
                                fillOpacity={text.opacity}
                                outlineOpacity={text.opacity}
                            >
                                {text.text}
                            </Text>
                        )
                    })}
                </group>
            )}
        </>
    );
}
