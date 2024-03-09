import { atom } from "recoil";

export const promptInputState = atom({
    key: "promptInput",
    default: "",
});

export const promptOutputState = atom({
    key: "promptOutput",
    default: "",
});
