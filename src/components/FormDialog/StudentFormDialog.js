import React, { PropTypes, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import './style.css';

import * as Api from '../../util/Api';

export default class StudentFormDialog extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			isNewRecord: true
		};
	}

	open = isOpen => {
		this.setState({ open: isOpen });
	};

	setNewRecord = isNewRecord => {
		this.setState({ isNewRecord: isNewRecord });
	};

	setStudent = student => {
		this.setState({
			id: student.id || 0,
			firstName: student.firstName,
			lastName: student.lastName,
			status: student.status
		});
	};

	createStudent = async () => {
		let resp = await Api.createStudents(this.state);
		if (resp.success) {
			this.props.onSaveStudent(resp.student);
			this.setState({ open: false });
		}
	};

	updateStudent = async () => {
		let resp = await Api.updateStudents(this.state.id, this.state);
		if (resp.success) {
			this.props.onSaveStudent(resp.student);
			this.setState({ open: false });
		}
	};

	render() {
		return (
			<Dialog
				open={this.state.open}
				onClose={() => this.open(false)}
				aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>
					{this.state.isNewRecord ? 'New' : 'Edit'} Student
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To create or update student to this website, please enter your frist name, last name and
						status here. We will send updates occasionally.
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
					<Button variant='outlined' onClick={() => this.open(false)} color='secondary'>
						Cancel
					</Button>
					<Button
						variant='outlined'
						onClick={() => (this.state.isNewRecord ? this.createStudent() : this.updateStudent())}
						color='primary'>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
