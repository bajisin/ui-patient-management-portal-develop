// App Config
export const MOCK_MODE = "success";
export const MOCK_RESPONSE_DELAY = 1;
export const REGEX = {
  NUMERIC: /\/([0-9]+)/,
  LEADING_SLASH: /^\/+/,
  ALL_SLASHES: /\//g
};
export const errorMessage = {
  Required: "This field is required",
  validEmail: "Please enter valid email.",
  validPassword: "Password must contain 1 number and be at least 6 characters long.",
  validLastName: "Please enter valid name."
};
export const imageVaildation = {
  imageVaildation: ["image/jpeg", "image/jpg", "image/png"],
  imageSize: 4 * 1024 * 1024
};
export const fileVaildation = {
  fileVaildation: "application/pdf",
  fileSize: 10 * 1024 * 1024
};
