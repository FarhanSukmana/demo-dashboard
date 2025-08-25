"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InputPembelian = () => {
  const [formData, setFormData] = useState({
    Tanggal: "",
    Nama: "",
    Menu: "",
    Qty: "",
  });

  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // 👈 state loading

  useEffect(() => {
    const stored = localStorage.getItem("members");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const names = parsed.map((m: any) => m.Nama_Member);
        setMembers(names);
      } catch {
        setMembers([]);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 👈 mulai loading

    try {
      const form = new URLSearchParams();
      form.append("Tanggal", formData.Tanggal);
      form.append("Nama", formData.Nama);
      form.append("Menu", formData.Menu);
      form.append("Qty", formData.Qty);

      const res = await axios.post(
        "https://script.google.com/macros/s/AKfycbwkoXwHGaiIWkdIQQSyXNogUG_Hjeg9OhfDagU3cxKPlLoBDtX58val-NSILS28-jiF/exec",
        form,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Response dari Google Apps Script:", res.data);
      alert("Data berhasil dikirim ke Spreadsheet!");
      setFormData({ Tanggal: "", Nama: "", Menu: "", Qty: "" });
    } catch (error) {
      console.error("Error kirim data:", error);
      alert("Gagal mengirim data");
    } finally {
      setLoading(false); // 👈 selesai loading
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Input Pembelian</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input tanggal + Nama Member */}
        <div className="w-full flex gap-x-3">
          <input
            type="date"
            name="Tanggal"
            value={formData.Tanggal}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="border p-2 w-full rounded"
            required
          />

          <Select
            value={formData.Nama}
            onValueChange={(value) => setFormData({ ...formData, Nama: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Member" />
            </SelectTrigger>
            <SelectContent>
              {members.map((nama, idx) => (
                <SelectItem key={idx} value={nama}>
                  {nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Menu + Qty */}
        <div className="w-full flex gap-x-3">
          <Select
            value={formData.Menu}
            onValueChange={(value) => setFormData({ ...formData, Menu: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kopi Susu Gula Aren">
                Kopi Susu Gula Aren
              </SelectItem>
              <SelectItem value="Matcha Latte">Matcha Latte</SelectItem>
              <SelectItem value="Dirty Matcha">Dirty Matcha</SelectItem>
              <SelectItem value="Americano">Americano</SelectItem>
              <SelectItem value="Americano Melon">Americano Melon</SelectItem>
              <SelectItem value="Latte Melon">Latte Melon</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={formData.Qty}
            onValueChange={(value) => setFormData({ ...formData, Qty: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Qty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="reward">Reward</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded w-full text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InputPembelian;
