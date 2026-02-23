// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { BsPatchCheckFill } from 'react-icons/bs'
// import { FiEdit, FiMail, FiMapPin, FiPhone, FiTrash2 } from 'react-icons/fi'
// import { useParams } from 'react-router-dom'

// const Profile = () => {
//     const { id } = useParams()
//     const [onecustomer, setOneCustomer] = useState(null)

//     const getSingleCustomer = async () => {
//         try {
//             const ServalUrl = "http://localhost:5000/api/customer"
//             const result = await axios.get(`${ServalUrl}/get/${id}`)
//             console.log(result.data)
//             setOneCustomer(result.data.customer)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         getSingleCustomer()
//     }, [id])

//     if (!onecustomer) return <p>Loading...</p>

//     return (
//         <div className="card stretch stretch-full">
//             <div className="card-body">
//                 <div className="mb-4 text-center">
//                     <div className="wd-150 ht-150 mx-auto mb-3 position-relative">
//                         <div className="avatar-image wd-150 ht-150 border border-5 border-gray-3">
//                             <img src="/images/avatar/1.png" alt="img" className="img-fluid" />
//                         </div>
//                         <div className="wd-10 ht-10 text-success rounded-circle position-absolute translate-middle" style={{ top: "76%", right: "10px" }}>
//                             <BsPatchCheckFill size={16} />
//                         </div>
//                     </div>

//                     <div className="mb-4">
//                         <span className="fs-14 fw-bold d-block">
//                             {onecustomer.name}
//                         </span>
//                         <span className="fs-12 fw-normal text-muted d-block">
//                             {onecustomer.email}
//                         </span>
//                     </div>
//                 </div>

//                 <ul className="list-unstyled mb-4">
//                     <li className="hstack justify-content-between mb-4">
//                         <span className="text-muted fw-medium hstack gap-3">
//                             <FiMapPin size={16} />Location
//                         </span>
//                         <span>{onecustomer.location || "N/A"}</span>
//                     </li>

//                     <li className="hstack justify-content-between mb-4">
//                         <span className="text-muted fw-medium hstack gap-3">
//                             <FiPhone size={16} />Phone
//                         </span>
//                         <span>{onecustomer.phone}</span>
//                     </li>

//                     <li className="hstack justify-content-between mb-0">
//                         <span className="text-muted fw-medium hstack gap-3">
//                             <FiMail size={16} />Email
//                         </span>
//                         <span>{onecustomer.email}</span>
//                     </li>
//                 </ul>

//                 <div className="d-flex gap-2 text-center pt-4">
//                     {/* <button className="w-50 btn btn-light-brand">
//                         <FiTrash2 size={16} className='me-2' />
//                         Delete
//                     </button> */}
//                     {/* <button className="w-50 btn btn-primary">
//                         <FiEdit size={16} className='me-2' />
//                         Edit Profile
//                     </button> */}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile


import React from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

const Profile = ({ customer }) => {

    if (!customer) return <p>Loading...</p>

    return (
        <div className=" stretch-full">
            <div className="card-body">
                <div className="mb-4 text-center">
                    <div className="wd-150 ht-150 mx-auto mb-3 position-relative">
                        <div className="avatar-image wd-150 ht-150 border border-5 border-gray-3">
                            <img src="/images/avatar/1.png" alt="img" className="img-fluid" />
                        </div>
                        <div className="wd-10 ht-10 text-success rounded-circle position-absolute translate-middle" style={{ top: "76%", right: "10px" }}>
                            <BsPatchCheckFill size={16} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <span className="fs-14 fw-bold d-block">
                            {customer.name}
                        </span>
                        <span className="fs-12 fw-normal text-muted d-block">
                            {customer.email}
                        </span>
                    </div>
                </div>

                <ul className="list-unstyled mb-4">
                    <li className="hstack justify-content-between mb-4">
                        <span className="text-muted fw-medium hstack gap-3">
                            <FiMapPin size={16} />Location
                        </span>
                        <span>{customer.location || "N/A"}</span>
                    </li>

                    <li className="hstack justify-content-between mb-4">
                        <span className="text-muted fw-medium hstack gap-3">
                            <FiPhone size={16} />Phone
                        </span>
                        <span>{customer.phone}</span>
                    </li>

                    <li className="hstack justify-content-between mb-0">
                        <span className="text-muted fw-medium hstack gap-3">
                            <FiMail size={16} />Email
                        </span>
                        <span>{customer.email}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile

