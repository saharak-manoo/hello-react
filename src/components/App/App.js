import React, { PropTypes, Component } from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import MatTable from './MatTable';
import StudentFormDialog from '../FormDialog/StudentFormDialog';
import './style.css';
import { SnackbarProvider } from 'notistack';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import * as Api from '../../util/Api';

export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			students: [],
			isOpenFormDialog: false
		};
	}

	studentFormDialog = React.createRef();

	componentWillMount = async () => {
		let resp = await Api.getStudents();
		if (resp.success) {
			this.setState({ isLoading: false, students: resp.students });
		}
	};

	openStudentFormDialog = () => {
		if (this.studentFormDialog.current) {
			this.studentFormDialog.current.open(true);
			this.setState({ isOpenFormDialog: true });
		}
	};

	render() {
		return (
			<SnackbarProvider maxSnack={5}>
				<div className='App'>
					<NavBar />
					{this.state.isLoading ? null : <MatTable students={this.state.students} />}
					<div className='btn-bottom'>
						<Fab color='primary' onClick={() => this.openStudentFormDialog()} aria-label='add'>
							<AddIcon />
						</Fab>
					</div>

					<StudentFormDialog ref={this.studentFormDialog} isOpen={this.state.isOpenFormDialog} />
				</div>
			</SnackbarProvider>
		);
	}
}
