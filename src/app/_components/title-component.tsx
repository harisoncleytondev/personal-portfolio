"use client";

import { useEffect, useState } from "react";

export const TitleComponent = () => {
  const [title, setTitle] = useState("");
  const [titleFull, setTitleFull] = useState("");

  useEffect(() => {
    setTitleFull(`Olá, me chamo Harison`);
  }, []);

  useEffect(() => {
    let current = "";
    let index = 0;
    let running = true;
    let timeout: any = null;

    setTitle("");

    function loop() {
      if (running) {
        if (index <= titleFull.length) {
          current += titleFull.charAt(index);
          setTitle(current);
          index++;
        } else {
          running = false;
          timeout = setTimeout(loop, 1000);
          return;
        }
      } else {
        if (index > 0) {
          index--;
          current = current.slice(0, index);
          setTitle(current);
        } else {
          running = true;
          timeout = setTimeout(loop, 1000);
          return;
        }
      }
      timeout = setTimeout(loop, 70);
    }

    if (titleFull) {
      loop();
    }

    return () => clearTimeout(timeout);
  }, [titleFull]);

  return <>{title}</>;
};
