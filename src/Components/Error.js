import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Error extends Component {
    render() {
        let { type, description } = this.props;
        return (
            <>
                <div style={{ margin: '0px', padding: '0px', backgroundColor: '#3B3B98', fontFamily: 'cardo , serif' }}>
                    <div style={{ margin: '0px' }}>
                        <div class="col-md-12 d-flex flex-column justify-content-center align-items-center text-white vh-100">
                            <h1 style={{ fontSize: '180px' }}>404</h1>
                            <h4 style={{ paddingBottom: "20px", fontFamily: 'Lemonada,cursive' }}>{type}</h4>
                            <p style={{ fontFamily: "Lemonada", textAlign: 'center,cursive' }}>{description}</p>
                            <Link to="/general">Back To Home</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
