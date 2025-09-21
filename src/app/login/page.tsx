"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";

import logo from "../../../public/assets/img/kemenkumham.png";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // reset error saat user mengetik
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.identifier.endsWith("@gov.id")) {
      setError("Email harus menggunakan domain @gov.id");
      setLoading(false);
      return;
    }

    const name = form.identifier.split("@")[0];
    Cookies.set("username", name, { expires: 7 }); // simpan 7 hari

    // langsung redirect ke dashboard
    router.push("/");
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Card className="w-[500px] shadow-xl">
          <CardHeader className="flex flex-col items-center">
            <Image src={logo} width={100} alt="logo UPNVJ" />
            <CardTitle className="text-lg text-center mt-3">
              <h1 className="text-2xl mb-2">
                Sistem Internal <br />
                Kemenkumham
              </h1>
              <p className="text-sm text-gray-600">
                Masuk ke Sistem Informasi internal
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="identifier">Email</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="masukan.email@gov.id"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Masuk"}
              </Button>
              <div className="flex items-center justify-center">
                <a href="#" className="underline font-semibold">
                  Lupa kata sandi
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
