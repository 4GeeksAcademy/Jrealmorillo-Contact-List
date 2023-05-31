import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { AddContact } from "./views/addContact";
import { ContactList } from "./views/contactList";
import { ModifyContact } from "./views/modifyContact";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes >
						<Route path="/" element={<ContactList />} />
						<Route path="/addcontact" element={<AddContact />} />
						<Route path="/modifycontact/:id" element={<ModifyContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		// </div>
	);
};

export default injectContext(Layout);
