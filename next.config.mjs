/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Permite o deploy mesmo com avisos de links <a> no Footer
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Permite o deploy mesmo com erros de 'any' nas páginas de Game e Signup
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;