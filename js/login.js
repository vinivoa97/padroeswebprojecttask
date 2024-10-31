document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-message");
  form.appendChild(errorMessage);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    errorMessage.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    if (!email) {
      emailInput.nextElementSibling.textContent =
        "Por favor, insira um e-mail.";
      valid = false;
    } else if (!validateEmail(email)) {
      emailInput.nextElementSibling.textContent =
        "Por favor, insira um e-mail válido.";
      valid = false;
    } else {
      emailInput.nextElementSibling.textContent = "";
    }

    if (!password) {
      passwordInput.nextElementSibling.textContent =
        "Por favor, insira uma senha.";
      valid = false;
    } else {
      passwordInput.nextElementSibling.textContent = "";
    }

    if (!valid) {
      return;
    }

    if (email === "usuario@exemplo.com" && password === "senha123") {
      localStorage.setItem("user", JSON.stringify({ email }));

      window.location.href = "/dashboard.html";
    } else {
      emailInput.nextElementSibling.textContent = "E-mail ou senha incorretos.";
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
