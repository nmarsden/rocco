import {Grid, EffectComposer} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";
import {folder, useControls} from "leva";

const BLEND_FUNCTIONS = {
    'ADD': BlendFunction.ADD,                   // - Additive blending. Fast, but may produce washed out results.
    'ALPHA': BlendFunction.ALPHA,               // - Alpha blending. Blends based on the alpha value of the new color.
    'AVERAGE': BlendFunction.AVERAGE,           // - Calculates the avarage of the new color and the base color.
    'COLOR': BlendFunction.COLOR,               // - Converts the colors to HSL and blends based on color.
    'COLOR_BURN': BlendFunction.COLOR_BURN,     // - Color burn.
    'COLOR_DODGE': BlendFunction.COLOR_DODGE,   // - Color dodge.
    'DARKEN': BlendFunction.DARKEN,             // - Prioritize darker colors.
    'DIFFERENCE': BlendFunction.DIFFERENCE,     // - Color difference.
    'DIVIDE': BlendFunction.DIVIDE,             // - Color division.
    'DST': BlendFunction.DST,                   // - Overwrites the new color with the base color. Ignores opacity.
    'EXCLUSION': BlendFunction.EXCLUSION,       // - Color exclusion.
    'HARD_LIGHT': BlendFunction.HARD_LIGHT,     // - Hard light.
    'HARD_MIX': BlendFunction.HARD_MIX,         // - Hard mix.
    'HUE': BlendFunction.HUE,                   // - Converts the colors to HSL and blends based on hue.
    'INVERT': BlendFunction.INVERT,             // - Overwrites the base color with the inverted new color.
    'INVERT_RGB': BlendFunction.INVERT_RGB,     // - Multiplies the new color with the inverted base color.
    'LIGHTEN': BlendFunction.LIGHTEN,           // - Prioritize lighter colors.
    'LINEAR_BURN': BlendFunction.LINEAR_BURN,   // - Linear burn.
    'LINEAR_DODGE': BlendFunction.LINEAR_DODGE, // - Same as ADD but limits the result to 1.
    'LINEAR_LIGHT': BlendFunction.LINEAR_LIGHT, // - Linear light.
    'LUMINOSITY': BlendFunction.LUMINOSITY,     // - Converts the colors to HSL and blends based on luminosity.
    'MULTIPLY': BlendFunction.MULTIPLY,         // - Color multiplication.
    'NEGATION': BlendFunction.NEGATION,         // - Negates the base color using the new color.
    'NORMAL': BlendFunction.NORMAL,             // - Overwrites the base color with the new one.
    'OVERLAY': BlendFunction.OVERLAY,           // - Color overlay.
    'PIN_LIGHT': BlendFunction.PIN_LIGHT,       // - Pin light.
    'REFLECT': BlendFunction.REFLECT,           // - Color reflection.
    'SCREEN': BlendFunction.SCREEN,             // - Screen blending. The two colors are effectively projected on a white screen simultaneously.
    'SRC': BlendFunction.SRC,                   // - Overwrites the base color with the new one. Ignores opacity.
    'SATURATION': BlendFunction.SATURATION,     // - Converts the colors to HSL and blends based on saturation.
    'SOFT_LIGHT': BlendFunction.SOFT_LIGHT,     // - Soft light.
    'SUBTRACT': BlendFunction.SUBTRACT,         // - Subtracts the new color from the base color.
    'VIVID_LIGHT': BlendFunction.VIVID_LIGHT,   // - Vivid light.
};

export default function DotScreenEffect() {
    const { enabled, blendFunction, scale, lineWidth } = useControls(
        'World',
        {
            'DotScreenEffect': folder(
                {
                    enabled: false,
                    blendFunction: {
                        options: Object.keys(BLEND_FUNCTIONS),
                        value: 'DIVIDE'
                    },
                    scale: {
                        value: 1.0,
                        min: 0.1,
                        max: 5.0,
                        step: 0.1
                    },
                    lineWidth: {
                        value: 0.5,
                        min: 0.0,
                        max: 5.0,
                        step: 0.1
                    }
                },
                {
                    collapsed: false
                }
            )
        },
        {
            collapsed: false
        }
    );

    return (
        <EffectComposer enabled={enabled}>
            <Grid
                blendFunction={BLEND_FUNCTIONS[blendFunction]} // blend mode
                scale={scale} // grid pattern scale
                lineWidth={lineWidth} // grid pattern line width
                // size={{ width, height }} // overrides the default pass width and height
            />
        </EffectComposer>
    );
}