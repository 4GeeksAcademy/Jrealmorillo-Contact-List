
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			contact: "",
		},
		actions: {

			loadContactList: () => {

				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/jreal")
					.then(response => response.json())
					.then(result => {
						setStore({ ...getStore(), contacts: result })
					})
					.catch(error => console.log('error', error));
			},


			
			createContact: () => {

				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let raw = JSON.stringify({
					full_name: "",
					email: "",
					agenda_slug: "jreal",
					address: "",
					phone: ""
				});

				let requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				fetch("https://assets.breatheco.de/apis/fake/contact/", requestOptions)
					.then(response => response.json())
					.then(result => {
						setStore({ contacts: [...getStore().contacts, result] });
					})
					.catch(error => console.log('error', error));
			},


			
			updateContact: (id, contact) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let requestOptions = {
					method: 'PUT',
					headers: myHeaders,
					body: JSON.stringify(contact),
					redirect: 'follow'
				};

				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, requestOptions)
					.then(response => response.json())
					.then(result => {
						console.log(result)
						setStore({ contact: result });
					})
					.catch(error => console.log('error', error));
			},

			deleteContact: (id) => {
				let myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
			  
				let requestOptions = {
				  method: 'DELETE',
				  headers: myHeaders,
				  redirect: 'follow'
				};
			  
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, requestOptions)
				  .then(response => response.json())
				  .then(result => {
					const updatedContacts = getStore().contacts.filter(contact => contact.id !== id);
					setStore({ contacts: updatedContacts });
					getActions().loadContactList();
				  })
				  .catch(error => console.log('error', error));
			  },	
		}
	};
};

export default getState;

