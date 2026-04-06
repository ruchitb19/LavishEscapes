document.addEventListener("DOMContentLoaded", () => {

    // The BASE_URL is no longer used since we hit our own backend
    // const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // const BASE_URL = "https://flexxptxqf.execute-api.ap-south-1.amazonaws.com/prod";

    async function postData(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        return response.json();
    }

    // TOUR FORM
    const tourForm = document.querySelector(".tour-search-form");

    if (tourForm) {
        tourForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const destination = document.getElementById("tourDestination").value.trim();
            const people = parseInt(document.getElementById("people").value);
            const checkin = document.getElementById("tourCheckin").value;
            const checkout = document.getElementById("tourCheckout").value;

            if (!destination || !people || !checkin || !checkout) {
                alert("Please fill all fields.");
                return;
            }

            if (new Date(checkout) <= new Date(checkin)) {
                alert("Checkout must be after check-in.");
                return;
            }

            const inquiryData = {
                destination,
                people,
                checkin,
                checkout,
                inquiryDate: new Date().toISOString(),
            };

            // Log data to browser console as requested
            console.log("Tour Search Data:", inquiryData);

            try {
                let baseUrl = '';
                // If running locally via Live Server or file protocol, explicitly specify the backend url
                if (window.location.port === '5500' || window.location.protocol === 'file:') {
                    baseUrl = 'http://localhost:5000';
                }

                await postData(`${baseUrl}/escapes-inquiry`, inquiryData);

                alert("Inquiry submitted successfully!");
                tourForm.reset();
            } catch (err) {
                alert("Submission failed.");
                console.error(err);
            }
        });
    }

    // CONTACT FORM
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !message) {
                alert("Please fill all contact fields.");
                return;
            }

            try {
                // Assuming your backend runs on the same domain or uses a relative path.
                let baseUrl = '';
                // If running locally via Live Server or file protocol, explicitly specify the backend url
                if (window.location.port === '5500' || window.location.protocol === 'file:') {
                    baseUrl = 'http://localhost:5000';
                }

                await postData(`${baseUrl}/send-email`, {
                    name,
                    email,
                    message,
                });

                alert("Message sent successfully!");
                contactForm.reset();
            } catch (err) {
                alert("Failed to send message. Please try again later.");
                console.error(err);
            }
        });
    }

});
