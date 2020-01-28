// Imports - React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Imports - Frameworks (Semantic-UI and Material-UI)
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import connect from "react-redux/es/connect/connect";
import { signOut } from '../actions';
import { Button } from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
});


class Header extends Component {
    render() {
        const { classes } = this.props;
        let id
        if (this.props.account === null) {
            id = (
                <>
                </>
            );
        } else {
            id = (
                <>
                    {this.props.account.id}
                    <Button
                        color="inherit"
                        onClick={this.props.signOut}
                        >
                        signout
                    </Button>
                </>
            );
        }
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="subtitle1"
                            color="inherit"
                        >
                            Enigma Ghost Demo DApp
                        </Typography>
                        <div className={classes.grow}>
                        </div>
                        <span>
                            {id}
                        </span>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps, {signOut})(withStyles(styles)(Header));
