// handle login password panel
let showPassBtn = document.querySelector(
    ".security-input form .input button.show-pass"
  ),
  showPassBtnActive = false;

showPassBtn.onclick = () => {
  if (!showPassBtnActive) {
    showPassBtn.value = "&#xf06e;";
    showPassBtn.classList.remove("fa-eye-slash");
    showPassBtn.classList.add("fa-eye");
    showPassBtn.previousElementSibling.setAttribute("type", "text");
    showPassBtnActive = true;
  } else {
    showPassBtn.value = "&#xf00d;";
    showPassBtn.classList.add("fa-eye-slash");
    showPassBtn.classList.remove("fa-eye");
    showPassBtn.previousElementSibling.setAttribute("type", "password");
    showPassBtnActive = false;
  }
};

let securityForm = document.querySelector(".security-input form"),
  securityInputPass = document.querySelector(
    ".security-input form .input input.security-pass"
  );

const LoginPasswords = {
  Grand: "Grand678",
  Rigs: "Rigs91021",
  Karuminska: "Karu9512",
  Fierce: "Fierce7215",
  Hayzen: "Hayzen91290",
};

securityForm.onsubmit = (e) => {
  e.preventDefault();
  if (securityInputPass.value === "" || securityInputPass.value === null) {
    securityForm.lastElementChild.innerHTML = "Please enter a valid password!";
  } else {
    [...Object.values(LoginPasswords)].forEach((pass) => {
      if (securityInputPass.value === pass) {
        securityForm.parentElement.remove();
        document.querySelector(".global-container").style.display = "block";
        window.sessionStorage.setItem("Password", true);
      } else {
        securityForm.lastElementChild.innerHTML = "Invalid password!";
      }
    });
  }
};

window.onload = function () {
  let pass = JSON.parse(window.sessionStorage.getItem("Password"));

  if (pass == true) {
    console.log(`Successfully loged in!`);
    securityForm.parentElement.remove();
    document.querySelector(".global-container").style.display = "block";
  }
};
