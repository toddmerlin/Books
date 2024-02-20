import { useState, useEffect } from "react";

import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";

export const MainView = () => {
  const [books, setBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Effect that runs when component mounts or dependencies change
    fetch("https://openlibrary.org/search.json?q=star+wars")
      // Initiates a fetch request to Open Library API
      .then((response) => response.json())
      // Converts the response to JSON format
      .then((data) => {
        // Executes when JSON conversion is successful
        const booksfromApi = data.docs.map((doc) => {
          // Maps through each document in the response data
          return {
            // Returns an object for each document
            id: doc.key, // Assigns the document's key as the ID
            title: doc.title, // Assigns the document's title
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            // Constructs an image URL using document's cover ID
            author: doc.author_name?.[0],
            // Assigns the first author's name if available
          };
        });

        setBooks(booksfromApi);
        // Sets the state variable 'books' with the array of books from the API
      });
  }, []);
  // Empty dependency array indicates that this effect should only run once, when the component mounts

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
