import fs from "fs";
import path from "path";
import csv from "csv-parser";

function normalize(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function coercePrice(p) {
  const match = String(p || "").match(/([0-9]+(?:\.[0-9]+)?)/);
  return match ? parseFloat(match[1]) : NaN;
}

export default async function handler(req, res) {
  const { q = "", category = "", iface = "", priceMax = "" } = req.query;

  const searchTerm = q.trim().toLowerCase();
  const catValues = category ? category.split("|").map((t) => normalize(t).replace(/sensors$/, "")) : [];
  const ifaceValues = iface ? iface.split("|").map((t) => normalize(t)) : [];
  const max = priceMax ? Number(priceMax) : undefined;

  const filePath = path.join(process.cwd(), "public", "data", "sensors.csv");
  const rows = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath, { encoding: "utf8" })
        .pipe(csv({ mapHeaders: ({ header }) => header.replace(/^\uFEFF/, "") }))
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });
  } catch (err) {
    console.error("CSV load error:", err);
    return res.status(200).json([]);
  }

  const results = rows.filter((r) => {
    const allText = Object.values(r).join(" ").toLowerCase();
    const price = coercePrice(r.price);

    if (searchTerm && !allText.includes(searchTerm)) return false;

    if (catValues.length) {
      const rowCat = normalize(r.category).replace(/sensors$/, "");
      if (!catValues.some((c) => rowCat === c)) return false;
    }

    if (ifaceValues.length) {
      const rowIface = normalize(r.interface);
      if (!ifaceValues.some((i) => rowIface.includes(i))) return false;
    }

    if (max !== undefined && !Number.isNaN(max)) {
      if (!Number.isNaN(price) && price > max) return false;
    }

    return true;
  });

  res.status(200).json(results);
}
