import React, { useState } from 'react'
import SelectDropdown from '@/components/shared/SelectDropdown'
import TextArea from '@/components/shared/TextArea'
import { customerListTagsOptions, leadsGroupsOptions, leadsSourceOptions, leadsStatusOptions, propsalVisibilityOptions, taskAssigneeOptions } from '@/utils/options'
import useLocationData from '@/hooks/useLocationData'
import { currencyOptionsData } from '@/utils/fackData/currencyOptionsData'
import { languagesData } from '@/utils/fackData/languagesData'
import { timezonesData } from '@/utils/fackData/timeZonesData'
import Loading from '@/components/shared/Loading'
import Input from '@/components/shared/Input'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import LeadsCreateHeader from './LeadsCreateHeader'

const LeadsCreateContent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { countries, states, cities, loading, error, fetchStates, fetchCities, } = useLocationData();
    const leadsTags = customerListTagsOptions

    const [leadData, setleadData] = useState({}) // this state store all the form data

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setleadData({
            ...leadData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <>
            {loading && <Loading />}
            <div className="col-lg-12">
                {/* <LeadsCreateHeader leadData={leadData} /> */}
                <div className="card stretch stretch-full">
                    <div className="card-body lead-status">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Lead Status :</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">Typically refers to adding a new potential customer or sales prospect</span>
                            </h5>
                            <a href="#" className="btn btn-sm btn-light-brand">Create Invoice</a>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Status</label>
                                <SelectDropdown
                                    options={leadsStatusOptions}
                                    selectedOption={selectedOption}
                                    defaultSelect="new"
                                    onSelectOption={(option) => {
                                        setSelectedOption(option);
                                        setleadData({
                                            ...leadData,
                                            status: option.value   // or option.label depending on your option structure
                                        });
                                    }}
                                />
                            </div>
                            <div className="col-lg-4 mb-4">
                                <label className="form-label">Source</label>
                                <SelectDropdown
                                    options={leadsSourceOptions}
                                    selectedOption={selectedOption}
                                    defaultSelect="facebook"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>

                        </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="card-body general-info">
                        <div className="mb-5 d-flex align-items-center justify-content-between">
                            <h5 className="fw-bold mb-0 me-4">
                                <span className="d-block mb-2">Lead Info :</span>
                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">General information for your lead</span>
                            </h5>
                            <a href="#" className="btn btn-sm btn-light-brand">Edit Lead</a>
                        </div>
                        <Input
                            icon='feather-user'
                            label={"Name"}
                            labelId={"nameInput"}
                            placeholder={"Name"}
                            name={"name"}
                            value={leadData.name || ""}
                            onChange={handleChange}
                        />
                        <Input
                            icon='feather-mail'
                            label={"Email"}
                            labelId={"emailInput"}
                            placeholder={"Email"}
                            name={"email"}
                            type={"email"}
                            value={leadData.email || ""}
                            onChange={handleChange}
                        />
                        <Input
                            icon='feather-link-2'
                            label={"Username"}
                            labelId={"usernameInput"}
                            placeholder={"Username"}
                            name={"username"}
                            onChange={handleChange}
                            value={leadData.username || ""}
                        />
                        <Input
                            icon='feather-phone'
                            label={"Phone"}
                            labelId={"phoneInput"}
                            placeholder={"Phone"}
                            name={"phone"}
                            onChange={handleChange}
                            value={leadData.phone || ""}
                        />
                        <Input
                            icon='feather-compass'
                            label={"Company"}
                            labelId={"companyInput"}
                            placeholder={"Company"}
                            name={"company"}
                            onChange={handleChange}
                            value={leadData.company || ""}
                        />
                        <Input
                            icon='feather-briefcase'
                            label={"Designation"}
                            labelId={"designationInput"}
                            placeholder={"Designation"}
                            name={"designation"}
                            onChange={handleChange}
                            value={leadData.designation || ""}
                        />
                        <Input

                            icon="feather-link"
                            label={"Website"}
                            labelId={"websiteInput"}
                            placeholder={"Website"}
                            name={"website"}
                            onChange={handleChange}
                            value={leadData.website || ""}
                        />

                        <TextArea
                            icon="feather-map-pin"
                            label={"Address"}
                            labelId={"addressInput"}
                            placeholder={"Address"}
                            name={"address"}
                            onChange={handleChange}
                            value={leadData.address || ""}
                        />
                        <TextArea
                            icon="feather-type"
                            label={"description"}
                            labelId={"descriptionInput"}
                            placeholder={"Description"}
                            row='5'
                            name={"description"}
                            onChange={handleChange}
                            value={leadData.description || ""}
                        />

                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">State: </label>
                            </div>
                            <div className="col-lg-8">
                                <SelectDropdown
                                    options={states}
                                    selectedOption={selectedOption}
                                    defaultSelect={"new-york"}
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-4">
                                <label className="fw-semibold">City: </label>
                            </div>
                            <div className="col-lg-8">
                                <SelectDropdown
                                    options={cities}
                                    selectedOption={selectedOption}
                                    defaultSelect="new-york"
                                    onSelectOption={(option) => setSelectedOption(option)}
                                />
                            </div>
                        </div>

                        {/* right side button leva mate use kariyu 6e. styling */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>

                            <LeadsCreateHeader leadData={leadData} />
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default LeadsCreateContent