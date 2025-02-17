import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const TRICK_MENU_ITEMS = [
    'SHAKE',
    'SPIN',
    'ROLL',
    'STAND',
    'STAY',
    'COME'
]

const GAME_MENU_ITEMS = [
    'PAPER',
    'SCISSORS',
    'ROCK'
]

const SETTINGS_MENU_ITEMS = [
    'HAIR',
    'EYES',
    'MOUTH'
]

const HAIR_MENU_ITEMS = [
    'NONE',
    'SMALL',
    'LARGE'
]

const EYES_MENU_ITEMS = [
    'NONE',
    'ONE',
    'TWO'
]

const MOUTH_MENU_ITEMS = [
    'NONE',
    'SMILE',
    'FROWN',
]

const MODE_MENUS = [
    { mode: 'TRICK',    menuItems: TRICK_MENU_ITEMS },
    { mode: 'GAME',     menuItems: GAME_MENU_ITEMS },
    { mode: 'SETTINGS', menuItems: SETTINGS_MENU_ITEMS }
]

const MODES = MODE_MENUS.map(item => item.mode)

export default create(subscribeWithSelector((set) =>
{
    return {
        mode: 'TRICK',
        menuItems: TRICK_MENU_ITEMS,
        menuItem: TRICK_MENU_ITEMS[0],
        trick: 'NONE',
        shoot: 'NONE',
        setting: 'NONE',
        hair: 'LARGE',
        eyes: 'TWO',
        mouth: 'NONE',

        toggleMode: () =>
        {
            set((state) =>
            {
                let index = MODES.indexOf(state.mode);
                const nextIndex = (index + 1) % MODES.length
                const modeMenu = MODE_MENUS[nextIndex]
                return { ...modeMenu, menuItem: modeMenu.menuItems[0], trick: 'NONE', shoot: 'NONE', setting: 'NONE' }
            })
        },
        selectMenuItem: () => {
            set((state) =>
            {
                if (state.mode === 'TRICK') return { trick: state.menuItem }
                if (state.mode === 'GAME') return { shoot: state.menuItem }
                if (state.mode === 'SETTINGS') {
                    if (state.menuItem === 'HAIR') return { setting: 'HAIR', menuItems: HAIR_MENU_ITEMS, menuItem: state.hair }
                    if (state.menuItem === 'EYES') return { setting: 'EYES', menuItems: EYES_MENU_ITEMS, menuItem: state.eyes }
                    if (state.menuItem === 'MOUTH') return { setting: 'MOUTH', menuItems: MOUTH_MENU_ITEMS, menuItem: state.mouth }

                    if (state.setting === 'HAIR') return { hair: state.menuItem }
                    if (state.setting === 'EYES') return { eyes: state.menuItem }
                    if (state.setting === 'MOUTH') return { mouth: state.menuItem }
                }
                return {}
            })
        },
        unselectMenuItem: () => {
            set((state) =>
            {
                if (state.mode === 'TRICK') return { trick: 'NONE' }
                if (state.mode === 'GAME') return { shoot: 'NONE' }
                if (state.mode === 'SETTINGS') {
                    if (state.setting !== 'NONE') {
                        return { setting: 'NONE', menuItems: SETTINGS_MENU_ITEMS, menuItem: SETTINGS_MENU_ITEMS[0] }
                    }
                }
                return {}
            })
        },
        nextMenuItem: () => {
            set((state) =>
            {
                let index = state.menuItems.indexOf(state.menuItem);
                const nextIndex = (index + 1) % state.menuItems.length
                return { menuItem: state.menuItems[nextIndex], shoot: 'NONE' };
            })
        },
        previousMenuItem: () => {
            set((state) =>
            {
                let index = state.menuItems.indexOf(state.menuItem);
                const previousIndex = (index === 0) ? state.menuItems.length - 1 : (index - 1)
                return { menuItem: state.menuItems[previousIndex], shoot: 'NONE' };
            })
        }
    }
}))