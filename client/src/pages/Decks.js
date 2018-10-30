// Page one of the Flashcards section

import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

// Components
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

// CSS 
import "../css/Decks.css";

class Decks extends React.Component {

    constructor(props) {
        super(props);

        this.refs.cardList;
        
    }

    componentDidMount() {
        console.dir(this.refs.cardList);
        let test = this.refs.cardList.getElementsByTagName("li").length;
        console.log(test);
    }

  render() {

    // let card = document.querySelector(".flashcard");
    // let lastCard = document.querySelector(".card-list .flashcard")
    //                 .getElementsByTagName("li").length - 1;

    // let lastCard = document.querySelector("ul.card-list > li").length;
    // let lastCard = document.querySelector("ul.card-list");

    // console.log(lastCard);

    // console.log(card);
    // console.log(lastCard);
    

    return (
      <div>
        <Sidebar />
        <Search />

        <div className="deck">
            <a href="#" className="previous"><i className="fas fa-angle-double-left"></i></a>
          <ul className="card-list list-unstyled"
                ref="cardList">
            <li className="flashcard">
              <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                ref={r => (this.Flippy = r)}
                style={{ width: "400px", height: "200px" }}
              >
                <FrontSide style={{ backgroundColor: "#93bbde" }}>
                  Front: Question
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  Back: Answer
                </BackSide>
              </Flippy>
            </li>
            <li className="flashcard"> 
              <Flippy
                flipOnHover={false}
                flipOnClick={true}
                flipDirection="horizontal"
                ref={(r) => (this.Flippy = r)}
                style={{ width: "400px", height: "200px" }}
              >
                <FrontSide style={{ backgroundColor: "#93bbde" }}>
                  Front: Question
                </FrontSide>

                <BackSide style={{ backgroundColor: "#66b361" }}>
                  Back: Answer
                </BackSide>
              </Flippy>
            </li>
          </ul>
          <a href="#" className="next"><i className="fas fa-angle-double-right"></i></a>
        </div>
      </div>
    );
  }
}

export default Decks;
