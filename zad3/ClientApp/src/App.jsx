import React, {Component} from 'react';
import "antd/dist/antd.css";

export default class App extends Component {
    state = {result: null};

    async componentDidMount() {
        const result = await fetch("ConnectFour").then(res => res.text());

        console.log(result);

        this.setState({result});
    }

    render() {
        return (
            this.state.result ? <h1>{this.state.result}</h1> : <h1>Loading or not working</h1>
        );
    }
}
