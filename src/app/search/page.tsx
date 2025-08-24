"use client";
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [formData, setFormData] = useState({
    nama: "",
    minuman: "",
    tgl: "",
    qty: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://script.google.com/macros/s/AKfycbxUA1lV4PAUDZ0_Q68rrrSpVquiJ1wGPIKJG5L4CPNY6DwIuzqnSX2FwIeSFfclwVjI5A/exec",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response dari Google Apps Script:", res.data);
      alert("Data berhasil dikirim!");
    } catch (error: any) {
      console.error("Error kirim data:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Setup error:", error.message);
      }
      alert("Gagal mengirim data");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Input Pembelian</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="nama"
          placeholder="Nama"
          value={formData.nama}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="minuman"
          placeholder="Jenis Minuman"
          value={formData.minuman}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="tgl"
          value={formData.tgl}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
