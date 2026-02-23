
import React, { memo, useEffect, useState } from "react";
import Table from "@/components/shared/table/Table";
import { FiEdit3, FiEye, FiMoreHorizontal, FiTrash2, } from "react-icons/fi";
import Dropdown from "@/components/shared/Dropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomerProfileModal from "./CustomerProfileModal";

const CustomersTable = () => {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState([]); // cusomore store in state

    // Profile Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);
    const [deleteCustomerName, setDeleteCustomerName] = useState("");


    const getCustomer = async () => {
        try {
            const resp = await axios.get("http://localhost:5000/api/customer/get");
            setCustomer(resp.data.customer);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCustomer();
    }, []);


    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/customer/${id}`);
            getCustomer();// page refresh na karvu pade aetale.
        } catch (error) {
            console.log(error);
        }
    };

    const openDeleteModal = (customer) => {
        setDeleteCustomerId(customer._id);
        setDeleteCustomerName(customer.name);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteCustomerId(null);
    };

    const confirmDelete = async () => {
        await deleteCustomer(deleteCustomerId);
        closeDeleteModal();
    };

    const openProfile = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const closeProfile = () => {
        setShowModal(false);
        setSelectedCustomer(null);
    };

    const columns = [
        {
            accessorKey: "name", // chaged: accessorKey from 'customer' → 'name' becausse i am send backend name
            cell: (info) => {
                const name = info.getValue();
                return (
                    <div className="hstack gap-3">
                        <div className="text-white avatar-text user-avatar-text avatar-md">
                            {name?.substring(0, 1)}
                        </div>
                        <div>
                            <span>{name}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "email",
            header: () => "Email",
        },
        {
            accessorKey: "phone",
            header: () => "Phone",
        },
        {
            accessorKey: "createdAt",  // change "date" to createdAt mongodb ma store createAt automatically
            header: () => "Date",
            cell: (info) =>
                new Date(info.getValue()).toLocaleDateString(),
        },
        {
            accessorKey: "actions",
            header: () => "Actions",
            cell: ({ row }) => {
                const id = row.original._id;

                const rowActions = [
                    { label: "Edit", icon: <FiEdit3 /> },
                    { type: "divider" },
                    { label: "Delete", icon: <FiTrash2 /> },
                ];

                return (
                    <div className="hstack gap-2">
                        {/* View Button */}
                        <button
                            className="avatar-text avatar-md border-0 bg-transparent"
                            onClick={() => openProfile(row.original)}
                        >
                            <FiEye />
                        </button>

                        {/* Dropdown */}
                        <Dropdown
                            dropdownItems={rowActions}
                            triggerClass="avatar-md"
                            triggerPosition={"0,21"}
                            triggerIcon={<FiMoreHorizontal />}
                            onClick={(label) => {
                                if (label === "Edit") {
                                    navigate(`/customers/edit/${id}`);
                                }

                                if (label === "Delete") {
                                    openDeleteModal(row.original);
                                }
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Table data={customer} columns={columns} />

            {/* Profile Modal */}
            <CustomerProfileModal
                show={showModal}
                handleClose={closeProfile}
                customer={selectedCustomer}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 1050,
                    }}
                >
                    <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
                        <h5 className="mb-3 ">Delete Customer</h5>
                        <p>
                            Are you sure you want to delete{" "}
                            <strong>{deleteCustomerName}</strong>?
                        </p>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersTable;