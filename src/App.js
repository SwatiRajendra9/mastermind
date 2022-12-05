import React from "react";
import './App.css';
import  { useState } from 'react';
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";


var colour;
let currentRow=0;
let countred=0;
let countblack = 0;

class Master extends React.Component {
  constructor(props) {
    super(props);
    this.state = { master : [] , colour_palette : ['red', 'green', 'blue', 'gold', 'brown', 'orange', 'black', 'pink'] , 
    codebreaker : [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]],
    hintarray : [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]],
    isActive:true, isWinner : false,
    
    }
  }
  


  masterplays = () => {
   
    for(let k=0;k<4;k++) {
    const random = Math.floor(Math.random() * this.state.colour_palette.length);
    this.state.master.push(this.state.colour_palette[random]);
    }
    console.log('master:',this.state.master);
    this.setState({isActive:false});
    
    
  }

  pickred = () => {
    colour =  'red';
  }

  pickgreen = () => {
    colour =  'green';
  }

  pickblue = () => {
    colour = 'blue';
  }

  pickgold = () => {
    colour =  'gold';
  }

  pickbrown = () => {
    colour =  'brown';
  }

  pickorange = () => {
    colour =  'orange';
  }

  pickblack = () => {
    colour =  'black';
  }

  pickpink = () => {
    colour = 'pink';
  }

  drop = (i,j) => { 
   if(currentRow == i) {
   let a = this.state.codebreaker.slice(); 
   a[i][j] = colour;
   this.setState({codebreaker : a});
   }
  }

  
  check_position = () => {
    
    countblack = 0;
    countred = 0;
    let temp = [];
    

    while(temp.length > 0) {
      temp.pop();
    }
    for(let x=0;x<4;x++){
      for(let y=0;y<4;y++){
        if(this.state.master[x] == this.state.codebreaker[currentRow][y] && x==y) {
          temp[y] = 'red';
        }
      }
    }

    for(let a=0;a<4;a++) {
      for(let b=0;b<4;b++){
        if(this.state.master[a] == this.state.codebreaker[currentRow][b] && a !== b) {
          if(temp[b] == 'red') {
            console.log('');
          }
          else {
            temp[b] = 'black';
          }
          
        }
      }
    }

    for(let i=0;i<4;i++){
      if(temp[i]=='red'){
        countred=countred + 1;
      }
    }
   
    console.log(countred);

    for(let j=0;j<4;j++) {
      if(temp[j] == 'black') {
        countblack=countblack+1;
      }
    }
    
    console.log(countblack);
    
    let z=this.state.hintarray.slice();
    for(let n=0;n<temp.length;n++) {
      if(temp[n] == 'red') {
        z[currentRow][n] = 'red';
      }
      else if(temp[n] == 'black') {
        z[currentRow][n] = 'black';
      }
      else {
        console.log('');
      }
    }
    
    this.setState({hintarray : z});
  
    

    currentRow++;
      

  }

  render() {
    
    return (
      <div id='main'>
        <h1>Mastermind</h1>

        <div id="mastermind" >

                {this.state.isWinner ? null : <div id="circle5"></div> }
                {this.state.isWinner ? null : <div id="circle6"></div> }
                {this.state.isWinner ? null : <div id="circle7"></div> }
                {this.state.isWinner ? null : <div id="circle8"></div> }
                
                
                

                {this.state.isWinner ? <div id="circle1" style={{backgroundColor : this.state.master[0]}}></div> : null }
                {this.state.isWinner ? <div id="circle2" style={{backgroundColor : this.state.master[1]}}></div> : null }
                {this.state.isWinner ? <div id="circle3" style={{backgroundColor : this.state.master[2]}}></div> : null }
                {this.state.isWinner ? <div id="circle4" style={{backgroundColor : this.state.master[3]}}></div> : null }

        </div>

        

        <div id='subcontainer1'>
                <div id='circle1' onClick={this.drop.bind(this,0,0)} style={{backgroundColor : this.state.codebreaker[0][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,0,1)} style={{backgroundColor : this.state.codebreaker[0][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,0,2)} style={{backgroundColor : this.state.codebreaker[0][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,0,3)} style={{backgroundColor : this.state.codebreaker[0][3]}}></div>
                
                

                <div id='hintcircleone'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[0][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[0][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[0][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[0][3]}}></div>
                </div>  

                <button id='button' onClick={this.check_position}>Check</button>   
        </div>

        <div id='subcontainer2'>
                <div id='circle1' onClick={this.drop.bind(this,1,0)} style={{backgroundColor : this.state.codebreaker[1][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,1,1)} style={{backgroundColor : this.state.codebreaker[1][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,1,2)} style={{backgroundColor : this.state.codebreaker[1][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,1,3)} style={{backgroundColor : this.state.codebreaker[1][3]}}></div>

                <div id='hintcircletwo'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[1][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[1][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[1][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[1][3]}}></div>
                </div>     

                <button id='button' onClick={this.check_position}>Check</button>   
        </div>

        <div id='subcontainer3'>
                <div id='circle1' onClick={this.drop.bind(this,2,0)} style={{backgroundColor : this.state.codebreaker[2][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,2,1)} style={{backgroundColor : this.state.codebreaker[2][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,2,2)} style={{backgroundColor : this.state.codebreaker[2][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,2,3)} style={{backgroundColor : this.state.codebreaker[2][3]}}></div>

                <div id='hintcirclethree'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[2][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[2][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[2][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[2][3]}}></div>
                </div>      

                <button id='button' onClick={this.check_position}>Check</button>   
        </div>

        <div id='subcontainer4'>
                <div id='circle1' onClick={this.drop.bind(this,3,0)} style={{backgroundColor : this.state.codebreaker[3][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,3,1)} style={{backgroundColor : this.state.codebreaker[3][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,3,2)} style={{backgroundColor : this.state.codebreaker[3][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,3,3)} style={{backgroundColor : this.state.codebreaker[3][3]}}></div>

                <div id='hintcirclefour'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[3][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[3][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[3][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[3][3]}}></div>
                </div>     

                <button id='button' onClick={this.check_position}>Check</button>    
        </div>

        <div id='subcontainer5'>
                <div id='circle1' onClick={this.drop.bind(this,4,0)} style={{backgroundColor : this.state.codebreaker[4][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,4,1)} style={{backgroundColor : this.state.codebreaker[4][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,4,2)} style={{backgroundColor : this.state.codebreaker[4][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,4,3)} style={{backgroundColor : this.state.codebreaker[4][3]}}></div>

                <div id='hintcirclefive'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[4][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[4][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[4][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[4][3]}}></div>
                </div>   

                <button id='button' onClick={this.check_position}>Check</button>   
        </div>

        <div id='subcontainer6'>
                <div id='circle1' onClick={this.drop.bind(this,5,0)} style={{backgroundColor : this.state.codebreaker[5][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,5,1)} style={{backgroundColor : this.state.codebreaker[5][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,5,2)} style={{backgroundColor : this.state.codebreaker[5][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,5,3)} style={{backgroundColor : this.state.codebreaker[5][3]}}></div>

                <div id='hintcirclesix'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[5][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[5][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[5][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[5][3]}}></div>
                </div>  

                <button id='button' onClick={this.check_position}>Check</button>    
        </div>

        <div id='subcontainer7'>
                <div id='circle1' onClick={this.drop.bind(this,6,0)} style={{backgroundColor : this.state.codebreaker[6][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,6,1)} style={{backgroundColor : this.state.codebreaker[6][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,6,2)} style={{backgroundColor : this.state.codebreaker[6][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,6,3)} style={{backgroundColor : this.state.codebreaker[6][3]}}></div>

                <div id='hintcircleseven'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[6][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[6][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[6][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[6][3]}}></div>
                </div>  

                <button id='button' onClick={this.check_position}>Check</button>    
        </div>

        <div id='subcontainer8'>
                <div id='circle1' onClick={this.drop.bind(this,7,0)} style={{backgroundColor : this.state.codebreaker[7][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,7,1)} style={{backgroundColor : this.state.codebreaker[7][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,7,2)} style={{backgroundColor : this.state.codebreaker[7][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,7,3)} style={{backgroundColor : this.state.codebreaker[7][3]}}></div>

                <div id='hintcircleeight'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[7][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[7][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[7][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[7][3]}}></div>
                </div>  

                <button id='button' onClick={this.check_position}>Check</button>    
        </div>

        <div id='subcontainer9'>
                <div id='circle1' onClick={this.drop.bind(this,8,0)} style={{backgroundColor : this.state.codebreaker[8][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,8,1)} style={{backgroundColor : this.state.codebreaker[8][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,8,2)} style={{backgroundColor : this.state.codebreaker[8][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,8,3)} style={{backgroundColor : this.state.codebreaker[8][3]}}></div>

                <div id='hintcirclenine'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[8][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[8][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[8][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[8][3]}}></div>
                </div> 

                <button id='button' onClick={this.check_position}>Check</button>      
        </div>

        <div id='subcontainer10'>
                <div id='circle1' onClick={this.drop.bind(this,9,0)} style={{backgroundColor : this.state.codebreaker[9][0]}}></div>
                <div id='circle2' onClick={this.drop.bind(this,9,1)} style={{backgroundColor : this.state.codebreaker[9][1]}}></div>
                <div id='circle3' onClick={this.drop.bind(this,9,2)} style={{backgroundColor : this.state.codebreaker[9][2]}}></div>
                <div id='circle4' onClick={this.drop.bind(this,9,3)} style={{backgroundColor : this.state.codebreaker[9][3]}}></div>

                <div id='hintcircleten'>
                  <div id="hintcircle1" style={{backgroundColor : this.state.hintarray[9][0]}}></div>
                  <div id="hintcircle2" style={{backgroundColor : this.state.hintarray[9][1]}}></div>
                  <div id="hintcircle3" style={{backgroundColor : this.state.hintarray[9][2]}}></div>
                  <div id="hintcircle4" style={{backgroundColor : this.state.hintarray[9][3]}}></div>
                </div>  

                <button id='button' onClick={this.check_position}>Check</button>     
        </div>

        <div id="colorpalette" >
                <div id="red" onClick={this.pickred}></div>
                <div id="green" onClick={this.pickgreen}></div>
                <div id="blue" onClick={this.pickblue}></div>
                <div id="gold" onClick={this.pickgold}></div>
                <div id="brown" onClick={this.pickbrown}></div>
                <div id="orange" onClick={this.pickorange}></div>
                <div id="black" onClick={this.pickblack}></div>
                <div id="pink" onClick={this.pickpink}></div>
        </div>

        <br></br>
        

        {this.state.isActive ? <button id='start' onClick={this.masterplays} >Play</button> : null }

      </div>

    )
  }
}

export default Master;



         

