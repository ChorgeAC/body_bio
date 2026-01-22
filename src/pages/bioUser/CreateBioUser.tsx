import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editableUserInfo } from '@/pages/UserPortal';

interface CreateUserFormProps {
  role?: string;
  editableUserInfo?: editableUserInfo;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  practiceName: string;
  age: string;
  gender: string;
  address: string;
  doctorId: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  memo: string;
  creditCard: string;
  expDate: string;
  CVV: string;
  terms: string;
  priceCode: string;
  initial: string;
  ICD9_ID: string;
  ICD9_SubID: string;
  dateFirst: string;
  birthDate: Date | null; // ✅ FIX HERE
  sex: string;
  bloodType: string;
  information: string;
  YearDx: string;
}

const CreateBioUser: React.FC<CreateUserFormProps> = ({ role, editableUserInfo }) => {
  const locationParts = location.pathname.split('/').filter(Boolean);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    practiceName: '',
    age: '',
    gender: '',
    address: '',
    doctorId: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',

    memo: '',
    creditCard: '',
    expDate: '',
    CVV: '',
    terms: '',
    priceCode: '',
    initial: '',
    ICD9_ID: '',
    ICD9_SubID: '',
    dateFirst: '',
    birthDate: null,
    sex: '',
    bloodType: '',
    information: '',
    YearDx: '',
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  };

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
          {locationParts[1] === 'create-user' ? 'Create' : 'Edit'}{' '}
          {role === 'doctor' ? 'Physician' : role === 'patient' ? 'Patient' : 'User'}
        </h2>
      </div>

      {success && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          User {locationParts[1] === 'create-user' ? 'created' : 'updated'} successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={locationParts[1] === 'edit-user' ? editableUserInfo?.name : formData.name}
              onChange={(e) => {
                let value = e.target.value;

                if (role === 'doctor') {
                  value = value.replace(/^Dr\.\s*/i, '');
                  value = 'Dr. ' + value;
                }

                setFormData({ ...formData, name: value });
              }}
              onFocus={() => {
                if (role === 'doctor' && !formData.name.trim()) {
                  setFormData({ ...formData, name: 'Dr. ' });
                }
              }}
            />
          </div>

          {/* Email */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              required
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={locationParts[1] === 'edit-user' ? editableUserInfo?.email : formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Address 1</label>
            <input
              name="address1"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.address1}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Address 2</label>
            <input
              name="address2"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">City</label>
            <input
              name="city"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={locationParts[1] === 'edit-user' ? editableUserInfo?.city : formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">State</label>
            <input
              name="state"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={locationParts[1] === 'edit-user' ? editableUserInfo?.state : formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Postal Code</label>
            <input
              name="postalCode"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={
                locationParts[1] === 'edit-user' ? editableUserInfo?.pincode : formData.postalCode
              }
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Country</label>
            <input
              name="country"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phoneNumber"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.phoneNumber}
              onChange={handleChange}
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

export default CreateBioUser;
