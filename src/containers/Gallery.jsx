import React, { useState, useEffect } from "react";
import "../styles/index.css";
import Credential from "../assets/credentials";
import Loader from "./Loader.jsx";
import styled from "styled-components";

const Rates = styled.span`
  padding: 0;
  position: relative;
  margin: 0;
  font-size: 20px;
  background-color: #bdbdbd;
  border-radius: 4px;
  font-weight: bold;
`;

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  float: right;
  margin: 10px;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  text-align: center;
`;

const Category = styled.h2`
  margin: auto;
  padding: 0;
  text-align: center;
`;

const Page = styled.h3`
  margin: auto;
  padding: 0;
  text-align: center;
`;

const Categories = styled.div`
  margin: 40px;
  text-align: center;
  input {
    background-color: #6e738f;
    cursor: pointer;
    border: none;
    color: white;
    padding: 5px 15px;
    text-align: center;
    border-radius: 4px;
    border-right: 1px solid #e7e7e7;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
`;

const Gallery = () => {
  const url_pixa = `https://pixabay.com/api/?key=${Credential.url_key}&per_page=18`;
  const [url, setURL] = useState(url_pixa);
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [category, setCategory] = useState("Popular");

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
    setURL(url_pixa + `&page=${page}&category=${category}`);
  };

  const changeCategory = (c) => {
    setCategory(c);
    setPage(2);
    setURL(url_pixa + `&page=${page}&category=${c}`);
  };

  return (
    <>
      <Categories>
        <input
          type="button"
          value="Backgrounds"
          onClick={() => changeCategory("backgrounds")}
        />
        <input
          type="button"
          value="Nature"
          onClick={() => changeCategory("nature")}
        />
        <input
          type="button"
          value="Science"
          onClick={() => changeCategory("science")}
        />
        <input
          type="button"
          value="Education"
          onClick={() => changeCategory("education")}
        />
        <input
          type="button"
          value="Health"
          onClick={() => changeCategory("health")}
        />
        <input
          type="button"
          value="Music"
          onClick={() => changeCategory("music")}
        />
        <input
          type="button"
          value="Buildings"
          onClick={() => changeCategory("buildings")}
        />
        <input
          type="button"
          value="Food"
          onClick={() => changeCategory("food")}
        />
        <input
          type="button"
          value="Industry"
          onClick={() => changeCategory("industry")}
        />
        <input
          type="button"
          value="Animals"
          onClick={() => changeCategory("animals")}
        />
      </Categories>
      <Category>{category.toUpperCase()}</Category>
      <Page>{page - 1}</Page>
      <div className="gallery-image">
        {isLoading && <Loader />}
        {image.map((i) => (
          <div key={i.id} className="gallery-item">
            <img className="img" src={i.webformatURL} alt={i.type} />
            <Rates>
              ⭐ {i.favorites} ❤️ {i.likes} 👀 {i.views}
            </Rates>
          </div>
        ))}
      </div>

      <Button onClick={() => nextPage()}>Next page ➡️</Button>
    </>
  );
};

export default Gallery;
