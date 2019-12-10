import React, { PropTypes, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import * as Api from '../../util/Api';

export default class MatTable extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			rowsPerPage: 5,
			page: 0
		};
	}

	setStudents = async students => {
		this.setState({ rows: students });
	};

	handleChangePage = (event, newPage) => {
		this.setState({ page: newPage });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value, page: 0 });
	};

	openEditer = s => {
		let student = {
			id: s.id,
			firstName: s.first_name,
			lastName: s.last_name,
			status: s.status
		};
		this.props.onEditStudentFormDialog(student);
	};

	confirmDelete = async student => {
		let resp = await Api.deleteStudents(student.id);
		if (resp.success) {
			this.props.onDeleteStudent();
		}
	};

	render() {
		return (
			<div className='container'>
				<div className='row margin-30'>
					<div className='col-md-12'>
						<h2>Student</h2>
					</div>
					<div className='col-md-12 margin-top-30'>
						<Paper className='center-screen'>
							<Table aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>First name</TableCell>
										<TableCell align='right'>Last name</TableCell>
										<TableCell align='right'>Status</TableCell>
										<TableCell align='right'></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{this.state.rows
										.slice(
											this.state.page * this.state.rowsPerPage,
											(this.state.page + 1) * this.state.rowsPerPage
										)
										.map(row => (
											<TableRow>
												<TableCell component='th' scope='row'>
													<a className='link-to' onClick={() => this.openEditer(row)}>
														{row.first_name}
													</a>
												</TableCell>
												<TableCell align='right'>{row.last_name}</TableCell>
												<TableCell align='right'>{row.status}</TableCell>
												<TableCell align='right'>
													<Button
														variant='contained'
														color='secondary'
														onClick={() => this.confirmDelete(row)}
														startIcon={<DeleteIcon />}>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPageOptions={[1, 5, 10, 25]}
								component='div'
								count={this.state.rows.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
							/>
						</Paper>
					</div>
				</div>
			</div>
		);
	}
}
