// import axios from 'axios';
// import React from 'react'
// import { FiLayers, FiUserPlus } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom';

// const CustomersCreateHeader = ({ customerData }) => {
//     const navigate = useNavigate()
//     const handleClick = () => {
//         topTost()
//     };
//     const handleCreate = async () => {
//         try {

//             if (!customerData.email) {
//                 alert("Email is required");
//                 return;
//             }
//             console.log(customerData)


//             const ServalUrl = "http://localhost:5000/api/customer"
//             const res = await axios.post(`${ServalUrl}/create`, customerData);
//             alert(res.data.message);
//             navigate("")

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
//             {/* <a href="#" className="btn btn-light-brand" onClick={handleClick}>
//                 <FiLayers size={16} className='me-2' />
//                 <span>Save as Draft</span>
//             </a> */}
//             <a href="#" className="btn btn-primary" onClick={handleCreate}>
//                 <FiUserPlus size={16} className='me-2' />
//                 <span>Create Customer</span>
//             </a>
//         </div>
//     )
// }

// export default CustomersCreateHeader