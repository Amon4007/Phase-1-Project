document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const bookList = document.getElementById('book-list');

    // API URL for Google Books
    const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    // Event listener for the search button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchBooks(query);
        }
    });

    // Fetch books from the Google Books API
    async function fetchBooks(query) {
        try {
            const response = await fetch(`${API_URL}${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            displayBooks(data.items); // Google Books API returns items array
        } catch (error) {
            console.error('Error fetching books:', error);
            bookList.innerHTML = '<p class="error">Something went wrong. Please try again later.</p>';
        }
    }

    // Display books on the page
    function displayBooks(books) {
        bookList.innerHTML = ''; // Clear previous results

        if (!books || books.length === 0) {
            bookList.innerHTML = '<p class="no-results">No books found. Try another search.</p>';
            return;
        }

        books.forEach(bookData => {
            const book = bookData.volumeInfo;
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');

            // Book cover image or placeholder
            const bookCover = book.imageLinks && book.imageLinks.thumbnail
                ? book.imageLinks.thumbnail
                : 'https://via.placeholder.com/150';

            // Create book item content
            bookItem.innerHTML = `
                <img src="${bookCover}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Author: ${book.authors ? book.authors.join(', ') : 'Unknown'}</p>
                <p>Published Date: ${book.publishedDate || 'N/A'}</p>
            `;

            // Append each book item to the book list
            bookList.appendChild(bookItem);
        });
    }
});
