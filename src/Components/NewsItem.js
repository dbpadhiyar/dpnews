import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, newsAuthor, newsTime, newsSource } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{ left: "50%", zIndex: '1' }}>
                        {newsSource}
                    </span>
                    <img src={imageUrl ? imageUrl : "https://talksport.com/wp-content/uploads/sites/5/2022/10/RF-TALKSPORT-CELTIC-RANGERS.jpg?strip=all&quality=100&w=1500&h=1000&crop=1"} className="card-img-top" alt="Image" height={'200px'} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted"><b>AUTHOR : </b> {newsAuthor} <br /> <b>TIME :</b> {new Date(newsTime).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem