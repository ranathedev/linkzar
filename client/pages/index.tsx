import React, { useEffect } from "react";
import axios from "axios";

// import Overview from "./overview";
import URLShortener from "components/url-shortener";

export default function Home() {
  //@ts-ignore
  const [theme, setTheme] = React.useState("light");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/shorten", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error: any) {
        console.log("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <URLShortener theme={theme} />
    </main>
  );
}
