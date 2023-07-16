import React, { useEffect } from "react";
import axios from "axios";

// import Overview from "./overview";
import Sidebar from "components/sidebar";

export default function Home() {
  //@ts-ignore
  const [theme, setTheme] = React.useState("dark");

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
      <Sidebar theme={theme} />
    </main>
  );
}
