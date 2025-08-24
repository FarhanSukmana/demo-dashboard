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
import { TicketCheck, Coffee } from "lucide-react"; // 🔹 Ikon

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

  const parseSheet = (rows: string[][]) => {
    const persons: Record<string, any> = {};

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
      console.log(persons);
      persons[nama].Loyalti.push(loyaltiEntry);
    }

    return Object.values(persons);
  };

  const fetchData = async () => {
    const url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjPJCWqdJ24LoJSzo3hfsclDREZtrMqgxHiR3V2Homy1JFHBCsNCKXwCRwMnKwrIsQ_L7TpHg6yCko/pub?gid=2021372793&single=true&output=csv";

    const res = await fetch(url);
    const text = await res.text();
    const rows = text.split("\n").map((r) => r.split(","));
    setData(parseSheet(rows));
  };

  useEffect(() => {
    console.log(data);
    if (data.length > 0) {
      console.log("Formatted JSON:", JSON.stringify(data, null, 2));
    } else {
      fetchData();
    }
  }, [data]);

  const parseDate = (str: string) => {
    if (!str) return null;
    return new Date(str);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Data Loyalti Aktif</h1>

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
                      <TableCell className="font-bold">
                        {person.Nama_Member}
                      </TableCell>
                      <TableCell>{loyalti.Tanggal_awal}</TableCell>
                      <TableCell>{loyalti.Tanggal_exp}</TableCell>

                      {/* Reward 1 */}
                      <TableCell>
                        {loyalti.Reward_1 ? (
                          loyalti.Reward_1
                        ) : pembelianCount >= 5 ? (
                          <TicketCheck className="text-green-600" />
                        ) : (
                          <TicketCheck className="text-gray-400" />
                        )}
                      </TableCell>

                      {/* Reward 2 */}
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
