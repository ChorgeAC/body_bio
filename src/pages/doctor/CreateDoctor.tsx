import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { editableUserInfo } from '@/pages/UserPortal';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

interface CreateDoctorFormProps {
  role?: string;
  editableUserInfo?: editableUserInfo;
}

interface FormData {
  clientAcct: number | string;
  creditHold: string;
  eLyte: string;
  dateFirstEntered: string;
  lastName: string;
  practitioner: string;
  type: string;
  companyPractice: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  phone: string;
  fax: string;
  email: string;
  memo: string;
  creditCard: string;
  expDate: string;
  cvv: string;
  terms: string;
  priceCode: string;
}

const CreateDoctor: React.FC<CreateDoctorFormProps> = ({ role, editableUserInfo }) => {
  const [formData, setFormData] = useState<FormData>({
    clientAcct: '',
    creditHold: '',
    eLyte: '',
    dateFirstEntered: '',
    lastName: '',
    practitioner: '',
    type: '',
    companyPractice: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
    phone: '',
    fax: '',
    email: '',
    memo: '',
    creditCard: '',
    expDate: '',
    cvv: '',
    terms: '',
    priceCode: '',
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
          {editableUserInfo ? 'Edit' : 'Create'} Physician
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client Acct # */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Client Acct #</label>
            <input
              name="clientAcct"
              type="number"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.clientAcct ?? formData.clientAcct}
              onChange={handleChange}
              required
            />
          </div>

          {/* Credit Hold */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Credit Hold</label>
            <input
              name="creditHold"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.creditHold ?? formData.creditHold}
              onChange={handleChange}
              required
            />
          </div>

          {/* E-Lyte */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">E-Lyte</label>
            <input
              name="eLyte"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.eLyte ?? formData.eLyte}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date First Entered */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Date First Entered</label>
            <input
              name="dateFirstEntered"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.dateFirstEntered ?? formData.dateFirstEntered}
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
              value={editableUserInfo?.lastName ?? formData.lastName}
              onChange={(e) => {
                let value = e.target.value;
                if (role === 'doctor') {
                  value = value.replace(/^Dr\.\s*/i, '');
                  value = 'Dr. ' + value;
                }
                setFormData({ ...formData, lastName: value });
              }}
              onFocus={() => {
                if (role === 'doctor' && !formData.lastName.trim()) {
                  setFormData({ ...formData, lastName: 'Dr. ' });
                }
              }}
            />
          </div>

          {/* Practitioner */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Practitioner</label>
            <input
              name="practitioner"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.practitioner ?? formData.practitioner}
              onChange={handleChange}
              required
            />
          </div>

          {/* Type */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Type</label>
            <input
              name="type"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.type ?? formData.type}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Practice */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Company Practice</label>
            <input
              name="companyPractice"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.companyPractice ?? formData.companyPractice}
              onChange={handleChange}
              required
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

          {/* Memo */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Memo</label>
            <input
              name="memo"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.memo ?? formData.memo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Credit Card */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Credit Card</label>
            <input
              name="creditCard"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.creditCard ?? formData.creditCard}
              onChange={handleChange}
              required
            />
          </div>

          {/* Expirary Date */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600 block mb-1">Exp Date</label>
            <DatePicker
              selected={
                editableUserInfo?.expDate
                  ? new Date(editableUserInfo.expDate)
                  : formData.expDate
                    ? new Date(formData.expDate)
                    : null
              }
              onChange={(date: Date | null) =>
                setFormData({
                  ...formData,
                  expDate: date ? date.toISOString() : '',
                })
              }
              dateFormat="MM/dd/yyyy"
              placeholderText="MM/DD/YYYY"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              required
            />
          </div>

          {/* CVV2 */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">CVV2</label>
            <input
              name="cvv"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={editableUserInfo?.cvv ?? formData.cvv}
              onChange={handleChange}
              required
            />
          </div>

          {/* Terms */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Terms</label>
            <input
              name="terms"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.terms}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Price Code</label>
            <input
              name="priceCode"
              type="text"
              className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.priceCode}
              onChange={handleChange}
              required
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

export default CreateDoctor;
