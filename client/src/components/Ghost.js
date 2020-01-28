import React, {Component} from "react"
import connect from "react-redux/es/connect/connect";
import Grid from "@material-ui/core/Grid";
import { Message } from "semantic-ui-react";
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
                    <Grid container spacing={10}>
                        <Grid item xs={12} sm={6}>
                            <SignUp />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SignIn />
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}>
                            <Memo/>
                        </Grid>
                        <Grid item xs={3}>
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