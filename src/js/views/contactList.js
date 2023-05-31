import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faAt, faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactList = () => {


    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadContactList();
    }, []);

    const [showModal, setShowModal] = useState(false)
    const [selectedContactId, setSelectedContactId] = useState(null)


    const handleUpdateContact = (id) => {
        const selectedContact = store.contacts.find(contact => contact.id === id);
        if (selectedContact) {
            actions.updateContact(id, selectedContact);
            navigate(`/modifycontact/${id}`);
        }
    };
    
    const handleDeleteContact = () => {
        setShowModal(false);
        if (selectedContactId) {
          actions.deleteContact(selectedContactId);
        }
      };

    return (
        <>
            <div className="row">
                <div className="container-fluid">
                    <div className="col-8 m-5 d-flex justify-content-end">
                        <Link to="/addcontact">
                            <button type="button" className="btn btn-success btn-lg">Add new contact</button>
                        </Link>
                    </div>
                </div>
            </div>
            {store.contacts.map((contact, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="container-fluid">
                            <div className="d-flex justify-content-around">
                                <div className="card d-flex justify-content-center m-2" style={{ width: "54rem" }}>
                                    <p className="fw-bold d-flex align-items-center justify-content-between m-1" title="Contact name">
                                        {contact.full_name}
                                        <span className="d-flex">
                                            <span className="m-1">
                                            <FontAwesomeIcon icon={faPencil} onClick={() => handleUpdateContact(contact.id)} title="Modify contact"/>
                                            </span>
                                            <span className="ml-auto m-1">
                                                <FontAwesomeIcon icon={faTrashCan} onClick={() => {
                                                    setSelectedContactId(contact.id)
                                                    setShowModal(true)}} data-bs-toggle="modal" data-bs-target="#exampleModal" title="Delete contact"/>
                                            </span>
                                        </span>
                                    </p>
                                    <p className="m-1">
                                        <FontAwesomeIcon icon={faLocationDot} title="Contact address"/>{contact.address}
                                    </p>
                                    <p className="m-1">
                                        <FontAwesomeIcon icon={faPhone} title="Contact phone number"/>{contact.phone}
                                    </p>
                                    <p className="m-1">
                                        <FontAwesomeIcon icon={faAt} title="Contact email"/>{contact.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )
                
            })}
                        <div className={`modal fade ${showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete contact</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this contact from your contact list? There is no turning back if you go ahead!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Go back</button>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            handleDeleteContact(selectedContactId)
                            actions.loadContactList()
                            }}>Delete contact</button>
                    </div>
                </div>
            </div>
        </div>    
        </>
    )
}


