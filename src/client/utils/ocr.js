import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

export async function uploadDrivingLicense(url) {
  if (url) {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    try {
      const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-idDocument", url);

      const {
        documents: [result]
      } = await poller.pollUntilDone();
      return result;
    } catch (error) {
      console.error("Error analyzing document:", error);
    }
  }
  // const {
  //   documents: [result]
  // } = await poller.pollUntilDone();

  if (result) {
    // The identity document model has multiple document types, so we need to know which document type was actually
    // extracted.
    if (result.docType === "idDocument.driverLicense") {
      // For the sake of the example, we'll only show a few of the fields that are produced.
      return result;
    } else if (result.docType === "idDocument.passport") {
      // The passport document type extracts and parses the Passport's machine-readable zone
      if (!result.fields.machineReadableZone) {
        throw new Error("No Machine Readable Zone extracted from passport.");
      }
    } else if (result.docType === "idDocument.nationalIdentityCard") {
      return result;
    } else {
      // The only reason this would happen is if the client library's schema for the prebuilt identity document model is
      // out of date, and a new document type has been introduced.
      console.error("Unknown document type in result:", result);
    }
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
}

uploadDrivingLicense().catch((error) => {
  console.error("An error occurred:", error);
  // process.exit(1);
});

export async function uploadInsurance(url) {
  if (url) {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    try {
      const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-healthInsuranceCard.us", url);
      const {
        documents: [result]
      } = await poller.pollUntilDone();

      if (result) {
        if (result.docType === "healthInsuranceCard.us") {
          return result;
        } else {
          console.error("Unknown document type in result:", result);
        }
      } else {
        throw new Error("Expected at least one receipt in the result.");
      }
    } catch (error) {
      console.error("Error analyzing document:", error);
    }
  } else {
    throw new Error("URL is required");
  }
}

uploadInsurance().catch((error) => {
  console.error("An error occurred:", error);
  // process.exit(1);
});
