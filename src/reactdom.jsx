import React from 'react';
import ReactDOM from 'react-dom';

import warData from './data.js';
import img from './WRLD-EPS-01-0011.jpg';
import './scss/main.scss';

document.addEventListener('DOMContentLoaded', function(){

    class WarsTable extends React.Component {
        constructor(props) {
            super(props)
        }
        render(){
            const conflict = this.props.selectedConflict;
            return (
                <div className="table">
                    <p className="tableText">country</p>
                    <hr></hr>
                    <p className="tableData">{conflict.country}</p>
                    <hr></hr>
                    <p className="tableText">start</p>
                    <hr></hr>
                    <p className="tableData">{conflict.start}</p>
                    <hr></hr>
                    <p className="tableText">death toll</p>
                    <hr></hr>
                    <p className="tableData">{conflict.cumulativeFatalities}</p>
                    <hr></hr>
                    <p className="tableText">more</p>
                    <hr></hr>
                    <p className="tableData">
                        <a href={conflict.link} target="blank" style={{backgroundColor:"rgb(249,249,249)", color:"black"}}>Wikipedia</a>
                    </p>
                    <hr></hr>
                </div>
            )
        }
    }

    class WarsButtons extends React.Component {
        constructor(props) {
            super(props)
        }
        render(){
            const buttonDots = this.props.conflictData.map((e,i) => {
                // console.log(e.id === this.props.selectedConflict.id)
                return (
                    <div key={i} onClick={() => this.props.updateSelectedConflict(e.id)} className={`dotStyle buttonPosition_${i+1} ${e.id === this.props.selectedConflict.id ? "clicked" : ""}`}>
                        {/* {e.id} */}
                    </div>
                )
            })
            return(
                <>
                    {buttonDots}
                </>
            )
        }
    }

    class WorldMap extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                conflictArray : warData,
                selectedConflict: warData[0]
            }
        }

        updateSelectedConflict = (id) => {
            const selected = this.state.conflictArray.find((el) => {
                return el.id === id
            })
            this.setState({
                selectedConflict: selected
            });
        }

        componentDidUpdate() {
            // console.log('NEW CONFLICT: ', this.state.selectedConflict);
        }

        render (){
            return (
                <div>
                    <p className="mapTitle">ongoing armed conflicts - february 2019</p>
                    <div className="worldMapStyle">
                        <WarsTable selectedConflict={this.state.selectedConflict}  />
                        <WarsButtons updateSelectedConflict={this.updateSelectedConflict} selectedConflict={this.state.selectedConflict} conflictData={this.state.conflictArray} />
                        <img src={img} alt="world map" />
                    </div>
                    <p className="mapFooter">World with Countries - Single Color by <a href="https://freevectormaps.com/?ref=atr" target="blank" style={{color: "white", textDecoration: "none"}}>FreeVectorMaps.com</a></p>
                </div>
            )
        }
    }

    class App extends React.Component {
        render (){
            return <WorldMap/>
        }
    }

    ReactDOM.render(
            <App/>,
        document.getElementById('app')
    );
});
