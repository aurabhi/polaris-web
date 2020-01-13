Cypress.Commands.add('wipeInitialSetup', () => {

	let wipe = () => {
		cy.request('PUT', '/api/settings', {
			users: [],
			mount_dirs: []
		})
		cy.clearCookies()
	}

	cy.request('GET', '/api/initial_setup')
		.then((r) => {
			if (!r.body.has_any_users) {
				wipe()
			} else {
				cy.request('POST', '/api/auth', {
					username: 'testUser',
					password: 'testPassword'
				}).then(wipe)
			}
		})
})

Cypress.Commands.add('completeInitialSetup', () => {

	const waitForCollectionIndex = () => {
		cy.request('/api/browse')
			.then((resp) => {
				if (resp.status == 200) {
					const body = JSON.parse(resp.body)
					if (body[0].variant == 'Directory') {
						return
					}
				}
				waitForCollectionIndex()
			})
	}

	cy.request('GET', '/api/initial_setup')
		.then((r) => {
			if (r.body.has_any_users) {
				return
			}
			cy.request('PUT', '/api/settings', {
				users: [{
					name: 'testUser',
					password: 'testPassword',
					admin: true
				}],
				mount_dirs: [{
					source: 'tests/collection',
					name: 'Test'
				}]
			})
			cy.login()
			waitForCollectionIndex()
		})

	cy.clearCookies()
})

Cypress.Commands.add('login', () => {
	cy.request('POST', '/api/auth', {
		username: 'testUser',
		password: 'testPassword'
	})
})
