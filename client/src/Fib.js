import React, { Component } from "react";
import axios from 'axios';

class Fib extends Component {
    state = {
        values: {},
        seenIndecies: [],
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchSeenIndecies();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchSeenIndecies() {
        const seenIndecies = await axios.get('/api/values/all');
        this.setState({ seenIndecies: seenIndecies.data });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({ index: '' });
    };

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    renderSeenIndencies() {
        return this.state.seenIndecies
            .map(({ number }) => number)
            .join(', ');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter you index:</label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indecies I have seen:</h3>
                {this.renderSeenIndencies()}

                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;