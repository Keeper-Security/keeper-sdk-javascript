import * as React from "react";
import {Company as Enterprise, Node, ManagedCompany} from "keeperapi";
import {withStyles} from "@material-ui/styles";
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem, {ListItemProps} from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import GavelIcon from '@material-ui/icons/Gavel';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";

type ExtraProps = {
    classes: any;
    convertNode: (node: Node) => any;
    addTestNode: (nodeName: string) => any;
}

export type CompanyStateProps = {
    company?: Enterprise;
}

type CompanyProps = ExtraProps & CompanyStateProps;

type CompanyState = {}

const styles = {
    root: {
        marginTop: "2rem",
    },
    nodes: {},
    testNodeForm: {
        display: "flex",
        alignItems: "center"
    },
    fab: {
        // margin: "1rem"
    },
    nodeName: {
        margin: "1rem",
    }
};

class Company extends React.Component<CompanyProps, CompanyState> {

    render() {
        const {classes} = this.props;
        return (
            <div>
                {
                    this.props.company &&
                    this.renderCompany(classes, this.props.company)
                }
            </div>
        )
    }

    private renderNode(company: Enterprise, node: Node) {
        let userCount = company.data.users.reduce((sum, user) => {
            return user.node_id === node.node_id ? ++sum : sum
        }, 0);
        let roleCount = company.data.roles.reduce((sum, role) => {
            return role.node_id === node.node_id ? ++sum : sum
        }, 0);
        let teamCount = company.data.teams.reduce((sum, team) => {
            return team.node_id === node.node_id ? ++sum : sum
        }, 0);
        return (
            <ListItem key={node.node_id}>
                <ListItemText
                    primary={node.displayName}
                    secondary={`Users: ${userCount} Roles: ${roleCount} Teams: ${teamCount}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={_ => this.convertNode(node)}>
                        <GavelIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    private static renderManagedCompany(company: ManagedCompany) {
        return (
            <ListItem key={company.mc_enterprise_id}>
                <ListItemText
                    primary={company.mc_enterprise_name}
                    secondary={`Users: ${company.number_of_users} Seats: ${company.number_of_seats} Product: ${company.product_id}`}
                />
            </ListItem>
        )
    }

    private renderCompany(classes: any, company: Enterprise) {
        let firstLevelNodes = company.data.nodes[0].nodes || [];
        let managedCompanies = company.data.managed_companies || [];
        return (
            <Container className={classes.container} maxWidth="md">
                <Paper className={classes.root}>
                    <List>{firstLevelNodes.map(x => this.renderNode(company, x))}</List>
                    <form
                        className={classes.testNodeForm}
                        onSubmit={(e: any) => {
                            e.preventDefault();
                            this.addTestNode(e.target.node_name.value)
                        }}>
                        <TextField
                            className={classes.nodeName}
                            variant="outlined"
                            required={true}
                            id="node_name"
                            label="Node Name"
                        />
                        <Fab
                            variant="extended"
                            type="submit"
                            className={classes.fab}
                        >
                            Add Test Node
                        </Fab>
                    </form>
                </Paper>
                <Paper className={classes.root}>
                    <List>{managedCompanies.map(x => Company.renderManagedCompany(x))}</List>
                </Paper>
            </Container>
        );
    }

    private convertNode(node: Node) {
        this.props.convertNode(node);
    }

    private addTestNode(nodeName: string) {
        this.props.addTestNode(nodeName);
    }
}

export default withStyles(styles)(Company)
