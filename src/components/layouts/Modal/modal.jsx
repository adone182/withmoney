// Modal.js
import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, modalType, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: modalType,
    nominal: 0,
    description: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      type: modalType,
      nominal: 0,
      description: "",
      date: "",
    });
    onClose();
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      type: modalType,
    }));
  }, [modalType]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-1/2 bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{modalType}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nominal:
              </label>
              <input
                type="number"
                name="nominal"
                value={formData.nominal}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi:
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="contoh : Beli Baju"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tanggal:
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end gap-1 mt-2">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Tutup Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
