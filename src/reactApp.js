import React, { Component } from 'react';
import { getSlicedArray } from './functions/getSlicedArray';
import { checkData } from './functions/checkData';
import fetch from 'node-fetch'

class appContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            movie: [],
            allMovies: [],
            allComments: [],
            movieToComment: '',
            comment: '',
            titleError: '',
            commentError: '',
            emptyMovieListError: '',
            emptyCommentListError: '',
            movieCommentToDisplay: '',
            slicedArrayOfComments: [],
        }

    this.handleMovieSubmit = this.handleMovieSubmit.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.createMovieTable = this.createMovieTable.bind(this);
    this.createCommentTable = this.createCommentTable.bind(this);
    this.searchByTitle = this.searchByTitle.bind(this);
    }
    
    searchByTitle = (e) => {
        let newState = getSlicedArray(e.target.value, this.state.allComments)
        this.setState({
            slicedArrayOfComments: newState,
            movieCommentToDisplay: e.target.value
        });
     }

    handleChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    handleSelectChange = (e) => {
        let newState;
        newState = e.target.value;
        this.setState({movieToComment: newState});
    }

    handleMovieSubmit = () => {
        const apiKey = "&apikey=c81aa435"
        if( this.state.title !== '') {
            fetch('https://www.omdbapi.com/?t=' + this.state.title + apiKey).then(resp => resp.json()).then((data) => {
                if (data.Response === 'True') {
                     if ( checkData(this.state.allMovies, data.Title) === false )  {
                        fetch('./movies', {
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                        })
                        fetch('./allMovies', {
                            method: 'GET',})
                        .then(res => res.json())
                        .then(allMovies => {
                            this.setState({ 
                                allMovies: allMovies, 
                                titleError: '',
                                emptyMovieListError: ''
                            })
                        });
                    } else {this.setState({ titleError: 'Movie is already saved in database.' })}
                } else {this.setState({ titleError: 'Movie not found.' })}

            })
        }
        else { this.setState({ titleError: 'Movie title is required!' })}   
    }

    handleCommentSubmit = (e) => {
        if (this.state.comment !== '') {
            this.setState({  })
            this.state.allMovies.map(data => {
                if (data.Title === this.state.movieToComment || this.state.movieToComment.length === 0) {
                    data = { 
                        Title: this.state.movieToComment,
                        Comment: this.state.comment
                    }
                    fetch('./comments', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    })
                }
            })
            fetch('./allComments', {
                method: 'GET',})
            .then(res => res.json())
            .then(allComments => {
                this.setState({ 
                    slicedArrayOfComments: allComments,
                    allComments: allComments,
                    emptyCommentListError: '',
                })
            });
        } else { this.setState({ commentError: 'Comment field can not be empty!' }) }   
    }

    createMovieTable(movie) { 
        return (
            <tr className='list-container__table-row'>
                <td className='list-container__table-content1'>{movie.Title}</td>
                <td className='list-container__table-content2'>{movie.Year}</td>
                <td className='list-container__table-content1'>{movie.Rated}</td>
                <td className='list-container__table-content2'>{movie.Released }</td>
                <td className='list-container__table-content1'>{movie.Runtime}</td>
                <td className='list-container__table-content2'>{movie.Genre}</td>
                <td className='list-container__table-content1'>{movie.Director}</td>
                <td className='list-container__table-content2'>{movie.Writer}</td>
                <td className='list-container__table-content2'>{movie.Language}</td>
                <td className='list-container__table-content1'>{movie.Country}</td>
                <td className='list-container__table-content2'>{movie.Awards}</td>
                <td className='list-container__table-content1'>{movie.Plot}</td>
            </tr>
        )
    }

    createCommentTable(slicedArray, fullArray, searchBy) { 

        if (searchBy === 'Show all comments'){
            return (
                fullArray.map(comment => {
                    return (
                        <tr className='list-container__table-row'>
                        <td className='list-container__table-content1'>{comment.Title}</td>
                        <td className='list-container__table-content2'>{comment.Comment}</td>
                    </tr> 
                    )
                }
            ))
        }
        else{
            return (
                slicedArray.map(comment => {
                    return (
                        <tr className='list-container__table-row'>
                        <td className='list-container__table-content1'>{comment.Title}</td>
                        <td className='list-container__table-content2'>{comment.Comment}</td>
                    </tr> 
                    )
                }
            ))
        }
    }

    componentDidMount() {
        fetch('./allMovies', {
            method: 'GET'})
        .then(res => res.json())
        .then(allMovies => {
            if (allMovies.length === 0) {
                this.setState({ emptyMovieListError: 'List is empty or databse is not connected' })
            }
            else { 
                this.setState({ 
                    allMovies: allMovies,
                    movieToComment: allMovies[0].Title,
                    movieCommentToDisplay: 'Show all comments'
                }) 
            }
        })
        fetch('./allComments', {
            method: 'GET',})
        .then(res => res.json())
        .then(allComments => {
            if (allComments.length === 0) {
                this.setState({ emptyCommentListError: 'List is empty or databse is not connected' })
            }
            else {
                this.setState({
                    allComments: allComments,
                    slicedArrayOfComments: allComments
                })
            }
        });
    }

    render() {
        return (
            <div className='appContainer'>
                <h1 className='main-header'>Movie App</h1>

                <div className='movie-container'> 
                    <legend className='movie-container__label'>Save movie to database</legend>
                    <input name='title' className='movie-container__title-input' type='text' placeholder='Movie title (required)' onChange={this.handleChange} value={this.state.title}/>
                    <label name='movieTittleError' className='movie-container__title-error'> { this.state.titleError } </label>
                    <button name='movieSubmit' className='movie-container_button-submit' onClick={this.handleMovieSubmit}>Send data!</button>
                </div>
                
                <div className='list-container'> 
                    <legend className='list-container__label'>List of all movies</legend>
                    <p/>
                    <ul>
                    <table className='list-container__table'>
                    <thead>
                        <tr>
                            <th className='list-container__table-header' width="150px">Title</th>
                            <th className='list-container__table-header' width="50px">Year</th>
                            <th className='list-container__table-header' width="50px">Rated</th>
                            <th className='list-container__table-header' width="100px">Released</th>
                            <th className='list-container__table-header' width="50px">Runtime</th>
                            <th className='list-container__table-header' width="100px">Genre</th>
                            <th className='list-container__table-header' width="100px">Director</th>
                            <th className='list-container__table-header' width="150px">Writer</th>
                            <th className='list-container__table-header' width="100px">Language</th>
                            <th className='list-container__table-header' width="100px">Country</th>
                            <th className='list-container__table-header' width="100px">Awards</th>
                            <th className='list-container__table-header' width="400px">Plot</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allMovies.map(this.createMovieTable)}
                    </tbody>
                    </table>
                    </ul>
                    <label name='emptyMovieList' className='list-container__emptyMovieList-error'> { this.state.emptyMovieListError } </label>
                </div>

                <div className='comment-container'>
                <legend className='comment-container__label'>Save comment to database</legend>
                <select name="movies" className = 'comment-container__selectTitle' onChange={this.handleSelectChange}>
                    {this.state.allMovies.map(data => 
                    <option value={data.Title}>{data.Title}</option>)}
                </select>
                <input name='comment' className='comment-container__comment-input' type='text' placeholder='Comment (required)' onChange={this.handleChange} value={this.state.comment}/>
                <label name='movieCommentTittleError' className='comment-container__comment-error'> { this.state.commentError } </label>
                <p/>
                <button name='movieCommentSubmit' className='comment-container_button-submitComment' onClick={this.handleCommentSubmit}>Comment!</button>
                </div>

                <div className='commentList-container'> 
                    <legend className='commentList-container__label'>Show comments by associated movie</legend>
                    <select name="comments" className='commentList-container__selectComment' onChange={this.searchByTitle}>
                    <option value='Show all comments'>Show all comments</option>
                    {this.state.allMovies.map(data => 
                        <option value={data.Title}>{data.Title}</option>)}
                    </select>
                    <table className='commentList-container__table'>
                    <thead>
                        <tr>
                            <th className='commentList-container__table-header' width="150px">Title</th>
                            <th className='commentList-container__table-header' width="650px">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createCommentTable(this.state.slicedArrayOfComments, this.state.allComments, this.state.movieCommentToDisplay)}
                    </tbody>
                    </table>
                    <label name='emptyCommentList' className='commentList-container__emptyCommentList-error'> { this.state.emptyCommentListError } </label>
                </div>

                <div className='footer-container'> 
                <p/>
                </div>

            </div>
        );
    }
}

export default appContainer;