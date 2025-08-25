"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { TicketCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Pembelian {
  tanggal: string;
  menu: string;
}

interface Loyalti {
  Tanggal_awal: string;
  Tanggal_exp: string;
  Reward_1: string;
  Reward_2: string;
  Pembelian: Pembelian[];
}

interface Person {
  Nama_Member: string;
  Loyalti: Loyalti[];
}

const Page = () => {
  const [data, setData] = useState<Person[]>([]);
  const [formData, setFormData] = useState({
    Tanggal: "",
    Nama: "",
    Menu: "",
    Qty: "",
  });
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const parseSheet = (rows: string[][]) => {
    const persons: Record<string, Person> = {};

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const nama = row[0];
      if (!nama) continue;

      const tanggalAwal = row[12] || "";
      const tanggalExp = row[13] || "";
      const cleanValue = (val: string) => {
        if (!val) return "";
        const cleaned = val.replace(/\r/g, "").replace(/\n/g, "").trim();
        return cleaned === "/r" ? "" : cleaned;
      };

      const reward1 = cleanValue(row[14]);
      const reward2 = cleanValue(row[15]);

      const pembelian: Pembelian[] = [];
      for (let j = 1; j <= 10; j++) {
        const value = row[j];
        if (value) {
          const [tanggal, ...menuParts] = value.split(" ");
          pembelian.push({
            tanggal: tanggal,
            menu: menuParts.join(" "),
          });
        }
      }

      const loyaltiEntry: Loyalti = {
        Tanggal_awal: tanggalAwal,
        Tanggal_exp: tanggalExp,
        Reward_1: reward1,
        Reward_2: reward2,
        Pembelian: pembelian,
      };

      if (!persons[nama]) {
        persons[nama] = {
          Nama_Member: nama,
          Loyalti: [],
        };
      }
      persons[nama].Loyalti.push(loyaltiEntry);
    }

    return Object.values(persons);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjPJCWqdJ24LoJSzo3hfsclDREZtrMqgxHiR3V2Homy1JFHBCsNCKXwCRwMnKwrIsQ_L7TpHg6yCko/pub?gid=2021372793&single=true&output=csv";

      const res = await fetch(url);
      const text = await res.text();
      const rows = text.split("\n").map((r) => r.split(","));
      setData(parseSheet(rows));
      localStorage.setItem("members", JSON.stringify(parseSheet(rows)));
    };

    if (data.length === 0) {
      fetchData();
    }

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
  }, [data]);

  const parseDate = (str: string) => {
    if (!str) return null;
    return new Date(str);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      toast.success("Data Transaksi berhasil ditambahkan"); 
      setFormData({ Tanggal: "", Nama: "", Menu: "", Qty: "" });
    } catch (error) {
      console.error("Error kirim data:", error);
      toast.error("Data Transaksi berhasil ditambahkan"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">📊 Data Loyalti Aktif</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Transaksi</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Transaksi</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Input tanggal + Nama Member */}
              <div className="w-full flex gap-x-3">
                <input
                  type="date"
                  name="Tanggal"
                  value={formData.Tanggal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="border p-2 w-full rounded"
                  required
                />

                <Select
                  value={formData.Nama}
                  onValueChange={(value) =>
                    setFormData({ ...formData, Nama: value })
                  }
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
                  onValueChange={(value) =>
                    setFormData({ ...formData, Menu: value })
                  }
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
                    <SelectItem value="Americano Melon">
                      Americano Melon
                    </SelectItem>
                    <SelectItem value="Latte Melon">Latte Melon</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={formData.Qty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, Qty: value })
                  }
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

              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${loading ? "opacity-50" : ""}`}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Member</TableHead>
                  <TableHead>Tanggal Awal</TableHead>
                  <TableHead>Tanggal Exp</TableHead>
                  <TableHead>Reward 1</TableHead>
                  <TableHead>Reward 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((person, i) => {
                  const today = new Date();
                  const activeLoyalti = person.Loyalti.filter((l) => {
                    const start = parseDate(l.Tanggal_awal);
                    const end = parseDate(l.Tanggal_exp);
                    if (!start || !end) return false;
                    return start <= today && end >= today;
                  });

                  if (activeLoyalti.length === 0) return null;

                  const loyalti = activeLoyalti[activeLoyalti.length - 1];
                  const pembelianCount = loyalti.Pembelian.length;

                  return (
                    <TableRow key={i}>
                      <TableCell
                        className="font-bold text-blue-600 cursor-pointer hover:underline"
                        onClick={() =>
                          router.push(
                            `/coffee/${encodeURIComponent(person.Nama_Member)}`
                          )
                        }
                      >
                        {person.Nama_Member}
                      </TableCell>
                      <TableCell>{loyalti.Tanggal_awal}</TableCell>
                      <TableCell>{loyalti.Tanggal_exp}</TableCell>
                      <TableCell>
                        {loyalti.Reward_1 ? (
                          loyalti.Reward_1
                        ) : pembelianCount >= 5 ? (
                          <TicketCheck className="text-green-600" />
                        ) : (
                          <TicketCheck className="text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        {loyalti.Reward_2 ? (
                          loyalti.Reward_2
                        ) : pembelianCount >= 10 ? (
                          <TicketCheck className="text-brown-600" />
                        ) : (
                          <TicketCheck className="text-gray-400" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
