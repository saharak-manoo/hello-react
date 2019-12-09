import React from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import Button from '@material-ui/core/Button';
import './style.css';

function App() {
	return (
		<div className='App'>
			<NavBar />
			<Button variant='contained' color='primary'>
				Hello World
			</Button>
		</div>
	);
}

export default App;
