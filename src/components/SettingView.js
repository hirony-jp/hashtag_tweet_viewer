import React, { useState, useContext } from 'react';
import { makeStyles, createStyles} from '@material-ui/core/styles';
import { TextField, Button, Switch } from '@material-ui/core';
import { colorModeContext, runButtonContext } from '../App.js';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) =>
    createStyles({
        textFieldStyle: {
            marginRight: 5,
            marginBottom: 5
        },
        buttonStyle: {
            marginRight: 5,
            marginBottom: 5
        }
    })
)

function SettingView() {
    const classes = useStyles();

    const [ hashtag, setHashtag ] = useState();
    const [ maxLength, setMaxLength ] = useState();
    const [ intervalTime, setIntervalTime ] = useState();
    const [ runButtonFlag, setRunButtonFlag ] = useContext(runButtonContext);
    const [ runButtonText, setRunButtonText ] = useState("RUN");
    const [ runButtonColor, setRunButtonColor ] = useState("primary");
    const [ colorModeFlag, setColorModeFlag ] = useContext(colorModeContext);
    const [ colorModeText, setColorModeText ] = useState("White Mode");

    const handleRunButtonMethod = () => {
        if (runButtonFlag) {
            setRunButtonText("STOP");
            setRunButtonColor("secondary");
            setRunButtonFlag(false);
            ipcRenderer.send('SEARCH', '#信たまてぇてぇ');
        } else {
            setRunButtonText("RUN");
            setRunButtonColor("primary");
            setRunButtonFlag(true);
        }
    };
    const handleChangeColorMode = () => {
        if (colorModeFlag) {
            setColorModeFlag(false);
            setColorModeText("Dark Mode");
        } else {
            setColorModeFlag(true);
            setColorModeText("White Mode");
        }
    };
    const handleChangeHashtag = (event) => {
        setHashtag(event.target.value);
    };
    const handleChangeMaxLength = (event) => {
        setMaxLength(event.target.value);
    };
    const handleChangeIntervalTime = (event) => {
        setIntervalTime(event.target.value);
    }

    return (
        <div>
            {hashtag}
            <div>
                <TextField
                    className={classes.textFieldStyle}
                    label="Hashtag"
                    variant="outlined"
                    onChange={handleChangeHashtag} />
                <TextField
                    className={classes.textFieldStyle}
                    label="Max Length"
                    variant="outlined"
                    onChange={handleChangeMaxLength} />
                <TextField
                    className={classes.textFieldStyle}
                    label="Interval Time"
                    variant="outlined"
                    onChange={handleChangeIntervalTime} />
            </div>
            <div>
                <Button className={classes.buttonStyle}
                        variant="contained"
                        color={runButtonColor}
                        onClick={handleRunButtonMethod}>
                    {runButtonText}
                </Button>
                <Switch color="primary" onChange={handleChangeColorMode} />{colorModeText}                
            </div>
        </div>
    );
}

export default SettingView;