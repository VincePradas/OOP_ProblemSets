import { useEffect } from "react";

const useTailwindLayout = () => {
  useEffect(() => {
    const aboutBody = document.querySelector("#About");
    aboutBody?.classList.add("tailwind-layout");
  }, []);
};

export default useTailwindLayout;
