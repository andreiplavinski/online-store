import "./window.scss";

class window {
  createContent() {
    const window = document.createElement("div");
    window.className = "window";
    window.addEventListener("click", (event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.className === "window"
      ) {
        const parent = window.parentNode;
        parent?.removeChild(window);
      }
    });

    const windowContent = document.createElement("form");
    windowContent.className = "window-content";

    const personalWraper = document.createElement("fieldset");
    personalWraper.className =
      "window-content__personal-wraper personal-wraper";

    const personalTitle = document.createElement("legend");
    personalTitle.innerText = "Personal details";
    personalTitle.className = "personal-wraper__title";

    const personalName = document.createElement("input");
    personalName.className = "personal-wraper__name";
    personalName.type = "text";
    personalName.placeholder = "Name";
    personalName.pattern =
      "^([a-zA-Zа-яА-Я]{3,23}\\s+[a-zA-Zа-яА-Я]{3,23}|[a-zA-Zа-яА-Я]{3,23}\\s+[a-zA-Zа-яА-Я]{3,23}[a-zA-Zа-яА-Я\\s]+)$";
    personalName.required = true;

    const personaPhone = document.createElement("input");
    personaPhone.className = "personal-wraper__phone";
    personaPhone.type = "tel";
    personaPhone.placeholder = "Phone number";
    personaPhone.pattern = "^[+][0-9]{9,23}$";
    personaPhone.required = true;

    const personalAddress = document.createElement("input");
    personalAddress.className = "personal-wraper__address";
    personalAddress.type = "text";
    personalAddress.placeholder = "Delivery address";
    personalAddress.pattern =
      "^([a-zA-Zа-яА-Я]{5,23}\\s[a-zA-Zа-яА-Я]{5,23}\\s[a-zA-Zа-яА-Я]{5,23}|[a-zA-Zа-яА-Я]{5,23}\\s[a-zA-Zа-яА-Я]{5,23}\\s[a-zA-Zа-яА-Я]{5,23}[a-zA-Zа-яА-Я\\s]+)$";
    personalAddress.required = true;

    const personalEmail = document.createElement("input");
    personalEmail.className = "personal-wraper__email";
    personalEmail.type = "email";
    personalEmail.pattern =
      "^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}.){1,}[-A-Za-z]{2,})$";
    personalEmail.placeholder = "E-mail";
    personalEmail.required = true;

    const cardWraper = document.createElement("fieldset");
    cardWraper.className = "window-content__card-wraper card-wraper";

    const cardlTitle = document.createElement("legend");
    cardlTitle.innerText = "Credit card details";
    cardlTitle.className = "card-wraper__title";

    const cardNumber = document.createElement("input");
    cardNumber.className = "card-wraper__number";
    cardNumber.pattern = "([0-9]{4}\\s[0-9]{4}\\s[0-9]{4}\\s[0-9]{4})$";
    cardNumber.type = "text";
    cardNumber.maxLength = 19;
    cardNumber.placeholder = "Card number";
    cardNumber.required = true;

    cardNumber.addEventListener("input", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        event.target.value = event.target.value.replace(/[^0-9 ]+/g, "");
        event.target.value = event.target.value.replace(
          /(\d{4})(\d+)/g,
          "$1 $2"
        );
      }
    });

    const cardValid = document.createElement("input");
    cardValid.className = "card-wraper__valid";
    cardValid.type = "text";
    cardValid.maxLength = 5;
    cardValid.pattern = "^(0[1-9]/[2-9][3-9]|1[0-2]/[2-9][3-9])$";
    cardValid.placeholder = "Valid";
    cardValid.required = true;

    cardValid.addEventListener("input", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        event.target.value = event.target.value.replace(/[^0-9/]+/g, "");
        event.target.value = event.target.value.replace(
          /(\d{2})(\d+)/g,
          "$1/$2"
        );
      }
    });

    const cardCvv = document.createElement("input");
    cardCvv.className = "card-wraper__cvv";
    cardCvv.placeholder = "CVV";
    cardCvv.required = true;
    cardCvv.pattern = "^([0-9]{3})$";
    cardCvv.type = "text";
    cardCvv.maxLength = 3;

    cardCvv.addEventListener("input", (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        event.target.value = event.target.value.replace(/[^0-9/]+/g, "");
      }
    });

    const submitButton = document.createElement("button");
    submitButton.className = "window-content__button";
    submitButton.type = "button";
    submitButton.innerText = "CONFIRM";

    submitButton.addEventListener("click", () => {
      this.checkValidation();
    });

    const personalItems = [
      personalName,
      personaPhone,
      personalAddress,
      personalEmail,
    ];

    personalWraper.append(personalTitle);

    for (const item of personalItems) {
      const personalItem = document.createElement("div");
      personalItem.className = "personal-wraper__item";
      const personalSpan = document.createElement("span");
      personalSpan.className = "hint";
      personalItem.append(item, personalSpan);
      personalWraper.append(personalItem);
    }

    cardWraper.append(cardlTitle);

    const cardItems = [cardNumber, cardValid, cardCvv];

    for (const item of cardItems) {
      const cardItem = document.createElement("div");
      cardItem.className = "card-wraper__item";
      const cardSpan = document.createElement("span");
      cardSpan.className = "hint";
      cardItem.append(item, cardSpan);
      cardWraper.append(cardItem);
    }

    windowContent.append(personalWraper, cardWraper, submitButton);

    window.append(windowContent);

    const inputs = window.querySelectorAll("input");
    for (const input of inputs) {
      if (input instanceof HTMLInputElement) {
        input.addEventListener("input", () => {
          const sibling = input.nextSibling;
          if (sibling instanceof HTMLSpanElement) {
            if (!input.checkValidity()) {
              sibling.innerText = "error!";
              sibling.classList.add("hint-error");
              sibling.classList.remove("hint-ok");
            } else {
              sibling.innerText = "✓";
              sibling.classList.remove("hint-error");
              sibling.classList.add("hint-ok");
            }
          }
        });
      }
    }

    return window;
  }

  checkValidation() {
    const hints = document.querySelectorAll(".hint");
    for (const hint of hints) {
      if (hint instanceof HTMLSpanElement) {
        const sibling = hint.previousSibling;
        if (sibling instanceof HTMLInputElement) {
          if (!sibling.checkValidity()) {
            hint.innerText = "error!";
            hint.classList.add("hint-error");
            hint.classList.remove("hint-ok");
          } else {
            hint.innerText = "✓";
            hint.classList.remove("hint-error");
            hint.classList.add("hint-ok");
          }
        }
      }
    }
  }
}
export default window;
