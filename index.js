document.addEventListener("DOMContentLoaded", () => {
    const partyForm = document.getElementById("party-form");
    const partyList = document.getElementById("party-list");

    // Handle form submission
    partyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("party-name").value;
        const date = document.getElementById("party-date").value;
        const time = document.getElementById("party-time").value;
        const location = document.getElementById("party-location").value;
        const description = document.getElementById("party-description").value;

        // Create a new party item
        const partyItem = document.createElement("li");
        partyItem.innerHTML = `
            <strong>${name}</strong>
            <br>Date: ${date}, Time: ${time}
            <br>Location: ${location}
            <br>Description: ${description}
            <button class="delete-button">Delete</button>
        `;

        // Add the party item to the list
        partyList.appendChild(partyItem);

        // Clear the form fields
        partyForm.reset();

        // Attach event listener to the delete button
        const deleteButton = partyItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            partyList.removeChild(partyItem);
        });

        // Send the party details to the server using fetch
        const partyData = {
            name: name,
            date: date,
            time: time,
            location: location,
            description: description
        };

        fetch("/api/create-party", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partyData)
        })
        .then(response => {
            if (response.ok) {
                console.log("Party details sent to server successfully");
            } else {
                console.error("Error sending party details to server");
            }
        })
        .catch(error => {
            console.error("Error sending party details to server:", error);
        });
    });
});
