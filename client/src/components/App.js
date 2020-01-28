// Imports - React
import React, { Component } from "react";
// Imports - Redux
import connect from "react-redux/es/connect/connect";
// Imports - Frameworks (Semantic-UI and Material-UI)
import { Container, Message } from "semantic-ui-react";
import { withStyles } from "@material-ui/core";
// Imports - Initialize Enigma
import getEnigmaInit from "../utils/getEnigmaInit.js";
// Imports - Components
import Header from "./Header";
import Ghost from "./Ghost";
import "../App.css";
// Imports - Actions (Redux)
import { initializeEnigma } from '../actions';
import EnigmaClient from "../utils/EnigmaClient.js";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class App extends Component {

    async componentDidMount() {
        // Initialize enigma-js client library (including web3)
        const enigma = await getEnigmaInit();
        const accounts = await enigma.web3.eth.getAccounts();
        const contract = await this.initDeployedContract(enigma);
        const enigmaClient = new EnigmaClient(enigma, accounts, contract)
        this.props.initializeEnigma(enigmaClient);
    }

    async initDeployedContract(enigma) {
        const secretContractCount = await enigma.enigmaContract.methods.countSecretContracts().call();
        const deployedGhostAddress = (await enigma.enigmaContract.methods.getSecretContractAddresses(secretContractCount-1, secretContractCount).call())[0];
        return deployedGhostAddress
    }

    render() {
        let body
        if (!this.props.enigma) {
            body = <Message color="red">Enigma setup still loading...</Message>
        }
        else {
            body = <Ghost />
        }
        return (
            <div className="App">
                <Header />
                <Container style={{ marginTop: "1rem" }}>
                    {body}
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { enigma: state.enigma }
};

export default connect(
    mapStateToProps,
    { initializeEnigma }
)(withStyles(styles)(App));
