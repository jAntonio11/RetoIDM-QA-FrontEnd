module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    language: 'es',
    format: [
      'progress-bar',
      'summary',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' }
  }
};
