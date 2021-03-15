import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    form: {
        textAlign: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,

    },
    year: {
        margin: theme.spacing(1),
    },
    button: {
        float: 'right',
        marginTop: '10px',
        color: 'white'
    }
}));

const Search = () => {
    const classes = useStyles();
    const [error, setError] = useState({ show: false, message: '' });
    const [yearError, setYearError] = useState(false);
    const [movie, setMovie] = useState(JSON.parse(window.localStorage.getItem('movie')) || null);
    const [title, setTitle] = useState(window.localStorage.getItem('title') || '');
    const [type, setType] = useState(window.localStorage.getItem('type') || 'movie');
    const [year, setYear] = useState(window.localStorage.getItem('year') || '');

    const handleTitleChange = e => {
        const title = e.target.value;

        window.localStorage.setItem('title', title);
        setTitle(title);
    };

    const handleTypeChange = e => {
        const type = e.target.value;

        window.localStorage.setItem('type', type);
        setType(type);
    };

    const handleYearChange = e => {
        const year = e.target.value;

        window.localStorage.setItem('year', year);
        setYear(year);
    };

    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const apiKey = 'aa76b5b7';
        const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}&`;
        const yearRegex = /^(19|20)\d{2}$/;
        if (!year.match(yearRegex) && year !== '') {
            setYearError(true);
            return;
        }

        const apiCall = `${baseUrl}t=${title}&type=${type}&y=${year}`;
        const res = await axios.get(apiCall);
        const data = res.data;

        // Handle not found result
        if (data.Response === 'False') {
            setError({
                show: true,
                message: `Couldn't find ${type}: ${title}`
            });
            return;
        }

        const movieData = {
            title: data.Title,
            poster: data.Poster,
            year: data.Year,
            type: data.Type,
            released: data.Released,
            genre: data.Genre,
            ratings: data.Ratings
        };
        setMovie(movieData);
        setYearError(false);
        window.localStorage.setItem('movie', JSON.stringify(movieData));
    };

    return (
        <div >
            <form className={classes.form} onSubmit={submitForm}>
                <FormControl className={classes.formControl}>
                    <TextField id='title' label='Title' value={title} onChange={handleTitleChange} helperText='Required' required />
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel shrink id="type-label">
                        Type
                        </InputLabel>
                    <Select label='Type' id='type' value={type} onChange={handleTypeChange}>
                        <MenuItem value='movie'>Movie</MenuItem>
                        <MenuItem value='series'>Series</MenuItem>
                        <MenuItem value='episode'>Episode</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.year}>
                    <TextField error={yearError} id='year' label='Year' value={year} onChange={handleYearChange} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </FormControl>
            </form>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={error.show}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                message={error.message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleErrorClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <MovieCard data={movie} />
        </div >
    );
};

export default Search;
