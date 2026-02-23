import { useEffect } from "react";

const KadamAd = () => {
  useEffect(() => {
    if (document.getElementById("kadam-script-buftxr419549")) return;

    window.k_init = window.k_init || [];

    window.k_init.push({
      id: "buftxr419549",
      type: "cu",
      domain: "hdbkell.com",
      next: "1",
      rerun: true,
      newtab: "1",
      exclude: "",
      include: "",
      delay: "0",
      batchSize: "1",
      batchInterval: "3",
      filterDevice: "both",
      blockedReferrers: ""
    });

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.setAttribute("data-cfasync", false);
    script.src = "https://hdbkell.com/qemn6.js";
    script.id = "kadam-script-buftxr419549";

    document.head.appendChild(script);
  }, []);

  return <div className="buftxr419549"></div>;
};

export default KadamAd;