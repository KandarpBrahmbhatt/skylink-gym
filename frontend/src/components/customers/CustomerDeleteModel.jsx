import React from "react";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, customerName }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content bg-white p-4 rounded shadow">
                <h5 className="mb-3">Delete Customer</h5>
                <p>
                    Are you sure you want to delete{" "}
                    <strong>{customerName}</strong>?
                </p>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;