import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: 12,
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }

    //arrow function
    capitelizeFirstLetter = (stringValue) => {
        return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `NEWSDP - ${this.capitelizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        console.log('updated News Called');
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=890d643bc3234b3faddff4116b5d2bee&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
    }

    async componentDidMount() {
        console.log('componentDidMount called');
        this.updateNews();
    }

    handlePrevClick = async () => {
        console.log('Previous Call');
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }


    handleNextClick = async () => {
        console.log('Next Call');
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ page: this.state.page + 1 });
            this.updateNews();
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{ margin: '70px 0px 30px 0px' }}>Top {this.capitelizeFirstLetter(this.props.category)} Headline </h2>
                {this.state.loading && <Loader />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <NewsItem title={element.title ? element.title : "No Title Provided"} description={element.description ? element.description : "No description Provided"} imageUrl={element.urlToImage} newsUrl={element.url} newsAuthor={element.author ? element.author : "Unknown"} newsTime={element.publishedAt ? element.publishedAt : new Date()} newsSource={element.source.name ? element.source.name : "Unknown Source"} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>Previous &larr;</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News