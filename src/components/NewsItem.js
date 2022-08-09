import React, { Component } from 'react'
import img from "../img.jpg"

export class NewsItem extends Component {
  render() {
    let { title, description, url, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card mb-4" >
        <img src={url ? url : img} className="card-img-top" alt="..." />
        <div className="card-body" style={{backgroundColor:"#FAF9F6"}}>
          <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '84%', zIndex: '1'}}>
            {source}
          </span></h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">by {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
          <a href={newsUrl} target="_blank" className="btn  btn-primary btn-dark btn-sm">Read More..</a>
        </div>
      </div></div>
    )
  }
}

export default NewsItem