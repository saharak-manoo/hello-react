import React, { PropTypes, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

import * as Api from '../../util/Api';

export default class MatTable extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			firstName: '',
			lastName: '',
			status: 'กำลังศึกษา'
		};
	}

	handleClick = isOpen => {
		this.setState({ open: isOpen, firstName: '', lastName: '', status: 'กำลังศึกษา' });
	};

	createStudent = async () => {
		let resp = await Api.createStudents(this.state);
		if (resp.success) {
			this.setState({ open: false, firstName: '', lastName: '', status: 'กำลังศึกษา' });
		}
	};

	render() {
		return (
			<div className='btn-bottom'>
				<Fab color='primary' onClick={() => this.handleClick(true)} aria-label='add'>
					<AddIcon />
				</Fab>

				<Dialog
					open={this.state.open}
					onClose={() => this.handleClick(false)}
					aria-labelledby='form-dialog-title'>
					<DialogTitle id='form-dialog-title'>New student</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To create student to this website, please enter your frist name, last name and status
							here. We will send updates occasionally.
						</DialogContentText>
						<form noValidate autoComplete='off'>
							<div className='row'>
								<div className='col-md-6'>
									<TextField
										autoFocus
										margin='dense'
										id='first_name'
										label='First name'
										type='text'
										value={this.state.firstName}
										onChange={event => {
											const { value } = event.target;
											this.setState({ firstName: value });
										}}
										fullWidth
									/>
								</div>
								<div className='col-md-6'>
									<TextField
										margin='dense'
										id='last_name'
										label='Last name'
										type='text'
										value={this.state.lastName}
										onChange={event => {
											const { value } = event.target;
											this.setState({ lastName: value });
										}}
										fullWidth
									/>
								</div>
								<br />
								<div className='col-md-12'>
									<InputLabel id='select-helper-label'>Status</InputLabel>
									<Select
										labelId='select-label'
										id='select'
										value={this.state.status}
										onChange={event => {
											const { value } = event.target;
											this.setState({ status: value });
										}}
										autoWidth
										fullWidth>
										<MenuItem value={'กำลังศึกษา'}>กำลังศึกษา</MenuItem>
										<MenuItem value={'จบการศึกษา'}>จบการศึกษา</MenuItem>
										<MenuItem value={'ลาออก'}>ลาออก</MenuItem>
									</Select>
								</div>
							</div>
						</form>
					</DialogContent>
					<DialogActions>
						<Button variant='outlined' onClick={() => this.handleClick(false)} color='secondary'>
							Cancel
						</Button>
						<Button variant='outlined' onClick={() => this.createStudent()} color='primary'>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
