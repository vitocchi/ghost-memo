import React, {Component} from "react"
import connect from "react-redux/es/connect/connect";
import Notifier from "./Notifier";
import { Field , reduxForm} from "redux-form";
import Id from "./Id";
import Pass from "./Pass";
import { signIn, setMemo } from '../actions';
import { Button, Grid, CircularProgress } from "@material-ui/core";

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
        let task = await this.props.enigma.computeTask(taskFn, taskArgs);
        let memo = this.props.enigma.enigma.web3.eth.abi.decodeParameter('string', task.decryptedOutput);
        console.log(memo);
        console.log(parseInt(task.decryptedOutput, 16));
        this.setState({loading: false});
        this.props.signIn({id: id, pass: pass});
        this.props.setMemo(memo);
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
            <form>
                <Notifier />
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