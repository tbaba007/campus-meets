const { default: App } = require('next/app')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir:true
    },
    async redirects(){
        return[
            {
                source:'/',
                destination:'/user/login',
                permanent:true
            }
        ]
    },
    reactStrictMode:true,
    env:{
        APP_API:process.env.BASE_API
    }
}

module.exports = nextConfig
