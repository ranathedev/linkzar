import axios from "axios";
import emailjs from "@emailjs/browser";

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

const isMobileDevice = () => {
  if (typeof window !== "undefined") {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
};

const shareShortLink = (shortLink: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Share Short Link",
        text: "Check out this short link:",
        url: shortLink,
      })
      .then(() => {
        console.log("Shared successfully");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
      });
  } else {
    console.log("Web Share API is not supported on this device");
  }
};

const handleDelLink = async (
  originalURL: string,
  setIsLoading: any,
  handleReset: () => void
) => {
  setIsLoading(true);
  const response = await axios.post("/api/deleteLink", {
    headers: {
      "Content-Type": "application/json",
    },
    originalURL,
  });

  if (response.status === 200) {
    const data = response.data;
    data && handleReset();
  } else {
    console.log("Error:", response.statusText);
  }
  setIsLoading(false);
};

const sendEmail = (values: { name: string; email: string; msg: string }) => {
  emailjs
    .send(
      //@ts-ignore
      process.env.EMAIL_SERVICE_ID,
      process.env.EMAIL_TEMPLATE_ID,
      values,
      process.env.EMAIL_PUBLIC_KEY
    )
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message sent successfully!");
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
};

export {
  generateRandomString,
  validateUrl,
  isMobileDevice,
  shareShortLink,
  handleDelLink,
  sendEmail,
};
