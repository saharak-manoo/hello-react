import React, { PropTypes, Component } from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import MatTable from './MatTable';
import StudentFormDialog from '../FormDialog/StudentFormDialog';
import './style.css';
import { SnackbarProvider } from 'notistack';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Api from '../../util/Api';

export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			students: [],
			student: {
				id: 0,
				firstName: '',
				lastName: '',
				status: 'กำลังศึกษา'
			}
		};
	}

	studentFormDialog = React.createRef();
	studentMatTable = React.createRef();

	componentWillMount = async () => {
		let resp = await Api.getStudents();
		if (resp.success) {
			this.studentMatTable.current.setStudents(resp.students.reverse());
			this.setState({ isLoading: false });
		}
	};

	reloadTable = async () => {
		let resp = await Api.getStudents();
		if (resp.success) {
			this.studentMatTable.current.setStudents(resp.students.reverse());
		}
	};

	createStudentFormDialog = () => {
		let modal = this.studentFormDialog.current;
		if (modal) {
			modal.setNewRecord(true);
			modal.setStudent(this.state.student);
			modal.open(true);
		}
	};

	editStudentFormDialog = async student => {
		let modal = this.studentFormDialog.current;
		if (modal) {
			modal.setNewRecord(false);
			modal.setStudent(student);
			modal.open(true);
		}
	};

	render() {
		return (
			<SnackbarProvider maxSnack={5}>
				<div className='App'>
					<NavBar />
					<MatTable
						ref={this.studentMatTable}
						onEditStudentFormDialog={this.editStudentFormDialog}
						onDeleteStudent={this.reloadTable}
					/>
					<div className='btn-bottom'>
						<Fab color='primary' onClick={() => this.createStudentFormDialog()} aria-label='add'>
							<AddIcon />
						</Fab>
					</div>

					<StudentFormDialog ref={this.studentFormDialog} onSaveStudent={this.reloadTable} />
				</div>
			</SnackbarProvider>
		);
	}
}
