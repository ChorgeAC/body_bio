import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { editableUserInfo } from '@/pages/UserPortal';
import { toast } from 'react-toastify';

interface CreateAdminFormProps {
  role?: string;
  editableUserInfo?: editableUserInfo;
}

interface FormData {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
}

const CreateAdmin: React.FC<CreateAdminFormProps> = ({ role, editableUserInfo }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
    phone: '',
    fax: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOnBackClick();
    toast.success(`User ${editableUserInfo ? 'updated' : 'created'} successfully.`);
  };

  const handleOnBackClick = () => navigate(-1);

  return (
    <div className="bg-white rounded-xl shadow-sm p-10 border border-gray-100 mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleOnBackClick}
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
          {editableUserInfo ? 'Edit' : 'Create'} Admin
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="fullName"
              type="text"
              required
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.fullName ?? formData.fullName}
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
              value={editableUserInfo?.address1 ?? formData.address1}
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
              value={editableUserInfo?.address2 ?? formData.address2}
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
              value={editableUserInfo?.city ?? formData.city}
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
              value={editableUserInfo?.state ?? formData.state}
              onChange={handleChange}
              required
            />
          </div>

          {/* Post Code */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Post Code</label>
            <input
              name="postCode"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.postCode ?? formData.postCode}
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
              value={editableUserInfo?.country ?? formData.country}
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
              value={editableUserInfo?.phone ?? formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fax */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Fax</label>
            <input
              name="fax"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.fax ?? formData.fax}
              onChange={handleChange}
              required
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
              value={editableUserInfo?.email ?? formData.email}
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

export default CreateAdmin;
