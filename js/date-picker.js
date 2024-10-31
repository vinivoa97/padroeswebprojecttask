document.addEventListener("DOMContentLoaded", function () {
  const dateSelector = document.getElementById("date-selector");
  const datePopup = document.getElementById("date-popup");
  const dateInput = document.getElementById("date-input");
  const scheduleTimes = document.querySelectorAll(".schedule-time");

  dateSelector.addEventListener("click", () => {
    datePopup.classList.toggle("hidden");
    const rect = dateSelector.getBoundingClientRect();
    datePopup.style.top = `${rect.bottom + window.scrollY}px`;
    datePopup.style.left = `${rect.left + window.scrollX}px`;
  });

  dateInput.addEventListener("change", () => {
    const selectedDate = dateInput.value;
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        weekday: "short",
      });
      dateSelector.textContent = formattedDate;

      const url = new URL(window.location);
      url.searchParams.set(
        "consultationId",
        "CRP08/259151567" + "/" + selectedDate
      );
      window.history.pushState({}, "", url);
    }
    datePopup.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (!datePopup.contains(event.target) && event.target !== dateSelector) {
      datePopup.classList.add("hidden");
    }
  });

  scheduleTimes.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTime = button.textContent;
      const url = new URL(window.location);
      let consultationId = url.searchParams.get("consultationId");

      if (!consultationId) {
        const today = new Date().toISOString().split("T")[0];
        consultationId = `CRP08/259151567/${today}`;
      }

      url.searchParams.set(
        "consultationId",
        consultationId + ` ${selectedTime}`
      );
      window.history.pushState({}, "", url);
      window.location.href = `/login.html${url.search}`;
    });
  });
});
