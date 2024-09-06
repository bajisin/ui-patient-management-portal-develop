const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://172.174.104.250:5001",
    token: "sqa_88994f112f827762f5aefda9fb9779a9b0cc5846",
    options: {
      "sonar.projectName": "Dev-LSL-UI-project",
      "sonar.projectDescription": "Lifescan project",
      "sonar.projectKey": "Dev-LSL-UI-project",
      "sonar.projectVersion": "0.0.1",
      "sonar.exclusions": "**/node_modules/**",
      "sonar.sourceEncoding": "UTF-8"
    }
  },
  () => process.exit()
);
