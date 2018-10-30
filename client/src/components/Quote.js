import React from "react";
import axios from "axios";
import "../css/Quote.css"

const Quote = () => {

  let quote = "";
  let author = "";

  // axios.get(
  //   // `/api/...`
  // ).then((res) => {
  //   var random = Math.floor(Math.random() * 30) + 1;
  //   quote = res.quote[random];
  //   author = res.author[random];

    return (
      <p className="lead"> "{quote}" - {author} </p>
    )
  // })
};

export default Quote;