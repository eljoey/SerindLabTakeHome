import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    content: {
        textAlign: 'center',
        margin: 'auto'
    },
    button: {
        width: '100%'
    },
    image: {
        width: '100%'
    },
    header: {
        backgroundColor: 'beige',
    },
}));

const MovieInfo = () => {
    const classes = useStyles();
    const history = useHistory();
    const data = JSON.parse(window.localStorage.getItem('movie'));
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h2>{`${data.title} (${data.year})`}</h2>
                <img className={classes.image} src={data.poster} alt='Poster not found' />
                <TableContainer component={Paper}>
                    <Table size='small'>
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell className={classes.header} colSpan={2} align='center'>Information</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Type:</TableCell>
                                <TableCell align='right'>{data.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Released</TableCell>
                                <TableCell align='right'>{data.released}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Genre(s)</TableCell>
                                <TableCell align='right'>{data.genre}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.header} colSpan={2} align='center'>Ratings</TableCell>
                            </TableRow>
                            {data.ratings.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.Source}</TableCell>
                                        <TableCell align='right'>{item.Value}</TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    onClick={() => history.push('/')}
                >
                    Back
            </Button>
            </div>
        </div>
    );
};

export default MovieInfo;
