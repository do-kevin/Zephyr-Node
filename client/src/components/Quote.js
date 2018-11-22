import React from "react";
import "../css/Quote.css"

const Quote = () => {

  let quotes = [
    { quote: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
    { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { quote: "Self-belief and hard work will always earn you success.", author: "Virat Kohli" },
    { quote: "If people only knew how hard I’ve worked to gain my mastery, it wouldn’t seem so wonderful at all.", author: "Michelangelo" },
    { quote: "I’ve failed over and over and over again in my life. And that is why I succeed.", author: "Michael Jordan" }
  ]

  var random = Math.floor(Math.random() * quotes.length);
  var quote = quotes[random].quote;
  var author = quotes[random].author;

  // axios.get(
  //   "/quotes"
  // ).then(res => {
  //   console.log(res);
  //   var random = Math.floor(Math.random() * res.data.length);
  //   quote = res.data[random].quote;
  //   author = res.data[random].author;
  // });

  return (
    <p className="quote"> "{quote}" - {author} </p>
  )
};

export default Quote;