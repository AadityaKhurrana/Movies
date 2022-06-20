import React, { Component } from "react";
//import axios from "axios";

export class Banner extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     movies:[],
  //   };
  // }

  // async componentDidMount(){
  //   const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=2edce532c2b227873389d3ef97a13d1b&language=en-IN&page=1`)
  //   let movieData = res.data
  //   console.log(movieData)
  //   let tempArr=movieData.results;
  //   console.log(tempArr)
  //   this.setState({
  //     movies : [...tempArr]
  //   })
  //   console.log(tempArr)
  // }
  render() {
    let moviesElem = {
      adult: false,
      backdrop_path: "/6EdKBYkB1ssgGjc249ud1L55o8d.jpg",
      genre_ids: [28, 878, 53],
      id: 848278,
      original_language: "en",
      original_title: "Jurassic Hunt",
      overview:
        "Female adventurer Parker joins a crew of male trophy hunters in a remote wilderness park. Their goal: slaughter genetically recreated dinosaurs for sport using rifles, arrows, and grenades. After their guide is killed by raptors, the team tries to escape the park – but the hunters quickly become the hunted. Even worse, the park’s manager suspects Parker of being a spy and sends a hit squad after her. This battle’s about to become primitive!",
      popularity: 4475.053,
      poster_path: "/Czhr00kB8awffakEcQS5ON1ELm.jpg",
      release_date: "2021-08-23",
      title: "Jurassic Hunt",
      video: false,
      vote_average: 4.7,
      vote_count: 50,
    };
    let backDrop = moviesElem.backdrop_path;

    return (
      <div className="card banner-card">
        <img
          style={{ opacity: "0.3" }}
          src={`https://image.tmdb.org/t/p/original${backDrop}`}
          className="card-img-top banner-img"
          alt="..."
        />

        <h4 className="card-title banner-title">{moviesElem.original_title}</h4>
        <p
          className="card-text  banner-text"
          style={{
            height: "7rem",
            width: "60rem",
            color: "black",
            fontWeight: "bolder",
            fontSize: "1rem",
          }}
        >
          {moviesElem.overview}
        </p>
      </div>
    );
  }
}

export default Banner;
