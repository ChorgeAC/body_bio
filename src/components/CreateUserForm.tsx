import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { editableUserInfo } from '../pages/UserPortal';

interface CreateUserFormProps {
  role: string;
  editableUserInfo?: editableUserInfo;
  onBack: () => void;
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

const CreateUserForm: React.FC<CreateUserFormProps> = ({ role, onBack, editableUserInfo }) => {
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
      onBack();
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

          {role === 'patient' && (
            <>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Initial</label>
                <input
                  name="initial"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.initial}
                  onChange={handleChange}
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">ICD9_ID</label>
                <input
                  name="ICD9_ID"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.ICD9_ID}
                  onChange={handleChange}
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">ICD9_SubID</label>
                <input
                  name="ICD9_SubID"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.ICD9_SubID}
                  onChange={handleChange}
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">YearDx</label>
                <input
                  name="YearDx"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.YearDx}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Role */}
          <div className="cursor-pointer">
            <label className="text-sm text-gray-600">Role</label>
            <input
              disabled
              value={role}
              className="cursor-pointer w-full mt-1 p-3 bg-gray-100 text-gray-500 rounded-md"
            />
          </div>

          {role === 'doctor' && (
            <div className="cursor-pointer">
              <label className="text-sm text-gray-600">Practice / Clinic Name</label>
              <input
                name="practiceName"
                type="text"
                className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={
                  locationParts[1] === 'edit-user'
                    ? editableUserInfo?.clinic
                    : formData.practiceName
                }
                onChange={handleChange}
              />
            </div>
          )}

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

          {/* Doctor Only Fields */}
          {role === 'doctor' && (
            <>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600 block mb-1">Date First</label>
                <DatePicker
                  selected={formData.dateFirst ? new Date(formData.dateFirst) : null}
                  onChange={(date: Date | null) =>
                    setFormData({
                      ...formData,
                      dateFirst: date ? date.toISOString() : '',
                    })
                  }
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Memo</label>
                <input
                  name="memo"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.memo}
                  onChange={handleChange}
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Credit Card</label>
                <input
                  name="creditCard"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.creditCard}
                  onChange={handleChange}
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600 block mb-1">Expirary Date</label>
                <DatePicker
                  selected={formData.expDate ? new Date(formData.expDate) : null}
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
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">CVV</label>
                <input
                  name="CVV"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.CVV}
                  onChange={handleChange}
                />
              </div>

              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Terms</label>
                <input
                  name="terms"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.terms}
                  onChange={handleChange}
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
                />
              </div>
            </>
          )}

          {role === 'patient' && (
            <>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Birth Date</label>
                <div>
                  <DatePicker
                    selected={formData.birthDate}
                    onChange={(date: any) => setFormData({ ...formData, birthDate: date })}
                    dateFormat="MM-dd-yyyy"
                    placeholderText="MM-DD-YYYY"
                    className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md
                      rounded-md focus:bg-white focus:outline-none
                      focus:ring-2 focus:ring-blue-100"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Gender</label>
                <select
                  value={formData.sex}
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
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="All">Other</option>
                </select>
                {/* <input
                  name="gender"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.sex}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Blood Type</label>
                <select
                  value={formData.bloodType}
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
                {/* <input
                  name="bloodType"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.bloodType}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="cursor-pointer">
                <label className="text-sm text-gray-600">Information</label>
                <input
                  name="information"
                  type="text"
                  className="cursor-pointer w-full mt-1 p-3 bg-gray-50 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                  value={formData.information}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
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
            onClick={onBack}
            className="cursor-pointer bg-gray-100 text-gray-700 py-3 px-6 rounded-md text-sm hover:bg-gray-200 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
