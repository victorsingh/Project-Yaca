import * as DataPoint from 'data-point'
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import anime from 'animejs'
import glamorous, { Div, H1, Img } from 'glamorous'


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
        console.log(acc)
        this.setState({node: acc.value})
      })
  }

  componentDidMount = () => {
    this.rendered = true
  }

  animateMe = (r) => {
    // anime({
    //   targets: r,
    //   translateX: 200,
    // });
  }

  renderCatData(){
    return (
      <Div css = {
        { backgroundColor: 'black', display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridGap: 10,
          gridAutoRows: 200,
          gridTemplateAreas:
            `". . a a a a . ."
             ". . a a a a . ."
             ". . a a a a . ."
             ". c c c c c c ."`,
          alignItems: 'start',
        }
       } ref = {(ref) => this.animateMe(ref)}>
        <Img css = {{ gridArea: 'a'}} width = '600' height = '600' src = { this.state.node.images.url }/>  
        <H1 css = {{color: 'white', fontFamily: 'Impact', gridArea: 'c' }}> { this.state.node.trivial.fact } </H1>
      </Div>
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
