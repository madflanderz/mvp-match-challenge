module.exports = (phase, { defaultConfig }) => {

  const rewrites = () => {
    return [
      {
        source: "/api/report",
        destination: "http://178.63.13.157:8090/mock-api/api/report",
      },
      {
        source: "/api/projects",
        destination: "http://178.63.13.157:8090/mock-api/api/projects",
      },
      {
        source: "/api/gateways",
        destination: "http://178.63.13.157:8090/mock-api/api/gateways",
      },
    ];
  };

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    rewrites
  }
  return nextConfig
}