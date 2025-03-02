import { useEffect } from "react";

const useTailwindLayout = () => {
  useEffect(() => {
    const body = document.querySelector(".opentourn");
    body?.classList.add("tailwind-layout");
  }, []);
};

export default useTailwindLayout;
