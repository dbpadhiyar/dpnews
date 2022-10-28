import React, { Component } from 'react'
import spinner from '../GIF/loading.gif'

export default class Loader extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={spinner} alt='spinner' />
            </div>
        )
    }
}
