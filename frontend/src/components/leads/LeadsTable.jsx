import React, { memo, useEffect, useState } from 'react'
import Table from '@/components/shared/table/Table';
import { FiAlertOctagon, FiArchive, FiClock, FiEdit3, FiEye, FiMoreHorizontal, FiPrinter, FiTrash2 } from 'react-icons/fi'
import Dropdown from '@/components/shared/Dropdown';
import SelectDropdown from '@/components/shared/SelectDropdown';
import getIcon from '@/utils/getIcon';
import { leadTableData } from '@/utils/fackData/leadTableData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const actions = [
    { label: "Edit", icon: <FiEdit3 /> },
    { label: "Print", icon: <FiPrinter /> },
    { label: "Remind", icon: <FiClock /> },
    { type: "divider" },
    { label: "Archive", icon: <FiArchive /> },
    { label: "Report Spam", icon: <FiAlertOctagon />, },
    { type: "divider" },
    { label: "Delete", icon: <FiTrash2 />, },

];



const TableCell = memo(({ options, defaultSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <SelectDropdown
            options={options}
            defaultSelect={defaultSelect}
            selectedOption={selectedOption}
            onSelectOption={(option) => setSelectedOption(option)}
        />
    );
});


const LeadssTable = () => {

    const [leads, setLeads] = useState([]) // leads store in state

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);
    const [deleteCustomerName, setDeleteCustomerName] = useState("");

    const navigate = useNavigate()
    const getLeads = async () => {
        try {
            const ServalUrl = "http://localhost:5000/api/lead"
            const result = await axios.get(`${ServalUrl}/get`)
            console.log(result.data)
            setLeads(result.data.lead || []);

        } catch (error) {
            console.log(error)
        }
    }

    const deleteLeads = async (id) => {
        try {
            const ServalUrl = "http://localhost:5000/api/lead"
            await axios.delete(`${ServalUrl}/${id}`);
            getLeads()
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    // Fetch leads on component mount
    useEffect(() => {
        getLeads();
    }, []);

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
        await deleteLeads(deleteCustomerId);
        closeDeleteModal();
    };

    const columns = [
        {
            accessorKey: 'id',
            header: ({ table }) => {
                const checkboxRef = React.useRef(null);

                useEffect(() => {
                    if (checkboxRef.current) {
                        checkboxRef.current.indeterminate = table.getIsSomeRowsSelected();
                    }
                }, [table.getIsSomeRowsSelected()]);

                return (
                    <input
                        type="checkbox"
                        className="custom-table-checkbox"
                        ref={checkboxRef}
                        checked={table.getIsAllRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                );
            },
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    className="custom-table-checkbox"
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
            meta: {
                headerClassName: 'width-30',
            },
        },

        {
            accessorKey: 'name',
            header: () => 'Customer',
            cell: (info) => {
                const name = info.getValue() || 'N/A';
                return (
                    <div className="hstack gap-3">
                        <div className="text-white avatar-text user-avatar-text avatar-md">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <span className="text-truncate-1-line">{name}</span>
                        </div>
                    </div>
                );
            }
        },

        {
            accessorKey: 'email',
            header: () => 'Email',
            cell: (info) => <a href="apps-email.html">{info.getValue()}</a>
        },

        {
            accessorKey: 'phone',
            header: () => 'Phone',
            cell: (info) => <a href="tel:">{info.getValue()}</a>

        },

        {
            accessorKey: 'source',
            header: () => 'Source',
            cell: (info) => {
                const src = info.getValue() || 'N/A';
                return (
                    <div className="hstack gap-2">
                        <div className="avatar-text avatar-sm">
                            {getIcon(src)}  {/* your getIcon function must handle string */}
                        </div>
                        <span>{src}</span>
                    </div>
                );
            }
        },

        {
            accessorKey: 'createdAt', // change "date" to createdAt mongodb ma store createAt automatically
            header: () => 'Date',
            cell: (info) => {
                const date = info.getValue();
                return new Date(date).toLocaleDateString();
            }
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: (info) => {
                const status = info.getValue() || 'N/A';
                const color = status === 'Active' ? 'green' : 'orange';
                return (
                    <span className="hstack gap-1 align-items-center">
                        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }}></span>
                        <span>{status}</span>
                    </span>
                );
            }
        },


        {
            accessorKey: 'actions',
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
                        {/* View button */}
                        {/* <Link to={`/customers/view/${id}`} className="avatar-text avatar-md">
                            <FiEye />
                        </Link> */}
                        {/* nichenu buttone profile model mate */}
                        <button
                            className="avatar-text avatar-md border-1 bg-transparent"
                            onClick={() => openProfile(row.original)}
                        >
                            <FiEye />
                        </button>




                        {/* Dropdown */}
                        <Dropdown
                            dropdownItems={rowActions}
                            triggerClass='avatar-md'
                            triggerPosition={"0,21"}
                            triggerIcon={<FiMoreHorizontal />}
                            onClick={(label) => {
                                if (label === "Edit") {
                                    navigate(`/leads/edit/${id}`);
                                }

                                if (label === "Delete") {
                                    openDeleteModal(row.original);
                                }
                            }}
                        />
                    </div>
                );
            }
        }
    ]

    return (
        <>
            {/* <Table data={leadTableData} columns={columns} /> */}
            <Table data={leads} columns={columns} />

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

        </>
    )
}

export default LeadssTable