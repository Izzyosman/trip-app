document.addEventListener("DOMContentLoaded", function () {

  function postDestination(destination) {
      fetch("api/vacation", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ destination }),
      })
      .then(response => response.json())
      .then(data => {
          addDestinationToContent(data.id, destination);
      })
      .catch(error => console.error("Error:", error));
  }

  function updateDestination(id, newDestination) {
      fetch(`api/vacation/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ destination: newDestination }),
      })
      .catch(error => console.error("Error:", error));
  }

  function deleteDestination(id) {
      fetch(`api/vacation/${id}`, {
          method: "DELETE",
      })
      .then(() => {
          // Remove the element from the page
          const elementToDelete = document.getElementById(`destination-${id}`);
          elementToDelete.remove();
      })
      .catch(error => console.error("Error:", error));
  }

  function getDestinations() {
      fetch("api/vacation")
      .then(response => response.json())
      .then(data => {
          data.forEach(item => {
              addDestinationToContent(item.id, item.destination);
          });
      })
      .catch(error => console.error("Error:", error));
  }

  function addDestinationToContent(id, destination) {
      const contentDiv = document.getElementById("itinerary-content");

      const destinationDiv = document.createElement("div");
      destinationDiv.id = `destination-${id}`;
      destinationDiv.className = 'destination';
      
      const destinationText = document.createElement("span");
      destinationText.textContent = destination;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "destination-btn delete-btn";
      deleteButton.addEventListener("click", function () {
          deleteDestination(id);
      });

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.className = "destination-btn update-btn";
      updateButton.addEventListener("click", function () {
          const newDestination = prompt("Update the destination:", destination);
          if (newDestination) {
              updateDestination(id, newDestination);
              destinationText.textContent = newDestination;
          }
      });

      destinationDiv.appendChild(destinationText);
      destinationDiv.appendChild(updateButton);
      destinationDiv.appendChild(deleteButton);
      contentDiv.appendChild(destinationDiv);
  }

  const form = document.getElementById("vacation-form");
  form.addEventListener("submit", function (e) {
      e.preventDefault();
      const destinationInput = e.target.querySelector("input[type='text']");
      postDestination(destinationInput.value);
      destinationInput.value = ""; // clear the input after submitting
  });

  getDestinations();

});

  
