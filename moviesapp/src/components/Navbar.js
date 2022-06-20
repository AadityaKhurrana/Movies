import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          padding: ".5rem",
          backgroundColor: "#0c4a6e",
        }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          <h1 style={{ color: "white", marginTop: "0.5rem" }}>MoviesApp</h1>
        </Link>
        <Link to="/favourite" style={{ textDecoration: "none" }}>
          <h2
            style={{
              marginLeft: "1.5rem",
              marginTop: "1.2rem",
              color: "#e0f2fe",
            }}
          >
            Favourites
          </h2>
        </Link>
      </div>
    );
  }
}

export default Navbar;
