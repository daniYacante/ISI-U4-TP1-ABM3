import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactTable from "./components/ContactTable";
import styles from "./styles/App.module.css";

function App() {
	const [contacts, setContacts] = useState(() => {
		const savedContacts = localStorage.getItem("contacts");
		if (savedContacts) {
			return JSON.parse(savedContacts);
		}
		return [];
	});
	const [editContact, setEditContact] = useState(null);
	const [searchTerm, setSearchTerms] = useState("");

	const addContact = (contact) => {
		if (editContact) {
			setContacts(
				contacts.map((c) =>
					c.email === editContact.email ? contact : c,
				),
			);
			setEditContact(null);
		} else {
			setContacts([...contacts, contact]);
		}
	};

	const deleteContact = (email) => {
		setContacts(contacts.filter((contact) => contact.email !== email));
	};

	const editContactHandler = (contact) => {
		setEditContact(contact);
	};

	const filteredContacts = contacts.filter(
		(contact) =>
			contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			contact.phone.includes(searchTerm),
	);

	return (
		<div className={styles.appContainer}>
			<h1 className={styles.heading}>Libreta de contactos</h1>
			<input
				type="text"
				placeholder="Buscar Contactos"
				value={searchTerm}
				onChange={(e) => setSearchTerms(e.target.value)}
				className={styles.searchInput}
			/>
			<div className={styles.mainContent}>
				<ContactForm
					addContact={addContact}
					editContact={editContact}
				/>
				<ContactTable
					contacts={filteredContacts}
					deleteContact={deleteContact}
					editContact={editContactHandler}
				/>
			</div>
		</div>
	);
}

export default App;
