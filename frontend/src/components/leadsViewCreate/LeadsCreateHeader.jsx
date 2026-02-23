import React from 'react'
import { FiLayers, FiUserPlus } from 'react-icons/fi'
import topTost from '@/utils/topTost';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const LeadsCreateHeader = ({ leadData }) => {
  const handleClick = () => {
    topTost()
  };
  const navigate = useNavigate()

  const handleCreate = async () => {
    try {
      const ServalUrl = "http://localhost:5000/api/lead"
      const result = await axios.post(`${ServalUrl}/create`, leadData);
      toast.success(result.data.message)

      navigate("/leads/list")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex align-items-center gap-2 page-header-right-items-wrapper">
      {/* <a href="#" className="btn btn-light-brand " onClick={handleClick}>
        <FiLayers size={16} className='me-2' />
        <span>Save as Draft</span>
      </a> */}
      <a href="#" className="btn btn-primary " onClick={handleCreate}>
        <FiUserPlus size={16} className='me-2' />
        <span>Create Lead</span>
      </a>
    </div>
  )
}

export default LeadsCreateHeader