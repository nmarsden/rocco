import {Text} from "@react-three/drei";
import {folder, useControls} from "leva";
import useRockState from "../../../stores/useRockState.js";
import {useCallback, useEffect, useState} from "react";

const MAX_MENU_ITEMS = 10;
const INITIAL_MENU_ITEM_WIDTHS = new Array(MAX_MENU_ITEMS).fill(0);

// TODO highlight menu item when selected
// TODO ensure menu item is readable on a non-white background
export default function Menu() {
    const menuItem = useRockState((state) => state.menuItem)
    const menuItems = useRockState((state) => state.menuItems)
    const [initializing, setInitializing] = useState(true)
    const [menuItemWidths, setMenuItemWidths] = useState(INITIAL_MENU_ITEM_WIDTHS)
    const [texts, setTexts] = useState([])

    const { visible, font, color, outlineColor, outlineWidth, scale, position } = useControls(
        'HUD',
        {
            'Menu': folder(
                {
                    visible: true,
                    font: {
                        value: 'fonts/Doto-Black.ttf',
                        options: ['fonts/Doto-Bold.ttf', 'fonts/Doto-ExtraBold.ttf', 'fonts/Doto-Black.ttf', 'fonts/Doto_Rounded-Black.ttf']
                    },
                    color: 'black',
                    outlineColor: 'grey',
                    outlineWidth: { value: 0.025, min: 0, max: 5, step: 0.001 },
                    scale: { value: 0.03, min: 0, max: 5, step: 0.001 },
                    position: [0, -0.28, -0.7],
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
                opacity: 0.5,
            },
            {
                text: menuItems[index],
                positionX: 0,
                opacity: 1,
            },
            {
                text: menuItems[nextIndex],
                positionX: nextPositionX,
                opacity: 0.5,
            },
        ]
        if (menuItems.length >= 5) {
            const previousIndex2 = (previousIndex === 0) ? menuItems.length - 1 : (previousIndex - 1)
            const previousPositionX2 = -((menuItemWidths[index] * 0.5) + gap + menuItemWidths[previousIndex] + gap + (menuItemWidths[previousIndex2] * 0.5))
            texts.unshift({
                text: menuItems[previousIndex2],
                positionX: previousPositionX2,
                opacity: 0.5,
            })
            const nextIndex2 = (index + 2) % menuItems.length
            const nextPositionX2 = (menuItemWidths[index] * 0.5) + gap + menuItemWidths[nextIndex] + gap + (menuItemWidths[nextIndex2] * 0.5)
            texts.push({
                text: menuItems[nextIndex2],
                positionX: nextPositionX2,
                opacity: 0.5,
            })
        }
        setTexts(texts)
    }, [menuItem, menuItems, menuItemWidths, scale])

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
                        visible={visible}
                        font={font}
                        color={color}
                        outlineColor={outlineColor}
                        outlineWidth={outlineWidth}
                        anchorX="center"
                        anchorY="bottom"
                        position={position}
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
                    position={position}
                    scale={scale}
                >
                    {texts.map((text, index) => {
                        return (
                            <Text
                                key={index}
                                visible={visible}
                                font={font}
                                color={color}
                                outlineColor={outlineColor}
                                outlineWidth={outlineWidth}
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
