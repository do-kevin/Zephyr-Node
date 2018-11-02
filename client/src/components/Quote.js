import React from "react";
import axios from "axios";
import "../css/Quote.css"

const Quote = () => {

  let quote = "Something wholesome and motivational.";
  let author = "Anonymous";

  axios.get(
    // `/quotes/...`
  ).then((res) => {
    var random = Math.floor(Math.random() * 30) + 1;
    quote = res[random].quote;
    author = res[random].author;
  });

  return (
    <p className="lead"> "{quote}" - {author} </p>
  )
};

export default Quote;