import { NextResponse } from "next/server";

export async function GET() {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSjPJCWqdJ24LoJSzo3hfsclDREZtrMqgxHiR3V2Homy1JFHBCsNCKXwCRwMnKwrIsQ_L7TpHg6yCko/pub?gid=2021372793&single=true&output=csv";

  const res = await fetch(url, { cache: "no-store" }); // biar fresh
  const text = await res.text();
  console.log(text)

  return NextResponse.json({ csv: text });
}
