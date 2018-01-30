import * as DataPoint from 'data-point'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import anime from 'animejs'
import glamorous from 'glamorous'


const Wrapper = glamorous.div({
  position:'relative',
})

class CatComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      node: null,
      doms: null
    }
    this.rendered = false
  }

  componentWillMount(){
    // create DataPoint instance

    const dataPoint = DataPoint.create()

    dataPoint.addEntities({
      'request:Facts': {
        url: 'http://localhost:3000/a'
      },
      'request:Images': {
        url: 'http://localhost:3000/b'
      },
      'hash:Images': {
        mapKeys: {
          images: '$response.data.images',
        }
      }
    })
    
    const objectReducer = {
      trivial: ['$fact', 'request:Facts'],
      images: ['$images', 'request:Images | hash:Images', (acc) => {
        const len = acc.value.images.image
        return len[Math.floor(Math.random() * len.length-1)]
      }]
    }

    dataPoint
      .transform(objectReducer)
      .then((acc) => {
        this.setState({node: acc.value})
      })
  }

  componentDidMount = () => {
    this.rendered = true
  }

  animateMe = (r) => {
    anime({
      targets: r,
      translateX: 500,
    });
  }

  renderCatData(){
    return (
      <div ref = {(ref) => this.animateMe(ref)}>
        <h1> { this.state.node.trivial.fact } </h1>
        <img src = { this.state.node.images.url }/>  
      </div>
    )
  }

  render(){
    return (
      <Wrapper >
        <div>
          { this.state.node ? this.renderCatData() : null}
        </div>
      </Wrapper>
    )
  }
}

export default CatComponent
