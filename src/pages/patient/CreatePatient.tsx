import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { editablePatientUserInfo } from '@/types/CreateUserForm';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

interface CreatePatientFormProps {
  role?: string;
  editablePatientUserInfo?: editablePatientUserInfo;
}

interface FormData {
  patientId: string;
  lastName: string;
  firstName: string;
  initial: string;
  ICD9_ID: string;
  ICD9_SubID: string;
  YearDx: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: number;
  country: string;
  phone: number;
  birthDate: Date | null;
  sex: string;
  bloodType: string;
  information: string;
}

const CreatePatient: React.FC<CreatePatientFormProps> = ({ editablePatientUserInfo }) => {
  const [formData, setFormData] = useState<FormData>({
    patientId: '',
    lastName: '',
    firstName: '',
    initial: '',
    ICD9_ID: '',
    ICD9_SubID: '',
    YearDx: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postCode: 0,
    country: '',
    phone: 0,
    birthDate: null,
    sex: '',
    bloodType: '',
    information: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnBackClick();
    toast.success(`User ${editablePatientUserInfo ? 'updated' : 'created'} successfully.`);
  };

  const handleOnBackClick = () => navigate(-1);

  return (
    <div className="bg-white rounded-xl shadow-sm p-10 border border-gray-100 mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          className="text-blue-600 hover:text-blue-700 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-blue-600">
          {editablePatientUserInfo ? 'Edit' : 'Create'} Patient
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Id */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Patient Id</label>
            <input
              name="patientId"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.patientId}
              defaultValue={editablePatientUserInfo?.patientId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.lastName}
              defaultValue={editablePatientUserInfo?.lastName}
              onChange={handleChange}
            />
          </div>

          {/* First Name */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">First Name</label>
            <input
              name="firstName"
              type="text"
              required
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.firstName}
              defaultValue={editablePatientUserInfo?.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Initial */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Initial</label>
            <input
              name="initial"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.initial}
              defaultValue={editablePatientUserInfo?.initial}
              onChange={handleChange}
            />
          </div>

          {/* ICD9_ID */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">ICD9_ID</label>
            <input
              name="ICD9_ID"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.ICD9_ID}
              defaultValue={editablePatientUserInfo?.ICD9_ID}
              onChange={handleChange}
            />
          </div>

          {/* ICD9_SubID */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">ICD9_SubID</label>
            <input
              name="ICD9_SubID"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.ICD9_SubID}
              defaultValue={editablePatientUserInfo?.ICD9_SubID}
              onChange={handleChange}
            />
          </div>

          {/* YearDx */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">YearDx</label>
            <input
              name="YearDx"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.YearDx}
              defaultValue={editablePatientUserInfo?.YearDx}
              onChange={handleChange}
            />
          </div>

          {/* Address 1 */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Address 1</label>
            <input
              name="address1"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.address1}
              defaultValue={editablePatientUserInfo?.address1}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address 2 */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Address 2</label>
            <input
              name="address2"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.address2}
              defaultValue={editablePatientUserInfo?.address2}
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">City</label>
            <input
              name="city"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.city}
              defaultValue={editablePatientUserInfo?.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* State */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">State</label>
            <input
              name="state"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.state}
              defaultValue={editablePatientUserInfo?.state}
              onChange={handleChange}
              required
            />
          </div>

          {/* Post Code */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Postal Code</label>
            <input
              name="postCode"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.postCode}
              defaultValue={editablePatientUserInfo?.postCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Country */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Country</label>
            <input
              name="country"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.country}
              defaultValue={editablePatientUserInfo?.country}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Phone</label>
            <input
              name="phone"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.phone}
              defaultValue={editablePatientUserInfo?.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Birth Date */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">BirthDay</label>
            <div>
              <DatePicker
                selected={formData.birthDate}
                onChange={(date: Date | null) => setFormData({ ...formData, birthDate: date })}
                dateFormat="MM-dd-yyyy"
                placeholderText="MM-DD-YYYY"
                className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>

          {/* Sex */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Gender</label>
            <select
              value={formData.sex}
              defaultValue={editablePatientUserInfo?.sex}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sex: e.target.value as 'Male' | 'Female' | 'All',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {' '}
              <option value="" disabled hidden>
                Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="All">Other</option>
            </select>
          </div>

          {/* Blood Type */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Blood Type</label>
            <select
              value={formData.bloodType}
              defaultValue={editablePatientUserInfo?.bloodType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bloodType: e.target.value as
                    | 'A+'
                    | 'A-'
                    | 'B+'
                    | 'B-'
                    | 'AB+'
                    | 'AB-'
                    | 'O+'
                    | 'O-',
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled hidden>
                Select Blood Type
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Information */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Information</label>
            <input
              name="information"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.information}
              onChange={handleChange}
              defaultValue={editablePatientUserInfo?.information}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Save
          </button>

          <button
            onClick={handleOnBackClick}
            type="button"
            className="cursor-pointer bg-gray-100 text-gray-700 py-3 px-6 rounded-md text-sm hover:bg-gray-200 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePatient;
