import React from 'react';

import './test.css'

class Test extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     years: 26,
  //     name: 'NewName:' + this.props.name
  //   }
  //   this.nextYear = ()=>{  // Записать метод в конструктов. Будет работать без bind
  //     this.setState((state, props) =>{
  //       return {
  //         years: ++state.years,
  //         name: props.name
  //       };
  //     })
  //   }
  // }

  // or

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     years: 26,
  //     name: 'NewName:' + this.props.name
  //   }
  //   this.nextYear = this.nextYear.bind(this); 
  // }
  // nextYear(){
  //   this.setState((state, props) => {
  //     return {
  //       years: ++state.years,
  //       name: props.name
  //     };
  //   });
  // }

  // or

  state = {
    years: 26,
    name: 'NewName:' + this.props.name
  }
  nextYear = ()=> {
    this.setState((state, props) => {
      return {
        years: ++state.years,
        name: props.name
      };
    });
  }
  render(){
    const {surname, link} = this.props,
    {name, years} = this.state;
    return (
      <React.Fragment>
      <button onClick={this.nextYear}></button>
      <h1>My name is {name}, surname - {surname}, years - {years}</h1>
      <a href={link}>My profile</a>
      </React.Fragment>
    )
  }
}

const All = ()=>{
  return (
    <>
        <Test name='Leonid1' surname='Shkrabov' link='https://facebook.com' />,
        <Test name='Leonid2' surname='Shkrabov' link='https://facebook.com' />,
        <Test name='Leonid3' surname='Shkrabov' link='https://facebook.com' />,
    </>
  )
};

export default All;