import React, { useState, useEffect } from "react";
import "../styles/index.css";
import Credential from "../assets/credentials";
import Loader from "./Loader.jsx";

const Gallery = () => {
  const url_pixa = `https://pixabay.com/api/?key=${Credential.url_key}&`;
  const [url, setURL] = useState(url_pixa);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.hits);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  });

  const nextPage = () => {
    setPage(page + 1);
    setURL(url_pixa + `page=${page}`);
  };

  return (
    <>
      <button onClick={nextPage}>Load More</button>

      <div className="gallery-image">
        {isLoading && <Loader />}
        {image.map((i) => (
          <div key={i.id} className="gallery-item">
            <img className="img" src={i.webformatURL} alt={i.type} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
