import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios"
import { Row, Col, Container } from "reactstrap";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Carousel from "nuka-carousel";
import styled from 'styled-components';

import Search from "../components/Search";
import Login from "../components/Login";

import '../css/Home.scss';

const HomeCarousel = styled.main`
  .flippy-card {
    @media (min-width: 426px) and (max-width: 472px) {
      left: -5vw;
  }
    @media (min-width: 359px) and (max-width: 425px) {
        left: -7vw;
    }
    @media (max-width: 358px) {
        left: -6vw;
    }
  }
  .flippy-cardContainer-wrapper {
    @media (min-width: 426px) and (max-width: 472px) {
        // height: 375px;
        width: 350px;
    }
`;

let errorIconMargins = "22px";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      flashcard: [],
      search: false,
      notFound: false,
      showCards: false,
    };
  }

  searchTags = (event, tagInput) => {
    event.preventDefault();
    this.setState({
      search: true,
      notFound: false
    })
    // console.log("input: " +tagInput.replace(/\s/g, ''))
    axios.get("/decks/tags/" + tagInput.replace(/\s/g, ''))
      .then(response => {
        console.log(response.data)
        if (response.data === null || response.data.length === 0) {
          this.setState({
            notFound: true,
            decks: []
          });
        }
        else {
          console.log(response.data)
          this.setState({
            decks: response.data
          })
        }
      })
  }

  getFlashcards = (id) => {
    axios.get("/flashcard/" + id)
      .then(response => {
        this.setState({
          flashcard: response.data,
          showCards: true,
          search: false,
          notFound: false, // Confusing wording
        })
      })
  }

  displayPublicDecks = (event) => {
    console.log("hit");
    event.preventDefault();
    axios.get("/decks/public")
      .then(response => {
        this.setState({
          decks: response.data,
          showCards: false,
          search: true,
          notFound: false
        })
        console.log(this.state.decks);
      })
  }


  render() {
    if (this.props.user) {
      return <Redirect to="/profile" />
    }

    let renderDecks;
    if (this.state.search) {
      if (this.state.notFound) {
        document.querySelector("#render-decks").style.height = "auto";
        document.querySelector("#render-decks").style.boxShadow = "";
        renderDecks =
          <section className="decks-not-found animated pulse">
            <i className="fas fa-binoculars" 
              style={{
                fontSize: "200px", 
                marginLeft: errorIconMargins,
                marginRight: errorIconMargins, 
                color: "#E34234"}}></i>
            <h3 style={{color: "#E34234", textAlign: "center"}}>Cannot find a deck</h3>
          </section>
      }
      else if (!this.state.notFound) {
        // document.querySelector("#render-decks").style.height = "700px";
        // document.querySelector("#render-decks").style.boxShadow = "inset 0 0 5px #000000";
        renderDecks = this.state.decks.map((item, index) => {
          return (
            <Col key={item.id}>
              <div className="decks decks-primary animated bounceIn">
              <div className="h1-homepage-wrappers">
                <h1 className="deck-title text-center" onClick={() => this.getFlashcards(item.id)}>{item.subject}</h1>
                </div>
                <div className="tags-box">
                  {item.Tags.map(elem => {
                    return <button key={elem.id} className="tag-btn" onClick={(e) => this.searchTags(e, elem.tags)}>#{elem.tags} </button>
                  })}
                </div>
              </div>
            </Col>
          );
        });
      }
    }
    else if (this.state.showCards) {
      document.querySelector("#render-decks").style.height = "auto";
      // document.querySelector("#render-decks").style.boxShadow = "";
      renderDecks = (
        <Carousel className="carousel">
        {this.state.flashcard.map(item => {
          return (
            <HomeCarousel>
              <main className="carousel__items">
                <div/>
                <Flippy
                  key={item.id}
                  flipOnHover={false}
                  flipOnClick={true}
                  flipDirection="horizontal"
                  ref={(r) => (this.Flippy = r)}
                  style={{ width: '400px', height: '200px' }}
                >
                  <FrontSide style={{ backgroundColor: '#93bbde' }}>
                    <p className="flippy-text">{item.front}</p>
                  </FrontSide>

                  <BackSide style={{ backgroundColor: '#66b361' }}>
                    <p className="flippy-text">{item.back}</p>
                  </BackSide>
                </Flippy>
                <div/>
              </main>
            </HomeCarousel> 
          );
        })}
      </Carousel>
      );
        // <main className="animated fadeIn" className="nuka-flippy-container">
        //   <Carousel className="nuka-flippy-container__carousel">
        //     {this.state.flashcard.map(item => {
        //       return (
        //         <Flippy
        //           key={item.id}
        //           flipOnHover={false}
        //           flipOnClick={true}
        //           flipDirection="horizontal"
        //           ref={r => (this.Flippy = r)}
        //           style={{ width: "400px", height: "200px" }}
        //         >
        //           <FrontSide style={{ backgroundColor: "#93bbde" }}>
        //             <p>{item.front}</p>
        //           </FrontSide>

        //           <BackSide style={{ backgroundColor: "#66b361" }}>
        //             <p>{item.back}</p>
        //           </BackSide>
        //         </Flippy>
        //       );
        //     })}
        //   </Carousel>
        // </main>

    }
    return (
      <div style={{height: "100%"}}>
        {this.props.user && <Redirect to="/profile" />}
        <nav className="navbar justify-content-between">
          <a 
            href="https://github.com/do-kevin/Project-Three" 
            target="_blank" 
            rel="noopener noreferrer"
            data-balloon="Link to this project's GitHub repository" 
            data-balloon-pos="right"
          >
            <img id="app-logo" src={require("../img/github.png")} alt="github logo"/>
          </a>
          <Login handleUserLogin={this.props.handleUserLogin} />
        </nav>
        <figure className="jumbotron banner-image animated fadeIn">
          <div className="banner-text">
            <h1 className="app-name noselect">Zephyr Node</h1>
            <br />
          </div>
        </figure>
        <section className="search-container">
          <Search handleFunction={this.searchTags} displayPublicDecks={this.displayPublicDecks} viewPublicDecks={this.displayPublicDecks}/>
        </section>
        <section>
          <Row id="render-decks" className="animated fadeIn">
            {renderDecks}
          </Row>
        </section>
        
        <main className="container text-center" style={{marginTop: 0}}>
        <h1 className="text-center display-3"
          style={{fontWeight: 500}}
          >Features</h1>
          <div className="row" style={{margin: "30px auto 0 auto"}}>
          <Container className="feature-containers">
            <div className="col">
              <div className="card feature-cards animated slideInLeft">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-layer-group" />
                  </h1>
                  <h5 className="card-title">Flashcards</h5>
                  <p className="card-text text-left">
                    Create decks of flashcards with associated tags. Type in the question on the front and the answer on the back of the flashcard. You can set your decks to private or leave them public. Keep your mind sharp for the big exam by quizzing yourself and flipping the flashcard to reveal the answer you created.
                  </p>
                </div>
              </div>
            </div>
            </Container>
            <Container className="feature-containers">
            <div className="col">
              <div className="card feature-cards animated slideInRight">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-feather" />
                  </h1>
                  <h5 className="card-title">Notes</h5>
                  <p className="card-text text-left">
                    Ideas and information swimming around in your head? Capture all of them here. Type and save whatever you want, whether it's business or personal, for future reference. You can include URLs, images, and video links.
                  </p>
                </div>
              </div>
            </div>
            </Container>
            </div>
            <div className="row" style={{margin: "30px auto 0 auto"}}>
            <Container className="feature-containers">
            <div className="col">
              <div className="card feature-cards animated slideInLeft">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-list" />
                  </h1>
                  <h5 className="card-title">Lists</h5>
                  <p className="card-text text-left">
                      Prioritize what you intend to do for the day, week, month or whenever by organizing a list of tasks.
                  </p>
                </div>
              </div>
              <br />
            </div>
            </Container>
            <Container className="feature-containers">
            <div className="col">
              <br />
              <div className="card feature-cards animated slideInRight" style={{marginTop: "-23px"}}>
                <div className="card-body feature-cards">
                  <h1>
                    <i className="far fa-calendar-alt" />
                  </h1>
                  <h5 className="card-title">Reminders</h5>
                  <p className="card-text text-left">
                      Select a time and day to send yourself a reminder of an upcoming event, so you don't panick and miss it.
                  </p>
                </div>
              </div>
              <br />
            </div>
            </Container>
            </div>
            <Container className="last-container">
            <div className="col">
              <br />
              <div className="card feature-cards animated zoomIn" style={{marginTop: "-40px"}}>
                <div className="card-body feature-cards">
                  <h1>
                    <i className="far fa-comment" />
                  </h1>
                  <h5 className="card-title">SMS</h5>
                  <p className="card-text text-left">
                      Provides a text messaging feature for both decks and reminders. Need to remind yourself about an event? Turn on the option to send yourself an alert. Want to keep your memory sharp? Our app will send you each question with an answer following after, depending on which deck you choose.
                  </p>
                </div>
              </div>
              <br />
            </div>
            </Container>
          </main>
        </div>
    );
  }
}

export default Home;
