const {
    addDecoratorsLegacy,
    disableEsLint,
    override,
    useBabelRc
} = require("customize-cra");

module.exports = {
    webpack: override(
        disableEsLint(),
        addDecoratorsLegacy(),
        useBabelRc()
    )
};
