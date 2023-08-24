document.addEventListener("DOMContentLoaded", function () {
    function parseJSON(response) {
        return new Promise((resolve, reject) => {
            if (!response.ok) {
                response.text().then(text => reject(new Error(text)));
            } else {
                response.json().then(data => resolve(data)).catch(() => reject(new Error('Failed to parse JSON')));
            }
        });
    }
    
    function postCountry(name) {
        fetch("/api/vacation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        })
        .then(parseJSON)
        .then((data) => {
            addCountryToContent(data.country_id, name);
        })
        .catch((error) => console.error("Error:", error.message));
    }
  
    function updateCountry(id, newName) {
        fetch(`/api/vacation/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName }),
        })
        .catch((error) => console.error("Error:", error));
    }
  
    function deleteCountry(id) {
        fetch(`/api/vacation/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            const elementToDelete = document.getElementById(`country-${id}`);
            elementToDelete.remove();
        })
        .catch((error) => console.error("Error:", error));
    }
  
    function addCountryToContent(id, name) {
        const contentDiv = document.getElementById("itinerary-content");
    
        const countryDiv = document.createElement("div");
        countryDiv.id = `country-${id}`;
        countryDiv.className = "country";
    
        const countryText = document.createElement("span");
        countryText.textContent = name;
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "country-btn delete-btn";
        deleteButton.addEventListener("click", function () {
            deleteCountry(id);
        });
    
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.className = "country-btn update-btn";
        updateButton.addEventListener("click", function () {
            const newName = prompt("Update the country name:", name);
            if (newName) {
                updateCountry(id, newName);
                countryText.textContent = newName;
            }
        });
    
        countryDiv.appendChild(countryText);
        countryDiv.appendChild(updateButton);
        countryDiv.appendChild(deleteButton);
        contentDiv.appendChild(countryDiv);
    }
  
    function getCountries() {
        fetch("/api/vacation")
        .then(parseJSON)
        .then((data) => {
            data.forEach((item) => {
                addCountryToContent(item.country_id, item.name);
            });
        })
        .catch((error) => console.error("Error:", error.message));
    }
  
    // Event listener for the form submission
    const form = document.getElementById("vacation-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const countryInput = e.target.querySelector("input[type='text']");
        postCountry(countryInput.value);
        countryInput.value = ""; // clear the input after submitting
    });
  
    // Call the getDestinations function to fetch and display destinations on page load
    getCountries();
});
  