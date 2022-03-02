import { useEffect, useState } from "react";
import { emitter } from "./emitter";

export const EmitButton = () => {
  return (
    <button role="@emit-btn" onClick={() => emitter.emit("ADD_COUNT", 1)}>
      {" "}
      click{" "}
    </button>
  );
};

export const EmitTest = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    emitter.on("ADD_COUNT", (e) => {
      setCounter(e + counter);
    });
  });

  return (
    <div>
      <p role="@emit-count">{counter}</p>
    </div>
  );
};
