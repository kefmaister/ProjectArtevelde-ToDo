// import { logout } from "../../../src/controllers/AuthController.js"; error on this line


const event = document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout");
  const popup = document.querySelector(".popup");
  const closeButton = popup.querySelector(".close-button");
  const cancelButton = popup.querySelector(".cancel-button");
  const okButton = popup.querySelector(".ok-button");

  logoutButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
  });

  okButton.addEventListener("click", () => {
    // Call the logout function
    logout()
      .then(() => {
        // Once the logout function is complete (cookie cleared and redirected), hide the popup
        popup.style.display = "none";
      })
      .catch((error) => {
        console.error("Error occurred during logout:", error);
        // If an error occurs, you may handle it appropriately (e.g., display an error message)
      });
  });
});
