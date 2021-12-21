import { createMakeAndWithStyles } from 'tss-react';

import { createTheme, ThemeOptions, useMediaQuery } from '@mui/material';

export const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#885200',
            contrastText: '#ffffff',
            light: '#ffddb8',
            dark: '#2c1700',
        },
        secondary: {
            main: '#715a41',
            contrastText: '#ffffff',
            light: '#fdddbd',
            dark: '#281805',
        },
        error: {
            main: '#ba1b1b',
            contrastText: '#ffffff',
            light: '#ffdad4',
            dark: '#410001',
        },
        divider: '#837568',
    },
};

export const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffb85f',
            contrastText: '#482900',
            light: '#673d00',
            dark: '#ffddb8',
        },
        secondary: {
            main: '#dfc1a2',
            contrastText: '#3f2d17',
            light: '#58432b',
            dark: '#fdddbd',
        },
        error: {
            main: '#ffb4a9',
            contrastText: '#680003',
            light: '#930006',
            dark: '#ffdad4',
        },
        divider: '#9d8e81',
    },
};

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

export const useAppTheme = () => {
    const isDarkTheme = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = isDarkTheme ? darkTheme : lightTheme;
    return theme;
};

export const { makeStyles, withStyles } = createMakeAndWithStyles({ useTheme: useAppTheme });

// light theme
// primary   #885200, #ffffff, #ffddb8, #2c1700
// secondary #715a41, #ffffff, #fdddbd, #281805
// tretiary  #55633c, #ffffff, #d9e9b8, #141f02
// error     #ba1b1b, #ffffff, #ffdad4, #410001
// backround #fcfcfc, #1f1b16, #fcfcfc, #1f1b16
// outline   #837568, -------, #f1e0d0, #50453a

// dark theme
// primary   #ffb85f, #482900, #673d00, #ffddb8
// secondary #dfc1a2, #3f2d17, #58432b, #fdddbd
// tretiary  #bdcd9d, #283412, #3e4b27, #d9e9b8
// error     #ffb4a9, #680003, #930006, #ffdad4
// backround #1f1b16, #ebe1d9, #1f1b16, #ebe1d9
// outline   #9d8e81, -------, #50453a, #d4c4b5
