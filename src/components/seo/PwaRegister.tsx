"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registrato con successo:", registration.scope);
          },
          function (err) {
            console.log("Registrazione Service Worker fallita:", err);
          }
        );
      });
    }
  }, []);

  return null;
}
