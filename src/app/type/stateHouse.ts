export type PageType = "list" | "view" | "add" | "edit";

export interface StateHouseData {
  id: string;
  code: string;
  name: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  houseType:
    | "Official Residence"
    | "Staff Housing"
    | "Dormitory"
    | "Guest House";
  condition: "Good" | "Fair" | "Needs Repair" | "Uninhabitable";
  status: "Available" | "Occupied" | "Maintenance";
  isArchived: boolean;
  currentOccupant?: {
    name: string;
    nip?: string;
    unit?: string;
  };
}
