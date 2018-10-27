import React from "react";
import "../css/Home.css";
import Search from "../components/Search";

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark justify-content-end">
        <button className="btn btn-primary btn-large" type="button">
          Login
        </button>
      </nav>
      <div className="jumbotron banner-image">
        <div className="banner-text">
          <h1>Wholesome and Inspirational Quote</h1>
          <p>Current date and time</p>
          <br />
          <Search />
          <br />
          <div className="container bg-dark">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              sapien enim, egestas id enim congue, tempor lobortis est. Nunc et
              rutrum diam. Quisque id felis in ex maximus aliquet. Sed facilisis
              consequat sodales. In finibus posuere felis eget tincidunt.
              Vestibulum rhoncus eros ut ornare pulvinar. Praesent tempus ante
              nec euismod iaculis. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Nulla ut velit massa.
              Fusce auctor, arcu in ullamcorper rhoncus, leo risus rutrum nulla,
              sit amet venenatis arcu nisi sed diam. Donec id dictum enim, et
              tempor urna. Maecenas euismod lectus in lacus molestie lacinia.
              Maecenas et mi tempus, porttitor nulla ut, bibendum metus. Aliquam
              erat volutpat. Suspendisse tempus in risus non consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
