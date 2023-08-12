/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  scope: "/map",
});

module.exports = withPWA({
})
