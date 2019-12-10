export async function getStudents() {
	try {
		const resp = await fetch('/api/students', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		let response = await resp.json();
		if (response) {
			return response;
		}
	} catch (e) {
		console.warn(e);
	}
}

export async function createStudents(params) {
	try {
		const resp = await fetch('/api/students', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ student: params })
		});

		let response = await resp.json();
		if (response) {
			return response;
		}
	} catch (e) {
		console.warn(e);
	}
}
