import { atom } from "recoil";

export const promptInputState = atom({
    key: "promptInput",
    default: "",
});

export const promptOutputState = atom({
    key: "promptOutput",
    default: "",
});

export const ticketTypeState = atom({
    key: "ticketType",
    default: "story",
});

export const promptLoadingState = atom({
    key: "promptLoading",
    default: false,
});

export const additionalDetailsState = atom({
    key: "ticketAdditionalDetails",
    default: false,
});

export const includeTemplateState = atom({
    key: "includeTemplate",
    default: false,
});

export const templateInputState = atom({
    key: "templateInput",
    default: "",
});
