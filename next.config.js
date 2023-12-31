const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		register: true,
		disableDevLogs: true,
		skipWaiting: true,
		dest: 'public',
		runtimeCaching,
	},
})
// /** @type {import('next').NextConfig} */
// const runtimeCaching = require('next-pwa/cache')
// const withPWA = require('next-pwa')({
// 	dest: 'public',
// 	disableDevLogs: true,
// 	register: true,
// 	skipWaiting: true,
// 	runtimeCaching,
// 	buildExcludes: [/middleware-manifest.json$/],
// 	disable: process.env.NODE_ENV === 'development',
// })

// const nextConfig = withPWA({
// 	reactStrictMode: true,
// 	swcMinify: true,
// })
// module.exports = nextConfig
