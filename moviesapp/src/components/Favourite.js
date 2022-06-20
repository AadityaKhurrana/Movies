import React, { Component } from "react";
export class Favourite extends Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      currgenre: "All genres",
      movies: [],
      currText:"",
    };
  }

  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let tempArr = [];
    data.map((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    tempArr.unshift("All genres");

    this.setState({
      movies: [...data],
      genres: [...tempArr],
    });
  }

  handleCurrGener=(genere)=>{
    this.setState(
      {
        currgenre:genere
      }
    )

  }
  
  sortPopularityDesc=()=>{
    let temp=this.state.movies
    temp.sort((objA,objB)=>{
      return objB.popularity-objA.popularity
    })

    this.setState({
      movies:[...temp]
    })
  }

  sortPopularityAesc=()=>{
    let temp=this.state.movies
    temp.sort((objA,objB)=>{
      return objA.popularity-objB.popularity
    })

    this.setState({
      movies:[...temp]
    })
  }

  sortRatingAesc=()=>{
    let temp=this.state.movies
    temp.sort((objA,objB)=>{
      return objA.vote_average-objB.vote_average
    })

    this.setState({
      movies:[...temp]
    })
  }

  sortRatingDesc=()=>{
    let temp=this.state.movies
    temp.sort((objA,objB)=>{
      return objB.vote_average-objA.vote_average
    })

    this.setState({
      movies:[...temp]
    })
  }

  handleDeleteButton=(movieDele)=>{

      let temp=this.state.movies
      temp=temp.filter((movieObj)=> movieObj.title!==movieDele.title
      )
      
      this.setState({
        movies:[...temp]
      })
      // localStorage.clear();
      // localStorage.setItem("movies-app",JSON.stringify(this.state.movies));
  }
  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterArr=[]
    if(this.state.currText==="")
    {
      filterArr=this.state.movies
    }
    else
    {
      filterArr=this.state.movies.filter((movieElem)=>{
        let title=movieElem.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
      })
    }

    if(this.state.currgenre!=='All genres')
    {
      filterArr=this.state.movies.filter((movieObj)=> genreids[movieObj.genre_ids[0]]===this.state.currgenre)
    }
  
    return (
      <div>
        <div className="Main">
          <div className="row">
            <div className="col-3 text-center genres">
              <ul class="list-group">
                {this.state.genres.map((movieObj) => (
                    this.state.currgenre===movieObj?
                  <li class="list-group-item gentype" style={{
                    backgroundColor: "#0c4a6e",color: "white",fontWeight:'bolder'}}> {movieObj} </li> :
                    <li class="list-group-item gentype" onClick={()=>this.handleCurrGener(movieObj)}> {movieObj} </li>
                ))}
              </ul>
            </div>

            <div className="col-9 lists">
              <div className="row">
                <input
                  type={"text"}
                  placeholder={"Search"}
                  className="input-group-text col"
                  value={this.state.currText}
                  onChange={(e)=>this.setState({
                    currText:e.target.value
                  })}
                />
                <input type={"Number"} className="input-group-text col" />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAesc}></i></th>
                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Ratings<i class="fa-solid fa-sort-down" onClick={this.sortRatingAesc}></i></th>
                  </tr>
                </thead>
                <tbody>
                  {filterArr.map((movieElem) => (
                    <tr>
                      <td>
                        <img
                          style={{ width: "6rem", borderRadius: "1rem" }}
                          src={`https://image.tmdb.org/t/p/original${movieElem.poster_path}`}
                        />
                      </td>
                      <th scope="row">{movieElem.title}</th>
                      <td>{genreids[movieElem.genre_ids[0]]}</td>
                      <td>{movieElem.popularity}</td>
                      <td>{movieElem.vote_average}</td>
                      <td>
                        <button type="button" class="btn btn-danger" onClick={()=>this.handleDeleteButton(movieElem)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="...">
                <ul class="pagination">
                  <li class="page-item disabled">
                    <a class="page-link">Previous</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Favourite;
