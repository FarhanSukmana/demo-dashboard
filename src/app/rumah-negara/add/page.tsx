"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

export default function AddRumahNegaraPage() {
  const [notes, setNotes] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6 pb-10">
      {/* Button Back */}
      <div className="flex gap-x-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-semibold">Add House</h1>
      </div>
      {/* Card identification */}
      <Card className="rounded-md p-4">
        <CardTitle>Identification</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0">
          {/* code & house type */}
          <div className="flex w-full h-full gap-4 mb-4 md:flex-row flex-col">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Code *</label>
              <Input placeholder="RN-2025-001" />
              <label className="text-[10px] text-[#969696]">
                Format: RN-YYYY-NNN
              </label>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                House Type
              </label>
              <Select defaultValue="official-residence">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select House Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official-residence">
                    Official Residence
                  </SelectItem>
                  <SelectItem value="staff-housing">Staff Housing</SelectItem>
                  <SelectItem value="guest-house">Guest House</SelectItem>
                  <SelectItem value="dormitory">Dormitory</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* HouseName */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">House Name*</label>
            <Input placeholder="Minister Official Residence" />
          </div>
        </CardContent>
      </Card>
      {/* Card Address */}
      <Card className="rounded-md p-4">
        <CardTitle>Address</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex flex-col w-full gap-2">
            <label className="text-sm text-[#969696]">Street Address *</label>
            <Textarea placeholder="Complete street Address" />
          </div>
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">City *</label>
              <Input placeholder="Jakarta Selatan" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Province *</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official-residence">
                    DKI Jakarta
                  </SelectItem>
                  <SelectItem value="staff-housing">Jawa Barat</SelectItem>
                  <SelectItem value="guest-house">Jawa Tengah</SelectItem>
                  <SelectItem value="dormitory">Jawa Timur</SelectItem>
                  <SelectItem value="other">Bali</SelectItem>
                  <SelectItem value="other">DI Yogyakarta</SelectItem>
                  <SelectItem value="other">Sumatera Barat</SelectItem>
                  <SelectItem value="other">Sumatera Utara</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Postal Code*</label>
              <Input placeholder="12940" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Card Location */}
      <Card className="rounded-md p-4">
        <CardTitle>Location (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Latitude</label>
              <Input type="number" placeholder="-6.2088" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Longitude</label>
              <Input type="number" placeholder="106.8456" />
            </div>
          </div>
          <span className="text-[10px] text-[#969696]">
            Both coordinates required if any provided
          </span>
        </CardContent>
      </Card>

      {/* Card Physical */}
      <Card className="rounded-md p-4">
        <CardTitle>Physical</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4 flex-wrap">
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Floors</label>
              <Input type="number" placeholder="2" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Bedrooms</label>
              <Input type="number" placeholder="3" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Bathrooms</label>
              <Input type="number" placeholder="2" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">Land Area (m²)</label>
              <Input type="number" placeholder="200" />
            </div>
            <div className="flex flex-col w-full md:w-1/6 gap-2">
              <label className="text-sm text-[#969696]">
                Building Area (m²)
              </label>
              <Input placeholder="150" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Classification */}
      <Card className="rounded-md p-4">
        <CardTitle>Classification</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full h-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Condition *</label>
              <Select defaultValue="good">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="need-repair">Need Repair</SelectItem>
                  <SelectItem value="uninhabitable">Uninhabitable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Status *</label>
              <Select defaultValue="available">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Utilities & Documents */}
      <Card className="rounded-md p-4">
        <CardTitle>Utilities & Documents (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-4">
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">
                Electric Meter No
              </label>
              <Input placeholder="ELC2025001" />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Water Meter No</label>
              <Input placeholder="WTR2025001" />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-full gap-2">
              <label className="text-sm text-[#969696]">Asset Number</label>
              <Input placeholder="AST2025001" />
            </div>
            <div className="flex flex-col w-full  gap-2">
              <label className="text-sm text-[#969696]">Certificate No</label>
              <Input placeholder="CERT2025001" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Notes */}
      <Card className="rounded-md p-4">
        <CardTitle>Notes (Optional)</CardTitle>
        <CardContent className="flex flex-col w-full h-full p-0 gap-y-2">
          <Textarea
            placeholder="Additional notes about the property"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span className="text-[10px] text-[#969696]">
            {notes.length}/1000 characters
          </span>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          Save
        </Button>
      </div>
    </div>
  );
}
