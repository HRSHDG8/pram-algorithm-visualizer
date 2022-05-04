import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Paper, styled, Switch} from "@mui/material";
import {useTheme} from "./theme/Theme";
import {AlgoTabs} from "./components/AlgoTabs";

const prefix = 'HMac-Portfolio'
const classes = {
    root: `${prefix}-root`,
}
const Root = styled(Paper)(({theme}) => ({
    [`&.${classes.root}`]: {
        height: '100vh',
        background: theme.palette.mode === 'dark' ? 'auto' : undefined,
        borderRadius: 0
    },
}))

function App() {
    const {theme, toggleTheme} = useTheme();
    const isLight = theme === 'light'
    return (
        <Box>
            <Root className={classes.root}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" component="div">
                                PRAM
                            </Typography>
                            <Box sx={{flexGrow: 1}}/>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <IconButton edge="end" color="inherit" aria-label="menu" sx={{mr: 2}}
                                            style={{float: 'right', zIndex: 100}}>
                                    <Switch checked={!isLight} onChange={toggleTheme}/>
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
                <AlgoTabs/>
            </Root>
        </Box>
    );
}

export default App;
