import React, {Component} from "react"
import connect from "react-redux/es/connect/connect";
import Grid from "@material-ui/core/Grid";
import { Message } from "semantic-ui-react";
import Paper from "@material-ui/core/Paper";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Memo from "./Memo";

class SecretAccount extends Component {
    render() {
        if (this.props.enigma.contract === null) {
            return (
                <div>
                    <Message color="red">SecretAccount secret contract not yet deployed...</Message>
                </div>
            );
        }
        if (this.props.account === null) {
            return (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper>
                                <SignUp />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper>
                                <SignIn />
                            </Paper>
                        </Grid>
                        {/*
                        <Grid item xs={12}>
                            <Paper>
                                <Memo/>
                            </Paper>
                        </Grid>
                        */}
                    </Grid>
                </div>
            );
        } else {
            return (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Memo/>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        enigma: state.enigma,
        account: state.account
    }
}

export default connect(mapStateToProps, {})(SecretAccount);