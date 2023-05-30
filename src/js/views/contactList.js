import React, { useContext, useEffect } from "react";
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


    const handleUpdateContact = (id) => {
        const selectedContact = store.contacts.find(contact => contact.id === id);
        if (selectedContact) {
            actions.updateContact(id, selectedContact);
            navigate(`/modifycontact/${id}`);
        }
    };
    
    const handleDeleteContact = (id) => {
        actions.deleteContact(id);
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
                                <div className="card d-flex justify-content-center" style={{ width: "54rem" }}>
                                    <p className="fw-bold d-flex align-items-center justify-content-between m-1">
                                        {contact.full_name}
                                        <span className="d-flex">
                                            <span className="m-1">
                                            <FontAwesomeIcon icon={faPencil} onClick={() => handleUpdateContact(contact.id)} />
                                            </span>
                                            <span className="ml-auto m-1">
                                                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeleteContact(contact.id)}/>
                                            </span>
                                        </span>
                                    </p>
                                    <p className="m-1">
                                        <FontAwesomeIcon icon={faLocationDot} />{contact.address}
                                    </p>
                                    <p className="m-1">
                                        <FontAwesomeIcon icon={faPhone} />{contact.phone}
                                    </p>
                                    <p className="m-1">
                                        <FontAwesomeIcon icon={faAt} />{contact.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}    
        </>
    )
}


