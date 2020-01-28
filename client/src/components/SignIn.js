import React, {Component} from "react"
import connect from "react-redux/es/connect/connect";
import { Field , reduxForm} from "redux-form";
import Id from "./Id";
import Pass from "./Pass";
import {openSnackbar} from "./Notifier";
import { signIn, setMemo } from '../actions';
import { Button, Grid, CircularProgress, Paper } from "@material-ui/core";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.state = {
            loading: false
        };
    }

    async onSignIn({id, pass}) {
        this.setState({loading: true});
        const taskFn = 'get_memo(string,string)';
        const taskArgs = [
            [id, 'string'],
            [pass, 'string'],
        ];
        this.props.enigma.computeTask(taskFn, taskArgs)
            .then((output) => {
                let memo = this.props.enigma.enigma.web3.eth.abi.decodeParameter('string', output);
                this.props.signIn({ id: id, pass: pass });
                this.props.setMemo(memo);
                openSnackbar({message: 'signin successed'})
            })
            .catch((e) => {
                openSnackbar({message: 'signin failed'})
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }
    render() {
        let button;
        if (this.state.loading) {
            button = (
                <CircularProgress/>
            );
        } else {
            button = (
                <Button
                    onClick={this.props.handleSubmit(this.onSignIn)}
                    variant="contained"
                    type="submit"
                    color="primary"
                >
                    Sign in
                </Button>
            );
        }
        return (
            <Paper>
                <form>
                    <Grid item xs
                        style={{ padding: "1rem" }}
                    >
                        <Field
                            name="id"
                            component={Id}
                            props={{
                                id: "signin_id"
                            }}
                        />
                    </Grid>
                    <Grid item xs
                        style={{ padding: "1rem" }}
                    >
                        <Field
                            name="pass"
                            component={Pass}
                            props={{
                                id: "signin_pass"
                            }}
                        />
                    </Grid>
                    <Grid item xs
                        style={{ padding: "1rem" }}
                    >
                        {button}
                    </Grid>
                </form>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        enigma: state.enigma,
    }
}

export default connect(
    mapStateToProps,
    {
        signIn,
        setMemo
    }
    )(reduxForm({
    form: 'signIn',
})(SignIn));