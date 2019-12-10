import React, { PropTypes, Component } from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import MatTable from './MatTable';
import StudentFormDialog from '../FormDialog/StudentFormDialog';
import './style.css';
import { SnackbarProvider } from 'notistack';

import * as Api from '../../util/Api';

export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			students: []
		};
	}

	componentWillMount = async () => {
		let resp = await Api.getStudents();
		if (resp.success) {
			this.setState({ isLoading: false, students: resp.students });
		}
	};

	render() {
		return (
			<SnackbarProvider maxSnack={5}>
				<div className='App'>
					<NavBar />
					{this.state.isLoading ? null : <MatTable students={this.state.students} />}
					<StudentFormDialog />
				</div>
			</SnackbarProvider>
		);
	}
}
