// Page one of the Flashcards section

import React from "react";
import Flippy, { FrontSide, BackSide} from "react-flippy";

// Components
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

class Decks extends React.Component {

    render() {
        return (

            <div>
                <Sidebar />
                <Search />

                <Flippy
                    flipOnHover={false}
                    flipOnClick={true}
                    flipDirection="horizontal"
                    ref={(r) => this.Flippy = r}
                    style={{width: "400px", height: "200px"}}>

                    <FrontSide
                        style={{backgroundColor: "#93bbde"}}>
                        Front: Question
                    </FrontSide>

                    <BackSide
                        style={{backgroundColor: "#66b361"}}>
                        Back: Answer
                    </BackSide>
                </Flippy>
            </div>

        );
    }
}

export default Decks;