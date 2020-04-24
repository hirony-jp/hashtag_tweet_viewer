import React, { useState, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { colorModeContext } from '../App.js';

const useStyles = makeStyles((theme) =>
    createStyles({
        tweetView: {
            marginTop: 10
        },
        cardStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 30,
            margin: '0 auto',
            maxHeight: 200,
            minHeight: 200,
            maxWidth: '70%'
        },
        dark: {
            backgroundColor: '#243447',
            color: "#fff"
        },
        white: {
            backgroundColor: '#fff',
            color: '#333'
        }
    })
)

function TweetView() {
    const classes = useStyles();

    const [ hashtag ] = useState("Hashtag");
    const [ username ] = useState("UserID")
    const [ tweets ] = useState("Run Now !!");
    const [ colorModeFlag ] = useContext(colorModeContext);

    return (
        <div>
            <Card className={
                classes.cardStyle + " " + (colorModeFlag ? classes.white : classes.dark)
            }>
                <CardContent>
                    <Typography variant="h3">
                       <FAIcon icon={['fab', 'twitter']} color="#00aced" /> #{hashtag}
                    </Typography>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        @{username}
                    </Typography>
                    <Typography variant="h5" className={classes.tweetView}>
                        {tweets}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default TweetView;