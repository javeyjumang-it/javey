// Movie data with links
const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genres: ["Action", "Crime", "Drama"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        duration: "152 min",
        link: "https://www.imdb.com/title/tt0468569/"
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genres: ["Action", "Sci-Fi", "Thriller"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        director: "Christopher Nolan",
        cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
        duration: "148 min",
        link: "https://www.imdb.com/title/tt1375666/"
    },
    {
        id: 3,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        genres: ["Drama"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        director: "Frank Darabont",
        cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        duration: "142 min",
        link: "https://www.imdb.com/title/tt0111161/"
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        genres: ["Crime", "Drama"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        director: "Quentin Tarantino",
        cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
        duration: "154 min",
        link: "https://www.imdb.com/title/tt0110912/"
    },
    {
        id: 5,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        genres: ["Action", "Sci-Fi"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        director: "Lana Wachowski, Lilly Wachowski",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        duration: "136 min",
        link: "https://www.imdb.com/title/tt0133093/"
    },
    {
        id: 6,
        title: "Forrest Gump",
        year: 1994,
        rating: 8.8,
        genres: ["Drama", "Romance"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        director: "Robert Zemeckis",
        cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
        duration: "142 min",
        link: "https://www.imdb.com/title/tt0109830/"
    },
    {
        id: 7,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        genres: ["Crime", "Drama"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        director: "Francis Ford Coppola",
        cast: ["Marlon Brando", "Al Pacino", "James Caan"],
        duration: "175 min",
        link: "https://www.imdb.com/title/tt0068646/"
    },
    {
        id: 8,
        title: "Interstellar",
        year: 2014,
        rating: 8.6,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        duration: "169 min",
        link: "https://www.imdb.com/title/tt0816692/"
    },
    {
        id: 9,
        title: "Fight Club",
        year: 1999,
        rating: 8.8,
        genres: ["Drama"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        director: "David Fincher",
        cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
        duration: "139 min",
        link: "https://www.imdb.com/title/tt0137523/"
    },
    {
        id: 10,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
        rating: 8.8,
        genres: ["Action", "Adventure", "Drama"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        director: "Peter Jackson",
        cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
        duration: "178 min",
        link: "https://www.imdb.com/title/tt0120737/"
    },
    {
        id: 11,
        title: "The Hangover",
        year: 2009,
        rating: 7.7,
        genres: ["Comedy"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
        director: "Todd Phillips",
        cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
        duration: "100 min",
        link: "https://www.imdb.com/title/tt1119646/"
    },
    {
        id: 12,
        title: "Superbad",
        year: 2007,
        rating: 7.6,
        genres: ["Comedy"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        director: "Greg Mottola",
        cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse"],
        duration: "113 min",
        link: "https://www.imdb.com/title/tt0829482/"
    },
    {
        id: 13,
        title: "The Conjuring",
        year: 2013,
        rating: 7.5,
        genres: ["Horror", "Mystery", "Thriller"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
        director: "James Wan",
        cast: ["Vera Farmiga", "Patrick Wilson", "Lili Taylor"],
        duration: "112 min",
        link: "https://www.imdb.com/title/tt1457767/"
    },
    {
        id: 14,
        title: "Hereditary",
        year: 2018,
        rating: 7.3,
        genres: ["Drama", "Horror", "Mystery"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A grieving family is haunted by tragic and disturbing occurrences.",
        director: "Ari Aster",
        cast: ["Toni Collette", "Alex Wolff", "Milly Shapiro"],
        duration: "127 min",
        link: "https://www.imdb.com/title/tt7784604/"
    },
    {
        id: 15,
        title: "Toy Story",
        year: 1995,
        rating: 8.3,
        genres: ["Animation", "Adventure", "Comedy"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
        director: "John Lasseter",
        cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
        duration: "81 min",
        link: "https://www.imdb.com/title/tt0114709/"
    },
    {
        id: 16,
        title: "Finding Nemo",
        year: 2003,
        rating: 8.2,
        genres: ["Animation", "Adventure", "Comedy"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
        director: "Andrew Stanton, Lee Unkrich",
        cast: ["Albert Brooks", "Ellen DeGeneres", "Alexander Gould"],
        duration: "100 min",
        link: "https://www.imdb.com/title/tt0266543/"
    },
    {
        id: 17,
        title: "The Notebook",
        year: 2004,
        rating: 7.8,
        genres: ["Drama", "Romance"],
        poster: "https://images.unsplash.com/photo-1489599735734-79b4ba6a1403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
        director: "Nick Cassavetes",
        cast: ["Ryan Gosling", "Rachel McAdams", "James Garner"],
        duration: "123 min",
        link: "https://www.imdb.com/title/tt0332280/"
    },
    {
        id: 18,
        title: "La La Land",
        year: 2016,
        rating: 8.0,
        genres: ["Comedy", "Drama", "Music"],
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
        director: "Damien Chazelle",
        cast: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"],
        duration: "128 min",
        link: "https://www.imdb.com/title/tt3783958/"
    }
];

// DOM elements
const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const modal = document.getElementById('movieModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');
const exploreBtn = document.getElementById('exploreBtn');
const trendingBtn = document.getElementById('trendingBtn');
let currentGenre = 'all'; // Track current selected genre

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayMovies(movies);
    setupEventListeners();
});

// Display movies in the grid
function displayMovies(movieList) {
    moviesGrid.innerHTML = '';
    movieList.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Create a movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>${movie.rating}</span>
            </div>
            <p class="movie-year">${movie.year}</p>
        </div>
        <div class="movie-details" style="display: none;">
            <p class="movie-description">${movie.description}</p>
            <div class="movie-meta">
                <p><strong>Director:</strong> ${movie.director}</p>
                <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
                <p><strong>Duration:</strong> ${movie.duration}</p>
                <p><strong>Genres:</strong> ${movie.genres.join(', ')}</p>
            </div>
            <a href="${movie.link}" target="_blank" class="btn btn-primary">Watch Now</a>
        </div>
    `;

    // Add click event to toggle details
    card.addEventListener('click', () => {
        const details = card.querySelector('.movie-details');
        const isVisible = details.style.display === 'block';
        // Hide all other details first
        document.querySelectorAll('.movie-details').forEach(d => d.style.display = 'none');
        // Toggle this one
        details.style.display = isVisible ? 'none' : 'block';
    });

    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);

    // Modal close
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation buttons
    exploreBtn.addEventListener('click', () => {
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    });

    trendingBtn.addEventListener('click', () => {
        displayMovies(movies.sort((a, b) => b.rating - a.rating));
    });

    // Genre filtering
    document.querySelectorAll('.genre-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const genre = e.currentTarget.dataset.genre;
            filterByGenre(genre);
            // Update current genre
            currentGenre = genre;
            // Update visual feedback
            updateGenreSelection();
            // Scroll to featured section
            document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Handle search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.genres.some(genre => genre.toLowerCase().includes(query))
    );
    displayMovies(filteredMovies);
}

// Filter movies by genre
function filterByGenre(genre) {
    if (genre === 'all') {
        displayMovies(movies);
    } else {
        const filteredMovies = movies.filter(movie =>
            movie.genres.includes(genre.charAt(0).toUpperCase() + genre.slice(1))
        );
        displayMovies(filteredMovies);
    }
}

// Open movie modal (kept for potential future use)
function openModal(movie) {
    modalBody.innerHTML = `
        <div class="modal-movie">
            <img src="${movie.poster}" alt="${movie.title}" class="modal-poster">
            <div class="modal-details">
                <h2>${movie.title} (${movie.year})</h2>
                <div class="modal-rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.rating}</span>
                </div>
                <p class="modal-genres">${movie.genres.join(', ')}</p>
                <p class="modal-description">${movie.description}</p>
                <div class="modal-meta">
                    <p><strong>Director:</strong> ${movie.director}</p>
                    <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
                    <p><strong>Duration:</strong> ${movie.duration}</p>
                </div>
                <a href="${movie.link}" target="_blank" class="btn btn-primary">Watch Now</a>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Add some CSS for modal content
const modalStyles = `
    .modal-movie {
        display: flex;
        gap: 30px;
        max-width: 100%;
    }

    .modal-poster {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
    }

    .modal-details h2 {
        margin-bottom: 10px;
        color: var(--text-color);
    }

    .modal-rating {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 10px;
        color: #ffd700;
    }

    .modal-genres {
        color: var(--text-muted);
        margin-bottom: 20px;
    }

    .modal-description {
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .modal-meta p {
        margin-bottom: 10px;
        color: var(--text-muted);
    }

    @media (max-width: 768px) {
        .modal-movie {
            flex-direction: column;
            align-items: center;
        }

        .modal-poster {
            width: 150px;
            height: 225px;
        }
    }
`;

// Update genre selection visual feedback
function updateGenreSelection() {
    document.querySelectorAll('.genre-card').forEach(card => {
        const genre = card.dataset.genre;
        if (genre === currentGenre) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
