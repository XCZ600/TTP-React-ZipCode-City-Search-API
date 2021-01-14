import React, { Component } from 'react';
//import import './App.css';

export default class CitySearch extends Component {
    constructor() {
        super()
        this.state = {
            City: "",
            CityData: [],
            true: false
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            City: event.target.value

        })

        fetch("http://ctp-zip-api.herokuapp.com/city/" + event.target.value.toUpperCase())
            .then(res => {
                if (res.ok) {
                    this.setState({ true: true })
                    res.json()
                        .then((result) => {
                            this.setState({ CityData: [...result] })
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
                        <h1>City Search</h1>
                    </header>
                </div>
                <br></br>
                <input type="text" name="city" onChange={this.handleChange} />
                <br></br>
                {<h2>{this.state.true ? 'Results' : 'No Results'}</h2>}
                { this.state.true ? this.state.CityData.map(item => (
                    <div>
                        <div>
                            Zip Code: {item}
                        </div>
                    </div>
                )):''}
            </form>
        )
    }
}