let contactform = document.getElementById("contactForm");
let formMessage = document.getElementById("formMessage");

if (contactform && formMessage) {
  contactform.addEventListener("submit", function (e) {
    e.preventDefault(); 
    let formData = new FormData(contactform);

    fetch(contactform.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    }).then(response => {
      if (response.ok) {
     
        formMessage.classList.remove("d-none", "alert-danger");
        formMessage.classList.add("alert-success");
        formMessage.innerHTML = `
          ✅ <strong>Thank you!</strong> Your request has been submitted. I'll get back to you soon.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        contactform.reset(); 
      } else {
        // Server error
        formMessage.classList.remove("d-none", "alert-success");
        formMessage.classList.add("alert-danger");
        formMessage.innerHTML = `
          ❌ <strong>Oops!</strong> Something went wrong. Please try again later.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
      }
    }).catch(() => {
      // Network error (no internet, etc.)
      formMessage.classList.remove("d-none", "alert-success");
      formMessage.classList.add("alert-danger");
      formMessage.innerHTML = `
        ❌ <strong>Network Error!</strong> Please try again later.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
    });
  });
}
