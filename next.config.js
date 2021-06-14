const { i18n } = require('./next-i18next.config');

module.exports = {
    i18n,

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
};
