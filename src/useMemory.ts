import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useTeletyper } from "./useTeletyper";

export const useMemory = (teletyper: ReturnType<typeof useTeletyper>) => {
  const storage = useLocalStorage();
  const [content, setMemory] = useState(storage.getMemory());

  const update = (value: string, index: number) => {
    setMemory((oldContent) => {
      const newContent = oldContent.slice(0);
      newContent[index] = value;

      storage.setMemory(newContent);
      return newContent;
    });
  };

  const send = (index: number) => {
    const text = content[index];
    if (teletyper.sendingText.length > 0) {
      teletyper.addSend(text);
      return;
    }

    teletyper.send(text);
  };

  return { update, send, content };
};
