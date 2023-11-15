import { createStitches } from "@stitches/react";

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme
} = createStitches({
    theme: {
        colors: {
            white: '#FFFFFF',
            'gray-100': '#E1E1E6',
            'gray-300': '#C4C4CC',
            'gray-400': '#8D8D99',
            'gray-500': '#7C7C8A',
            'gray-600': '#323238',
            'gray-700': '#29292E',
            'gray-800': '#202024',
            'gray-900': '#121214',

            'primary-100': '  #ffdf15',
            'primary-200': '  #facc15',
            'primary-400': '  #c6a210',
            'success': '#1bc95b'

        }
    }
})