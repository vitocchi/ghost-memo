import React, {Component} from "react"
import connect from "react-redux/es/connect/connect";
import Notifier, {openSnackbar} from "./Notifier";
import { Field , reduxForm} from "redux-form";
import Id from "./Id";
import Pass from "./Pass";
import { signIn } from '../actions';
import { Button, Grid, CircularProgress } from "@material-ui/core";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSignUp = this.onSignUp.bind(this);
        this.state = {
            loading: false
        };
    }

    async onSignUp({id, pass}) {
        this.setState({loading: true});
        const taskFn = 'registor(string,string)';
        const taskArgs = [
            [id, 'string'],
            [pass, 'string'],
        ];
        let task = await this.props.enigma.computeTask(taskFn, taskArgs);
        if (parseInt(task.decryptedOutput, 16) === 1) {
            openSnackbar({ message: 'Task succeeded: signup success' })
        } else {
            openSnackbar({ message: 'Task succeeded: signup failed' })
        }
        this.setState({loading: false});
        this.props.signIn({id: id, pass: pass});
    }
    render() {
        let button;
        if (this.state.loading) {
            button = (
                <CircularProgress />
            );
        } else {
            button = (
                <Button
                    onClick={this.props.handleSubmit(this.onSignUp)}
                    variant="contained"
                    type="submit"
                    color="secondary"
                >
                    Sign up
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
                            id: "signup_id"
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
                            id: "signup_pass"
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

export default connect(mapStateToProps, {signIn})(reduxForm({
    form: 'signUp',
})(SignUp));