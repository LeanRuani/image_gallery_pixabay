import React from "react";
import "../styles/index.css";
import Credential from "../assets/credentials";
import Controls from "../containers/Controls.jsx";

const url_pixa = `https://pixabay.com/api/?key=${Credential.url_key}&`;

class Gallery extends React.Component {
  state = {
    images: {
      hits: [],
    },
    load: true,
    error: null,
    url: url_pixa + "per_page=20",
    page: 1,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentWillUpdate() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      const res = await fetch(this.state.url);
      const data = await res.json();
      this.setState({
        load: false,
        images: {
          hits: data.hits,
        },
      });
      console.log(this.state.images);
    } catch (error) {
      this.setState({
        load: false,
        error: error,
      });
    }
  };

  urlChanger = (c) => {
    const url = url_pixa + `${c}`;
    console.log(url);
    this.setState({
      url: url,
      page: 1 + 1,
    });
    this.componentWillUpdate();
  };

  render() {
    return (
      <>
        <input
          type="button"
          value="backgrounds"
          onClick={() => this.urlChanger("category=backgrounds")}
        />
        <input
          type="button"
          value="nature"
          onClick={() => this.urlChanger("nature")}
        />
        <input
          type="button"
          value="fashion"
          onClick={() => this.urlChanger("fashion")}
        />
        <input
          type="button"
          value="science"
          onClick={() => this.urlChanger("science")}
        />
        <input
          type="button"
          value="education"
          onClick={() => this.urlChanger("education")}
        />
        <input
          type="button"
          value="health"
          onClick={() => this.urlChanger("health")}
        />
        <input
          type="button"
          value="music"
          onClick={() => this.urlChanger("music")}
        />
        <input
          type="button"
          value="animals"
          onClick={() => this.urlChanger("animals")}
        />

        <div className="gallery-image">
          {this.state.images.hits.map((i) => (
            <div className="gallery-item">
              <img className="img" src={i.webformatURL} alt={i.type} />
            </div>
          ))}
        </div>

        <input
          type="button"
          value="Next ->"
          onClick={() => this.urlChanger(`page=${this.state.page + 1}`)}
        />
      </>
    );
  }
}

export default Gallery;
