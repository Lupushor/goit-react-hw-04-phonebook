import { useState, useEffect } from 'react';
import { ContactForm } from './Form/ContactForm';
import { ContactList } from './ContactList/ContatcList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Layout, Phonebook, PhonebookTitle } from './App.styled';
import initialContacts from './contactsData';

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === data.name.toLowerCase() ||
          contact.number === data.number
      )
    ) {
      return alert(`${data.name} or ${data.number} is already in contacts.`);
    }

    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Layout>
      <Phonebook>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm onSubmit={addContact} />
      </Phonebook>

      <div>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handleChange} />
        <ContactList contacts={visibleContacts()} onDelete={deleteContact} />
      </div>
    </Layout>
  );
};
