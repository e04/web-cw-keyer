import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useMemoText = () => {
  const [text, _setText] = useState("");
  const storage = useLocalStorage();

  useEffect(() => {
    _setText(storage.getMemoText());
  }, []);

  const setText = (newText: string) => {
    _setText(newText);
    storage.setMemoText(newText);
  };

  return { setText, text };
};
