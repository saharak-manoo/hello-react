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
