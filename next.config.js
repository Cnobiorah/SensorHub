/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-shop.adafruit.com",
      "cdn.sparkfun.com",
      "www.winsen-sensor.com",
      "invensense.tdk.com",
      "www.melexis.com",
      "datasheets.maximintegrated.com"
    ],
  },
};

module.exports = nextConfig;
