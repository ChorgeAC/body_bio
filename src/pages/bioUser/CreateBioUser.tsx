import type { BioUserInfo } from '@/types/userInfo';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
  phoneNumber: number;
}

const CreateBioUser = (): React.ReactElement => {
  const location = useLocation();
  const isEditMode = location.pathname.includes('edit');
  const bioUserInfo: BioUserInfo | null = null;

  const [formData, setFormData] = useState<FormData>({
    name: bioUserInfo?.name || '',
    email: bioUserInfo?.email || '',
    address1: bioUserInfo?.address1 || '',
    address2: bioUserInfo?.address2 || '',
    city: bioUserInfo?.city || '',
    state: bioUserInfo?.state || '',
    postalCode: bioUserInfo?.postalCode || 0,
    country: bioUserInfo?.country || '',
    phoneNumber: bioUserInfo?.phoneNumber || 0,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleOnBackClick();
    toast.success(`User ${isEditMode ? 'updated' : 'created'} successfully.`);
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
          {isEditMode ? 'Edit' : 'Create'} Bio User
        </h2>
      </div>

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
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
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
              value={formData.email}
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
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">State</label>
            <input
              name="state"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Postal Code</label>
            <input
              name="postalCode"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.postalCode}
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
            onClick={handleOnBackClick}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBioUser;
