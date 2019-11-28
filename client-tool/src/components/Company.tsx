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

export type CompanyDispatchProps = {
    addTestNode: (nodeName: string) => any;
    addManagedCompany: (companyName: string) => any;
    loadCompany: (companyId: number) => any;
    convertNode: (node: Node) => any;
}

export type NodeProps = {
    node: Node;
    userCount: number;
    roleCount: number;
    teamCount: number;
    errorMessage? : string;
}

export type CompanyStateProps = {
    company?: Enterprise;
    classes?: any;
    nodes: NodeProps[];
}

type CompanyProps = CompanyDispatchProps & CompanyStateProps;

type CompanyState = {}

const styles = {
    root: {
        marginTop: "2rem",
    },
    nodes: {},
    testForm: {
        display: "flex",
        alignItems: "center"
    },
    fab: {
        // margin: "1rem"
    },
    nameInput: {
        margin: "1rem",
    },
    errorMessage: {
        color: "red"
    }
};

class Company extends React.Component<CompanyProps, CompanyState> {

    private classes: any;

    render() {
        this.classes = this.props.classes;
        return (
            <div>
                {
                    this.props.company &&
                    this.renderCompany()
                }
            </div>
        )
    }

    private renderNode(props: NodeProps) {
        let secondary = props.errorMessage
            ? <div className={this.classes.errorMessage}>{props.errorMessage}</div>
            : <div>{`Users: ${props.userCount} Roles: ${props.roleCount} Teams: ${props.teamCount}`}</div>;
        return (
            <ListItem key={props.node.node_id}>
                <ListItemText
                    primary={props.node.displayName}
                    secondary={secondary}
                >
                    <div>{props.errorMessage}</div>
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={_ => this.convertNode(props.node)}>
                        <GavelIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    private renderManagedCompany(company: ManagedCompany) {
        return (
            <ListItem key={company.mc_enterprise_id}>
                <ListItemText
                    primary={company.mc_enterprise_name}
                    secondary={`Id: ${company.mc_enterprise_id} Users: ${company.number_of_users} Seats: ${company.number_of_seats} Product: ${company.product_id}`}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={_ => this.loadCompany(company)}>
                        <GavelIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    private renderCompany() {
        let firstLevelNodes = this.props.nodes;
        let managedCompanies = this.props.company!.data.managed_companies || [];
        return (
            <Container className={this.classes.container} maxWidth="md">
                <Paper className={this.classes.root}>
                    <List>{firstLevelNodes.map(x => this.renderNode(x))}</List>
                    {this.renderAddNodeForm()}
                </Paper>
                <Paper className={this.classes.root}>
                    <List>{managedCompanies.map(x => this.renderManagedCompany(x))}</List>
                    {this.renderAddCompanyForm()}
                </Paper>
            </Container>
        );
    }

    private renderAddNodeForm() {
        return <form
            className={this.classes.testForm}
            onSubmit={(e: any) => {
                e.preventDefault();
                this.addTestNode(e.target.node_name.value)
            }}>
            <TextField
                className={this.classes.nameInput}
                variant="outlined"
                required={true}
                id="node_name"
                label="Node Name"
            />
            <Fab
                variant="extended"
                type="submit"
                className={this.classes.fab}
            >
                Add Test Node
            </Fab>
        </form>;
    }

    private renderAddCompanyForm() {
        return <form
            className={this.classes.testForm}
            onSubmit={(e: any) => {
                e.preventDefault();
                this.addManagedCompany(e.target.company_name.value)
            }}>
            <TextField
                className={this.classes.nameInput}
                variant="outlined"
                required={true}
                id="company_name"
                label="Company Name"
            />
            <Fab
                variant="extended"
                type="submit"
                className={this.classes.fab}
            >
                Add Managed Company
            </Fab>
        </form>;
    }

    private convertNode(node: Node) {
        this.props.convertNode(node);
    }

    private addTestNode(nodeName: string) {
        this.props.addTestNode(nodeName);
    }

    private addManagedCompany(companyName: string) {
        this.props.addManagedCompany(companyName);
    }

    private loadCompany(company: ManagedCompany) {
        this.props.loadCompany(company.mc_enterprise_id);
    }
}

export default withStyles(styles)(Company)
