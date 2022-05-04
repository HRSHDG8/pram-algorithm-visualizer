import {FC, SyntheticEvent, useState} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useTheme} from "../theme/Theme";
import {PrefixSum} from "./Algorithms/PrefixSum";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: 'calc(100vw - 150px)'}}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export const AlgoTabs: FC = () => {
    const {theme} = useTheme();
    const isLight = theme === 'light'
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <Box
        sx={{flexGrow: 1, display: 'flex', height: 'calc(100vh - 64px)'}}
    >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Algo Tabs"
            sx={{borderRight: 1, borderColor: 'divider'}}
        >
            <Tab label="Prefix Sum" {...a11yProps(0)}
                 style={{color: isLight ? (value === 0 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)') : 'inherit'}}/>
            <Tab label="Item Two" {...a11yProps(1)}
                 style={{color: isLight ? (value === 1 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)') : 'inherit'}}/>
            <Tab label="Item Three" {...a11yProps(2)}
                 style={{color: isLight ? (value === 2 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)') : 'inherit'}}/>
            <Tab label="Item Four" {...a11yProps(3)}
                 style={{color: isLight ? (value === 3 ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)') : 'inherit'}}/>
        </Tabs>
        <TabPanel value={value} index={0}>
            <PrefixSum/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
            Item Four
        </TabPanel>
    </Box>
}