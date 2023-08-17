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
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const createShortLink = async (
  setLoading: (arg: string) => void,
  shortId: string,
  url: string,
  setLinkData: (arg: any) => void
) => {
  setLoading("Creating short link");

  const response = await axios.post("http://localhost:3001/api/shorten", {
    headers: {
      "Content-Type": "application/json",
    },
    url,
    shortId,
  });

  if (response.status === 200) {
    const data = response.data;
    console.log(data);
    if (!data.err) {
      setLinkData(data);
    } else {
      setLoading("");
      return data;
    }
  } else {
    console.log("Error:", response.statusText);
  }

  setLoading("");
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
  id: string,
  setLoading: (arg: string) => void,
  sendResponse: (arg: any) => void
) => {
  setLoading("Deleting link");
  const response = await axios.post("http://localhost:3001/api/deleteLink", {
    headers: {
      "Content-Type": "application/json",
    },
    id,
  });

  if (response.status === 200) {
    const data = response.data;
    if (!data.err) {
      sendResponse("Link deleted successfully!");
    } else {
      sendResponse(data);
    }
  }
  setLoading("");
};

const editLink = async (id: string, value: string) => {
  const response = await axios.post("http://localhost:3001/api/editLink", {
    headers: {
      "Content-Type": "application/json",
    },
    id,
    value,
  });

  const data = response.data;
  return data;
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

const isMac = () => {
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
};

const inputFocus = (id: string) => {
  const input = document.getElementById(id);
  input?.focus();
};

const formatDate = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${months[monthIndex]}-${day}-${year}`;
  return formattedDate;
};

const qas = [
  {
    que: "What is a URL shortener?",
    ans: "A URL shortener is a web service that converts long URLs into shorter and more manageable links. It makes it easier to share links on social media and other platforms.",
    id: "question0",
  },
  {
    que: "How does a URL shortener work?",
    ans: "When you enter a long URL into the URL shortener, it generates a unique and shorter alias for that link. When users click on the shortened link, they are redirected to the original long URL.",
    id: "question1",
  },
  {
    que: "Is it safe to use a URL shortener?",
    ans: "Yes, most URL shorteners are safe to use. However, it's essential to use a reputable and trustworthy URL shortening service to avoid any potential security risks.",
    id: "question2",
  },
  {
    que: "Can I customize the shortened URLs?",
    ans: "Some URL shorteners allow users to customize the shortened URLs with their desired text or keywords. This feature can make the link more descriptive and branded.",
    id: "question3",
  },
  {
    que: "How long do the shortened links stay active?",
    ans: "The duration of the link's availability depends on the URL shortener service. Some may keep the links active indefinitely, while others might have an expiration period.",
    id: "question4",
  },
  {
    que: "Can I track the performance of my shortened links?",
    ans: "Yes, many URL shortener services offer link tracking and analytics. You can monitor the number of clicks, geographic location of users, and other relevant data.",
    id: "question5",
  },
  {
    que: "Are there any limitations on the number of links I can shorten?",
    ans: "The limitations on the number of links you can shorten might vary based on the URL shortener service's policies. Some may have restrictions for free users, while premium plans may offer more flexibility.",
    id: "question6",
  },
  {
    que: "Can I share shortened links on social media platforms?",
    ans: "Yes, shortened links are commonly used on social media platforms, as they take up less character space and look cleaner in posts.",
    id: "question7",
  },
  {
    que: "Do I need an account to use a URL shortener?",
    ans: "Many URL shortener services offer anonymous shortening, which means you don't need an account to generate shortened links. However, having an account may offer additional features and benefits.",
    id: "question8",
  },
  {
    que: "Are shortened links permanent?",
    ans: "Shortened links can be permanent as long as the URL shortener service is active and maintains the links. However, it's always a good idea to have a backup of the original long URLs.",
    id: "question9",
  },
];

export {
  generateRandomString,
  validateUrl,
  isMobileDevice,
  createShortLink,
  shareShortLink,
  handleDelLink,
  editLink,
  sendEmail,
  formatDate,
  isMac,
  inputFocus,
  qas,
};
