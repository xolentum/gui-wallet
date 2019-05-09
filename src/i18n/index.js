import enUS from "./en-us"

// ADD LANGUAGES HERE
const languages = [
    { name: "English", code: "en-us", flag: "us" },
    { name: "Russian", code: "ru", flag: "ru" },
    { name: "French", code: "fr", flag: "fr" },
    { name: "Spanish", code: "es", flag: "es" }
]

export { languages }

// DO NOT MODIFY THIS EXPORT, LANGUAGE FILES CAN BE DYNAMICALLY LOADED
export default {
    "en-us": enUS
}
