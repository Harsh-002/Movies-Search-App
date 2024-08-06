const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OWQ4NjJiMWMzMzZjZGFhMTg5NWY5MTJjODYzNWY1NCIsIm5iZiI6MTcyMjkxOTU4Ny4zOTk5NSwic3ViIjoiNjZiMWE5OTRiOGE0OWNiODFmZmMxYzVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.tLSylS32CAUL0Qsr79ZptCaHFJtsmNNWoxlc6WftBqM",
  },
};

const getPopularMovies = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      options
    );
    const data = await res.json();
    console.log(data);
    setPopularMovies(data.results);
  } catch (err) {
    console.log("Something went wrong:" + err);
  }
};

const setPopularMovies = (movies) => {
  const movieCarousel = document.querySelector(".movies-carousel");
  const pagination = document.querySelector(".pagination");
  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie");

    const bgImg = document.createElement("img");
    bgImg.classList.add("bg-img");
    bgImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    );

    const heroImage = document.createElement("div");
    heroImage.classList.add("movie-image");
    heroImage.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    movieItem.appendChild(bgImg);
    movieItem.appendChild(heroImage);
    movieItem.appendChild(movieInfo);

    const movieTitle = document.createElement("h3");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = movie.original_title;

    const rating = document.createElement("span");
    rating.classList.add("rating");
    rating.textContent = `Rating: ${movie.vote_average.toFixed(1)}`;

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = movie.overview;

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(rating);
    movieInfo.appendChild(description);

    movieCarousel.appendChild(movieItem);

    const dot = document.createElement("span");
    dot.classList.add("dot");

    dot.addEventListener("click", () => {
      document.querySelector(".dot.active").classList.remove("active");
      document.querySelector(".movie.active").classList.remove("active");
      dot.classList.add("active");
      movieItem.classList.add("active");

      //Animation fade-in and fade-out
      document
        .querySelector(".movie-image.go-left")
        .classList.remove("go-left");
      document
        .querySelector(".movie-info.go-right")
        .classList.remove("go-right");

      movieItem.childNodes[1].classList.add("go-left");
      movieItem.lastChild.classList.add("go-right");
    });
    pagination.appendChild(dot);
  });

  const firstMovie = movieCarousel.firstChild;
  firstMovie.classList.add("active");

  firstMovie.lastChild.classList.add("go-right");

  firstMovie.childNodes[1].classList.add("go-left");

  pagination.firstChild.classList.add("active");
};

getPopularMovies();
