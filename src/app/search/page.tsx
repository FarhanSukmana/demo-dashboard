"use client";
import React, { useState } from "react";
import axios from "axios";

const InputPembelian = () => {
  const [formData, setFormData] = useState({
    Tanggal: "",
    Nama: "",
    Menu: "",
    Qty: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://script.google.com/macros/s/AKfycbyOuibsqWmuEFE5cU343b1WPrVzBXnRkOLiZ0Ef-wl-qo3motcIPuEl87Ta3rIa_Qyn/exec",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response dari Google Apps Script:", res.data);
      console.log('datanya :',formData)
      alert("Data berhasil dikirim ke Spreadsheet!");
      setFormData({ Tanggal: "", Nama: "", Menu: "", Qty: "" });
    } catch (error: any) {
      console.error("Error kirim data:", error);
      alert("Gagal mengirim data");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Input Pembelian</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="date"
          name="Tanggal"
          value={formData.Tanggal}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="Nama"
          placeholder="Nama Member"
          value={formData.Nama}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="Menu"
          placeholder="Jenis Minuman"
          value={formData.Menu}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="Qty"
          placeholder="Qty (angka atau 'reward')"
          value={formData.Qty}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputPembelian;
