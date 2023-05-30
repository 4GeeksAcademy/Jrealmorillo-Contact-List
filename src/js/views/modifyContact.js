import React, { useState, useContext } from "react";

import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";


export const ModifyContact = () => {


    const navigate = useNavigate();

    const { actions } = useContext(Context);
    const params = useParams();

    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

 

    return (
        <>
            <div className="row justify-content-center m-5">
                <div className="col-8 m-3">
                    <h2>Add a new contact</h2>
                </div>
            </div>
            <form onSubmit={(event) => {
                event.preventDefault();
                actions.updateContact(params.id, contact);
                navigate("/")
                actions.loadContactList();
            }}>                <div className="row justify-content-center">
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