import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Carasol from './Carasol';


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
  }

  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  capitalFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }



  articles = []
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,

    }
    document.title = `${this.capitalFirst(this.props.category)}- NewsNow`


  }

  async updatePage() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(40)
    let parsedData = await data.json()
    console.log(parsedData)
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)


  }


  async componentDidMount() {
    this.updatePage()
  }
  handlePrev = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3265fa9d31ed4446a6089eca00cf0081&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({ loading: true })
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updatePage()



  }
  handleNext = async () => {
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    // } else {



    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3265fa9d31ed4446a6089eca00cf0081&page=${this.state.page + 1
    //     }&pageSize=${this.props.pageSize}`
    //   this.setState({ loading: true })
    //   let data = await fetch(url)
    //   let parsedData = await data.json()
    //   console.log(parsedData)
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }

    this.setState({ page: this.state.page + 1 })
    this.updatePage()
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    })

  };



  render() {
    return (


      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: "90px", fontFamily: 'Chomsky, sans-serif', color: '#fff', fontSize: '3rem'}}>NewsNow - Top <span className="highlight">{this.capitalFirst(this.props.category)}</span> Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll style={{ overflow: 'hidden' }}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <Carousel width="80rem" autoPlay={true} showThumbs={false} interval={2000} infiniteLoop={true} showArrows={true} height="90%" showStatus={false} stopOnHover={true} swipeable={true}>
          {this.state.articles.slice(0, 5).map((item)=> {
            return <Carasol title={item.title} url={item.urlToImage}/>
          })}
          </Carousel>
        
          <div className="container" style={{ overflow: 'hidden', marginTop: '3rem'}}>
            <div className="row" style={{margin: "15px"}}> 

              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description} url={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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