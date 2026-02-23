// CustomerProfileModal.jsx receives data → 
// modal shows customer details

import React from "react";
import Profile from "../widgetsList/Profile";

const CustomerProfileModal = ({ show, handleClose, customer }) => {
    if (!show) return null; // prevent rendering when closed

    return (
        <>
            <div
                className="modal-backdrop fade show"
                onClick={handleClose}
            ></div>

            <div
                className="modal fade show d-block"
                tabIndex="-1"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >

                {/* modal-dialog-centered model center ma lavvamate */}
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Customer Profile</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <Profile customer={customer} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerProfileModal;
