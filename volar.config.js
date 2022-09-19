module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    "volar.useWorkspaceDependencies": true,
    "volar.experimental.templateInterpolationService": false,
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: [
    "./UI", // shorthand for only root.
    {
      // **required**
      // Where is your project?
      // It is relative to `volar.config.js`.
      root: "./UI",
      // **optional** default: `'package.json'`
      // Where is `package.json` in the project?
      // We use it to determine the version of vue.
      // It is relative to root property.
      package: "./UI/package.json"
    },
  ],
};
