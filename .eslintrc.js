module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "rules": {
    "max-len": ["error", 80, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
    }],
  },
}
