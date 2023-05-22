import React, { Component } from 'react';
import { ContactForm } from './Form/ContactForm';
import { ContactList } from './ContactList/ContatcList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Layout, Phonebook, PhonebookTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts'); //'contacts' => key
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    //Делаем проверку на одинаковые значения в имени и номере
    if (
      this.state.contacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase() ||
          contact.number === data.number
      )
    ) {
      return alert(`${data.name} or ${data.number} is already in contacts.`);
    }

    //Записываем новые данные
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  //Удаляем данные из списка
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  //Производим поиск в списке
  handelChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  //Выводим список из найденного
  visibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  render() {
    const { filter } = this.state;

    return (
      <Layout>
        <Phonebook>
          <PhonebookTitle>Phonebook</PhonebookTitle>
          <ContactForm onSubmit={this.addContact} />
        </Phonebook>

        <div>
          <h2>Contacts</h2>
          <Filter filter={filter} onChange={this.handelChange} />
          <ContactList
            contacts={this.visibleContact()}
            onDelete={this.deleteContact}
          />
        </div>
      </Layout>
    );
  }
}
