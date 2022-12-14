async function getData(apiLink) {
  try {
    let connection = await fetch(apiLink);
    console.log("Connection Established!");
    return await connection.json();
  } catch {
    Error("Failed to establish a connection!");
  }
}

async function renderBlocks() {
  let responses = await getData("imgs/images.json");
}

// handle disabling inspect element
document.body.oncontextmenu = () => {
  return false;
};

document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

// handle scroll progress bar
let scrollProgressSpan = document.querySelector("span.scroll-progress"),
  headerElement = document.querySelector("header");

// handle scroll-up button & progress bar
let goUpBtn = document.querySelector(".go-up");

window.onscroll = () => {
  if (window.scrollY > headerElement.offsetHeight) {
    scrollProgressSpan.style.display = "block";

    // get available scroll height (total actual height - client bar height), documentElement (root element) = <html>
    let availableHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // progress span width = (scrolled value / available height) * 100
    scrollProgressSpan.style.width = `${Math.round(
      (window.scrollY / availableHeight) * 100
    )}%`;
  } else {
    scrollProgressSpan.style.display = "none";
  }

  if (window.scrollY >= 450) goUpBtn.style.display = "block";
  else goUpBtn.style.display = "none";
};

goUpBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

// handle navigation menu button
let menuButton = document.querySelector(".menu");

menuButton.onclick = () => {
  menuButton.nextElementSibling.classList.toggle("active");
};

document.onclick = (e) => {
  if (e.target != menuButton && e.target != menuButton.nextElementSibling) {
    if (menuButton.nextElementSibling.classList.contains("active"))
      menuButton.nextElementSibling.classList.toggle("active");
  }

  if (
    e.target !== document.querySelector("header nav ul li.active-li > ul") &&
    e.target !== document.querySelector("header nav ul li.active-li a.active") &&
    document.querySelector("header nav ul li.active-li > ul").style.display === "block"
  ) {
    document.querySelector("header nav ul li.active-li a.active").click();
  }
};

menuButton.nextElementSibling.onclick = (e) => {
  e.stopPropagation();
};

// handle sub-menu for header
let activeBtn = document.querySelector("li.active-li a.active"),
  activeBtnStartus = false;

activeBtn.onclick = () => {
  if (!activeBtnStartus) {
    activeBtn.style.setProperty("--fake-transform", "180deg");
    activeBtn.nextElementSibling.style.display = "block";
    activeBtnStartus = true;
  } else {
    activeBtn.style.setProperty("--fake-transform", "0deg");
    activeBtn.nextElementSibling.style.display = "none";
    activeBtnStartus = false;
  }
};

// handle copy codes button
let codeWrappers = document.querySelectorAll(".template .code-wrapper"),
  copyButtons = document.querySelectorAll(".code-wrapper button.copy");

codeWrappers.forEach((codeWrapper, index) => {
  codeWrapper.onmouseover = () => {
    copyButtons[index].style.display = "block";
  };
  codeWrapper.onmouseleave = () => {
    copyButtons[index].style.display = "none";
  };
});

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let textToCopy = button.nextElementSibling.innerText;
    copyText(textToCopy);
  });
});

// handle copy question to clipboard button
let qCpyBtns = document.querySelectorAll("table .question-copy-button");

qCpyBtns.forEach((button) => {
  button.firstElementChild.onclick = () => {
    let textToCopy = button.previousElementSibling.firstElementChild.innerText;
    copyText(textToCopy);
  };
});

// handle copy final results to clipboard button
let cpyFinalResBtn = document.querySelector(".get-results .copy-final-results"),
  finalResValue = 0;

cpyFinalResBtn.onclick = () => {
  let textToCopy =
    cpyFinalResBtn.previousElementSibling.firstElementChild.innerText;

  if (textToCopy >= 8) {
    document.querySelector(
      ".test-results-codes.trcp"
    ).firstElementChild.innerHTML = textToCopy;
    copyText(document.querySelector(".test-results-codes.trcp").innerText);
  } else if (textToCopy < 8) {
    document.querySelector(
      ".test-results-codes.trcf"
    ).firstElementChild.innerHTML = textToCopy;
    copyText(document.querySelector(".test-results-codes.trcf").innerText);
  } else {
    return;
  }
};

// handle increase answered questions number
cpyFinalResBtn.parentElement.nextElementSibling.onclick = () => {
  if (finalResValue >= 10) return;

  cpyFinalResBtn.previousElementSibling.firstElementChild.textContent =
    ++finalResValue;
};

// handle decrease answered questions number
cpyFinalResBtn.parentElement.nextElementSibling.nextElementSibling.onclick =
  () => {
    if (finalResValue == 0)
      return (cpyFinalResBtn.previousElementSibling.firstElementChild.textContent = 0);

    cpyFinalResBtn.previousElementSibling.firstElementChild.textContent =
      --finalResValue;
  };

// copy text to clipboard function
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      document.querySelector(".copy-message").style.display = "block";
      console.log("Copied to clipboard");

      setTimeout(() => {
        document.querySelector(".copy-message").style.display = "none";
      }, 1000);
    });
  } else {
    console.log("Browser not compatible!");
  }
}
