const PROXY_CONFIG = [
  {
    context: ["/api/*"],
    target: "http://localhost:3000",
    secure: false,
    logLevel: "debug",
    proxyTimeout: 1200000,
    timeout:1200000
  }
]

module.exports = PROXY_CONFIG;
