import React, { useEffect } from "react";
import { Globe } from "lucide-react";

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
    }, []);

    return (
        <div className="relative flex items-center justify-center">
            <div id="google_translate_element" />

            {/* Global Styles Override for Google Widget */}
            <style>{`
                /* Container Style */
                .goog-te-gadget-simple {
                    background-color: transparent !important;
                    border: 1px solid hsl(var(--border)) !important; 
                    padding: 6px 10px !important;
                    border-radius: 0.5rem !important;
                    font-size: 0.875rem !important;
                    font-family: inherit !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                    display: flex !important;
                    align-items: center !important;
                    color: hsl(var(--muted-foreground)) !important;
                }
                
                .goog-te-gadget-simple:hover {
                    background-color: hsl(var(--muted) / 0.5) !important;
                    color: hsl(var(--foreground)) !important;
                }

                /* Hide Google Icon */
                .goog-te-gadget-icon {
                    display: none !important;
                }

                /* Text Styling */
                .goog-te-menu-value {
                    margin: 0 !important;
                    display: flex !important;
                    align-items: center !important;
                }
                
                .goog-te-menu-value span {
                    color: inherit !important;
                    font-weight: 500 !important;
                    border: none !important;
                }

                /* Hide the pipe | separator if present */
                .goog-te-menu-value span:nth-child(2) {
                    display: none !important;
                }

                /* Dropdown Arrow - optimize or hide if needed */
                .goog-te-menu-value span:last-child {
                    font-size: 10px !important;
                    opacity: 0.7;
                    margin-left: 4px;
                }

                /* Hide top banner frame */
                body { top: 0 !important; }
                .goog-te-banner-frame { display: none !important; }
                
                /* Hide tooltips */
                .goog-tooltip {
                    display: none !important;
                }
                
                .goog-te-gadget-simple .goog-te-menu-value {
                    color: inherit !important;
                }
            `}</style>
        </div>
    );
};

export default GoogleTranslate;