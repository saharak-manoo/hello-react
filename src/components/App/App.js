import React, { PropTypes, Component } from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import MatTable from './MatTable';
import StudentFormDialog from '../FormDialog/StudentFormDialog';
import './style.css';

export default class App extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='App'>
				<NavBar />
				<MatTable />
				<StudentFormDialog />
			</div>
		);
	}
}
