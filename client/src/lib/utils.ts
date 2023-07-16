const generateRandomString = (len: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const validateUrl = (url: string) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  const isValid = urlPattern.test(url);

  return isValid;
};

export { generateRandomString, validateUrl };
