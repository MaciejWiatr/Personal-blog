const { i18n } = require("./next-i18next.config");
const withPreact = require("next-plugin-preact");

module.exports = withPreact({
	i18n,

	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
});
