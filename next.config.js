/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');
const env = process.env.NODE_ENV;
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE,
});
const withPreact = require('next-plugin-preact');

module.exports = withBundleAnalyzer(
    withPreact({
        i18n,

        webpack5: true,

        typescript: {
            // !! WARN !!
            // Dangerously allow production builds to successfully complete even if
            // your project has type errors.
            // !! WARN !!
            ignoreBuildErrors: true,
        },

        images: {
            domains: ['media.graphcms.com'],
            deviceSizes: [350, 768, 992, 1200],
        },

        async headers() {
            return [
                {
                    source: '/',
                    headers: [
                        {
                            type: 'cookie',
                            key: 'SameSite',
                            value: 'Lax',
                        },
                    ],
                },
            ];
        },
    })
);
