document.addEventListener("DOMContentLoaded", () => {

    const BASE_URL = "https://flexxptxqf.execute-api.ap-south-1.amazonaws.com/prod";

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

            try {
                await postData(`${BASE_URL}/escapes-inquiry`, {
                    destination,
                    people,
                    checkin,
                    checkout,
                    inquiryDate: new Date().toISOString(),
                });

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
                // If it's on a different port (like 5500), you'd need the full URL here, e.g., 'http://localhost:5500/send-email'
                await postData('/send-email', {
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
