import React, { Component } from 'react'
import spinner from '../GIF/loading.gif'

export default class Loader extends Component {
    render() {
        return (
            <div className="text-center">
                <img className='my-5' src={spinner} alt='Loader' />
            </div>
        )
    }
}
