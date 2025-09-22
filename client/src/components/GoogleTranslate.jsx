import { color } from "framer-motion";
import { useEffect } from "react";
import React from "react";
const GoogleTranslate = () => {
    useEffect(() => {
        // Prevent duplicate script injection
        if (document.getElementById("google-translate-script")) return;

        // Define init function on window
        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,hi,bn,or,ta,te,kn,ml,gu,pa,mr,as,sa",
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            }
        };

        // Create script
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup
        // return () => {
        //     const script = document.getElementById("google-translate-script");
        //     if (script) script.remove();
        //     if (window.googleTranslateElementInit) delete window.googleTranslateElementInit;
        // };
    }, []);

    return (
        <div
            id="google_translate_element"
            style={{
                position: "relative", // optional: change to "relative" if you want normal flow
                top: 12,
                right: 24,
                whiteSpace: "nowrap", // Prevents the dropdown from breaking into multiple lines
                zIndex: 2000,
                background: "transparent",
                
            }}
        />
    );
};

export default GoogleTranslate;