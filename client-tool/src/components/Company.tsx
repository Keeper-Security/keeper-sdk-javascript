import * as React from "react";
import {Vault} from "keeperapi";
import {withStyles} from "@material-ui/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type ExtraProps = {
    classes: any;
}

export type CompanyStateProps = {
    vault?: Vault;
}

type CompanyProps = ExtraProps & CompanyStateProps;

type CompanyState = {}

const styles = {
    root: {
        marginTop: "2rem"
    }
};

class Company extends React.Component<CompanyProps, CompanyState> {

    render() {
        const {classes} = this.props;
        return (
            <div>
                {
                    this.props.vault &&
                    Company.renderVault(classes, this.props.vault)
                }
            </div>
        )
    }

    private static renderVault(classes: any, vault: Vault) {
        return (
            <Paper className={classes.root}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Login</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Notes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vault.records.map(row => (
                            <TableRow key={row.uid}>
                                <TableCell component="th" scope="row">{row.data.title}</TableCell>
                                <TableCell align="right">{row.data.secret1}</TableCell>
                                <TableCell align="right">{row.data.secret2}</TableCell>
                                <TableCell align="right">{row.data.link}</TableCell>
                                <TableCell align="right">{row.data.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(Company)
