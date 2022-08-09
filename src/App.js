import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavBar } from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  static propTypes = {}

  pageSize =6

  state = {
    progress: 10
  }

  setProgress=(progress)=>{
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        height={2}
        color='#fc0035'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress}  key="general"  pageSize = {this.pageSize} country= "in" category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business"  pageSize = {this.pageSize} country= "in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment"  pageSize = {this.pageSize} country= "in" category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health"  pageSize = {this.pageSize} country= "in" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science"  pageSize = {this.pageSize} country= "in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports"  pageSize = {this.pageSize} country= "in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology"  pageSize = {this.pageSize} country= "in" category="technology"/>}/>

        </Routes>
        </Router>
      </div> 
    )
  }
}

export default App
