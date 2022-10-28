import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: 8,
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
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NEWSDP - ${this.capitelizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6aa8636d0fcb4dc0bffdec5ce38dfb72&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    LoadMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6aa8636d0fcb4dc0bffdec5ce38dfb72&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults
            })
    };

    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '70px 0px 30px 0px' }}>Top {this.capitelizeFirstLetter(this.props.category)} Headline </h2>
                {this.state.loading && <Loader />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.LoadMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Loader />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title : "No Title Provided"} description={element.description ? element.description : "No description Provided"} imageUrl={element.urlToImage} newsUrl={element.url} newsAuthor={element.author ? element.author : "Unknown"} newsTime={element.publishedAt ? element.publishedAt : new Date()} newsSource={element.source.name ? element.source.name : "Unknown Source"} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News