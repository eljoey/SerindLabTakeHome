import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    content: {
        margin: 'auto',
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
}));

const BaseCard = ({ data }) => {
    const classes = useStyles();
    if (!data) {
        return null;
    } else {
        return (
            <div className={classes.root} >
                <div className={classes.content}>
                    <Link to='/info' className={classes.link}>
                        <h2 >{`${data.title} (${data.year})`}</h2>
                        <p>Type: {data.type}</p>

                        <img src={data.poster} alt={`Poster for ${data.title}`} />
                    </Link>

                </div>
            </div >
        );
    }


};

export default BaseCard;