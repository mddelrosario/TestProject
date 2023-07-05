import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class App extends Component {
    state = {
        text: "",
        base64String: "",
        isEncoding: false,
    };
    
    handleTextChange = (event) => {
        this.setState({
            text: event.target.value,
        });
    };

    handleConvertClick = () => {
        this.setState({
            isEncoding: true,
            base64String: "",
        });

        fetch(`converter/${this.state.text}`)
            .then(response => response.text())
            .then(encodedText => {
                // Add each character to the encoded string one by one, with a random delay of 1-5 seconds.
                for (let i = 0; i < encodedText.length; i++) {
                    const min = 1;
                    const max = 5;
                    const randomTimeInMs = Math.floor(Math.random() * (max - min + 1) + min);
                 
                    setTimeout(() => {
                        this.setState({ base64String: this.state.base64String += encodedText[i] })
                    }, randomTimeInMs * 1000);

                    this.setState({ isEncoding: false });
                }
            });
    }

    handleCancelClick = () => {
        this.setState({
            isEncoding: false,
        });
    };

    render() {
        return (
            <div>
                <h1>Text Base64 Converter</h1>
                <input
                    type="text"
                    placeholder="Enter text here..."
                    className="form-control"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <hr></hr>
                <button
                    className="btn btn-info"
                    disabled={this.state.isEncoding}
                    onClick={this.handleConvertClick}
                >
                    Convert
                </button>
                <button
                    className="btn btn-danger"
                    disabled={!this.state.isEncoding}
                    onClick={this.handleCancelClick}
                >
                    Cancel
                </button>
                <hr></hr>
                <textarea
                    className="form-control"
                    rows="3"
                    value={this.state.base64String}
                />
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);