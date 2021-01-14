import React, { Component } from 'react';
//import import './App.css';

export default class ZipSearch extends Component {
    constructor() {
        super()
        this.state = {
            ZipCode: "",
            ZipData: [],
            true: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            ZipCode: event.target.value
        })

        fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
            .then(res => {
                if (res.ok) {
                    this.setState({ true: true })
                    res.json()
                        .then((result) => {
                            this.setState({ ZipData: [...result] })
                        })
                }
                else
                    this.setState({ true: false })
            })



    }

    render() {
        return (
            <form className="body">
                <div>
                    <header className="App-header">
                        <h1>Zip Code Search</h1>
                    </header>
                </div>
                <br></br>
                <input type="text" name="ZipCode" onChange={this.handleChange} />
                <br></br>
                {<h2>{this.state.true ? 'Results' : 'No Results'}</h2>}
                {this.state.true ? this.state.ZipData.map(item => (
                    <div key={item.RecordNumber} id="stateTable">
                        <div>{item.City}, {item.State}
                            <div>
                                Country: {item.Country}
                                <br></br>
                                Location: {item.Location}
                                <br></br>
                                Population: {item.EstimatedPopulation}
                                <br></br>
                                Wages: {item.TotalWages}
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                )) : ''}
            </form>
        )
    }
}