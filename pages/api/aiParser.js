export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { query } = req.body || {};
  // If no query provided, return neutral filters instead of 400
  if (!query || !String(query).trim()) {
    return res.status(200).json({ type: null, iface: null, priceMax: null });
  }

  // Simple heuristic parser (no external API)
  const q = String(query).toLowerCase();

  let type = null;
  if (q.includes("temperature")) type = "temperature";
  else if (q.includes("ultrasonic")) type = "ultrasonic";
  else if (q.includes("pressure")) type = "pressure";
  else if (q.includes("accelerometer") || q.includes("gyroscope") || q.includes("imu")) type = "imu";

  let iface = null;
  if (q.includes("i2c")) iface = "I2C";
  else if (q.includes("spi")) iface = "SPI";
  else if (q.includes("uart")) iface = "UART";
  else if (q.includes("analog")) iface = "Analog";
  else if (q.includes("digital")) iface = "Digital";

  let priceMax = null;
  const priceMatch = q.match(/(?:under|max|<=|\$)\s*([0-9]+(?:\.[0-9]+)?)/);
  if (priceMatch) priceMax = Number(priceMatch[1]);

  return res.status(200).json({ type, iface, priceMax });
}
