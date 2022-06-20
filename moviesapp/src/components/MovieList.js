import React, { Component } from "react";
//import { movies } from "../movieData";
import axios from "axios";

//`https://api.themoviedb.org/3/discover/movie?api_key=2edce532c2b227873389d3ef97a13d1b&language=en-US&sort_by=popularity.desc&page=${this.state.currPage}&primary_release_year=2022&with_original_language=hi|kn|ml|ta|te`
//https://api.themoviedb.org/3/movie/popular?api_key=2edce532c2b227873389d3ef97a13d1b&language=en-IN&page=1 (hollywood)

export class MovieList extends Component 
{
  constructor()
   {
    super();
    this.state = {
      hover: "",
      parr: [1],
      movies:[],
      currPage:1,
      favourites:[]
    };
  }
  async componentDidMount(){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2edce532c2b227873389d3ef97a13d1b&language=en-IN&page=${this.state.currPage}`)
    let movieData = res.data
    console.log(movieData)
    this.setState({
      movies : [...movieData.results]
    })
    console.log('mounting done with CDM third')
  }
changeMovies=async()=>
{
  const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2edce532c2b227873389d3ef97a13d1b&language=en-IN&page=${this.state.currPage}`)
    let movieData = res.data
    console.log(movieData)
    this.setState({
      movies : [...movieData.results]
    })

}

handleNext=()=>{
  let tempArr=[]
  for(let i=1;i<=this.state.parr.length+1;i++)
  {
    tempArr.push(i);
  }
  this.setState({
    parr:[...tempArr],
    currPage:this.state.currPage+1,
  },this.changeMovies)

}

handlePrevious=()=>{
  if(this.state.currPage!=1)
  {
    this.setState({
      currPage:this.state.currPage-1,
    },this.changeMovies)
  }
  
}
handlePageClick=(value)=>{
  if(this.state.currPage!==value)
  {
    this.setState({
      currPage:value,
    },this.changeMovies)
  }
}

handleFavourites=(movieObj)=>{

  let oldData=JSON.parse(localStorage.getItem('movies-app') || '[]')

  if(this.state.favourites.includes(movieObj.id))
  {
      oldData=oldData.filter((movie)=>movie.id!=movieObj.id)
  }
  else
  {
    oldData.push(movieObj);
  }
  localStorage.setItem("movies-app",JSON.stringify(oldData));
  console.log(oldData)
  this.handleFavouriteState()
}

handleFavouriteState=()=>{
  let oldData=JSON.parse(localStorage.getItem('movies-app') || '[]')
  let temp=oldData.map((movie)=>movie.id)
  this.setState({
    favourites:[...temp]
  })
}

  render() {
    //let moviesArr = movies.results;
    return (
      <div style={{backgroundImage:'url(https://wallpaperaccess.com/full/4218996.jpg)'}}>
        <h1 style={{ textAlign: "center",color:'white',padding:'1rem' }}>Trending</h1>
        <div className="movies-list">
          {this.state.movies.map((moviesObj) => (
            <div
              className="card movie-card"
              style={{
                height:"25rem",
                width: "18rem",
                border:'none',
                margin: ".5rem",
                borderRadius:'1.2rem'
                // backgroundColor: "#bae6fd",
              }}
              onMouseEnter={() => this.setState({ hover: moviesObj.id })}
              onMouseLeave={() => this.setState({ hover: "" })}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${moviesObj.poster_path}`}
                className="card-img-top"
                alt="..."
                style={{
                  height:'25rem',
                  borderRadius:'1.2rem',
                }}
              />
              <div className="card-body">
                {/* <h5 className="card-title" style={{ color: "#075985" }}>
                  {moviesObj.title}
                </h5> */}
                {/* <p className="card-text">{moviesObj.overview}</p> */}
                <div
                  className="button-wrapper"
                  style={{ display: "flex", justifyContent: "center" }}>
                  {/* main logic for button shown or not */}

                  {this.state.hover === moviesObj.id && (
                    <a className="btn btn-primary card-button" 
                    onClick={()=>{this.handleFavourites(moviesObj)}}>

                    {this.state.favourites.includes(moviesObj.id)?"Remove from Favourite":'Add To Favourites'}
                    </a>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <nav aria-label="...">
            <ul class="pagination">
              <li class="page-item disabled">
                <a href='#' class="page-link" onClick={this.handlePrevious}>Previous</a>
              </li>
              
              {this.state.parr.map((value) => (
                <li class="page-item">
                  <a class="page-link" onClick={()=>this.handlePageClick(value)}>
                    {value}
                  </a>
                </li>
              ))}
              
              <li class="page-item">
                <a href='#' class="page-link" onClick={this.handleNext}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default MovieList;
