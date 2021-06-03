const { i18n } = require("./next-i18next.config");
const withPreact = require("next-plugin-preact");

module.exports = withPreact({
	i18n,
});
