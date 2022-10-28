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
                    -- Select --
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">India</a></li>
                    <li><a class="dropdown-item" href="#">U.S.A</a></li>
                    <li><a class="dropdown-item" href="#">Spain</a></li>
                </ul>
            </div>
        )
    }
}
