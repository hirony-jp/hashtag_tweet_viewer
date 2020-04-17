import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

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
        }
    })
)

function TweetView() {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.cardStyle}>
                <CardContent>
                    <Typography variant="h3">
                        # hashtag
                    </Typography>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        @userID
                    </Typography>
                    <Typography variant="h5" className={classes.tweetView}>
                        やばないそれ？？さっきのほうがええやで。生みの親にキモイって言われるさーなくんかわいそうｋｋｋｋｋｋｋｋｋｋｋｋｋｋｋｋｋああ
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default TweetView;