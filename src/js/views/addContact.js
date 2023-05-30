import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const AddContact = () => {


    const navigate = useNavigate();

    const { actions } = useContext(Context);


    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        agenda_slug: "jreal",
        address: "",
        phone: ""
    })


    const handleSubmit = (event) => {
        event.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(contact),
            redirect: 'follow'
        };

        fetch("https://assets.breatheco.de/apis/fake/contact/", requestOptions)
            .then(response => response.json())
            .then(result => {
                actions.updateContact(result.id, result);
                navigate("/")
            })
            .catch(error => console.log('error', error));

    }


    return (
        <>
            <div className="row justify-content-center m-5">
                <div className="col-8 m-3">
                    <h2>Add a new contact</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="col-8 m-3">
                        <label htmlFor="name" className="form-label fw-bold fs-4">Full name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter full name" onChange={(event) => {
                            setContact({ ...contact, full_name: event.target.value })
                        }} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8 m-3">
                        <label htmlFor="email" className="form-label fw-bold fs-4">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter e-mail" onChange={(event) => {
                            setContact({ ...contact, email: event.target.value })
                        }} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8 m-3">
                        <label htmlFor="phone" className="form-label fw-bold fs-4">Phone</label>
                        <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter phone number" onChange={(event) => {
                            setContact({ ...contact, phone: event.target.value })
                        }} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8 m-3">
                        <label htmlFor="address" className="form-label fw-bold fs-4">Address</label>
                        <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" onChange={(event) => {
                            setContact({ ...contact, address: event.target.value })
                        }} />
                    </div>
                </div>

                <div className="d-grid col-6 m-5 p-5 mx-auto">
                    <button type="submit" className="btn btn-lg btn-primary m-2">Save Contact</button>
                    <Link to="/" className="mx-auto">Or go back to the Contact List</Link>
                </div>
            </form>

        </>

    )

}



