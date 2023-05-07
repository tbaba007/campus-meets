const { default: App } = require('next/app')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir:true
    }
    
}

module.exports = nextConfig
