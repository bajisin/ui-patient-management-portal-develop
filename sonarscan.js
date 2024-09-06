const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://172.174.104.250:5001/",
    token: "sqa_9bf54da2b3f0364bdda1d2f6aefca1b27d9bd102",
    options: {
      "sonar.projectName": "dev-Ui-patient-management-portal",
      "sonar.projectDescription": "Lifescan project",
      "sonar.projectKey": "dev-Ui-patient-management-portal-liescankey",
      "sonar.projectVersion": "0.0.1",
      "sonar.exclusions": "**/node_modules/**",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.sources": "src",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info"
    }
  },
  () => process.exit()
);
