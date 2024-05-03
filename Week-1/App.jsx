import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchedQuote, setSearchedQuote] = useState('');

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = () => {
    setIsLoading(true);
    setSearchAuthor(''); // Reset search field
    fetch('https://api.quotable.io/random')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch quote');
        }
        return res.json();
      })
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const searchQuoteByAuthor = () => {
    setIsLoading(true);
    fetch(`https://api.quotable.io/quotes?author=${searchAuthor}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch quote by author');
        }
        return res.json();
      })
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomQuote = data.results[randomIndex];
        setSearchedQuote(randomQuote.content);
        setAuthor(randomQuote.author);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleSearchChange = (event) => {
    setSearchAuthor(event.target.value);
  };

  return (
    <div className="App">
      {isLoading ? (
      <p>enter the author</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="quote">
          <h2>{searchedQuote || quote}</h2>
          <small>- {author}</small>
          <br />
          <br />
          <input className="search-bar"
            type="text"
            placeholder=" Author Name"
            value={searchAuthor}
            onChange={handleSearchChange}
          />
          <button className="btn" onClick={searchQuoteByAuthor}>
            Search Quote by Author
          </button>
          <button className="btn" onClick={fetchRandomQuote}>
            Generate New Quote
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

