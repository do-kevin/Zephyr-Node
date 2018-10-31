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
        // let flashcard = document.querySelectorAll(".flashcard"); 

        console.dir(this.refs.cardList);
        let test = this.refs.cardList.getElementsByTagName("li").length;
        let lastCard = this.refs.cardList.getElementsByTagName("li").length - 1; 
        console.log(test);
        console.log(`Last card position: ${lastCard}`);

        document.querySelector(".previous-btn").addEventListener("click", function() {
            console.log("hit");

            var appendToList = () => {
                if( document.querySelector(".flashcard").classList.contains("activeNow") ) {

                    let slicedCard = document.querySelector(".flashcard").slice(0, 1).classList.add("transformPrev");

                    document.querySelector(".flashcard").slice(lastCard).classList.remove("activeNow");
                    this.refs.cardList.append(slicedCard);

                }

                
            }

            this.refs.cardList.getElementsByTagName("li").classList.remove("transformPrev").lastChild.innerHTML.classList.add("activeNow");
            setTimeout(function() {
                appendToList();
            }, 150);
            
        })
    }

  render() {

    return (
      <div>
        <Sidebar />
        <Search />

        <div className="deck">
            <a href="#" type="button" className="previous-btn"><i className="fas fa-angle-double-left"></i></a>
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
          <a href="#" className="next-btn"><i className="fas fa-angle-double-right"></i></a>
        </div>
      </div>
    );
  }
}

export default Decks;
