import React, { Component } from 'react'

export default class Country extends Component {

    constructor() {
        super();
        this.state = {
            countries: []
        }
    }

    async componentDidMount() {
        let url = "https://api.first.org/data/v1/countries";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ countries: parsedData.country })
    }

    render() {
        return (
            <div class="dropdown-center">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Centered dropdown
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Action two</a></li>
                    <li><a class="dropdown-item" href="#">Action three</a></li>
                </ul>
            </div>
        )
    }
}
