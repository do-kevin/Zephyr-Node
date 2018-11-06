import React from "react";
import axios from "axios";
import "../css/Quote.css"

const Quote = () => {

  var quote = "Something wholesome and motivational.";
  var author = "Anonymous";

  axios.get(
    "/quotes"
  ).then((res) => {
    var random = Math.floor(Math.random() * res.data.length);
    quote = res.data[random].quote;
    author = res.data[random].author;
  });

  return (
    <p className="quote"> "{quote}" - {author} </p>
  )
};

export default Quote;