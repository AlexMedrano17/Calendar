const actualDate = new Date();
var date = new Date();

function CreateCalendar(date) {
  let monthDaysElement = document.querySelector(".monthDays");
  monthDaysElement.innerHTML = "";

  let year = date.getFullYear();
  let month = date.getMonth();

  let numberOfDays = new Date(year, month + 1, 0).getDate();
  let dayOfWeek = new Date(year, month, 1).getDay();

  let list = numberOfDays > 30 && dayOfWeek > 4 ? 6 : 5;

  for (let i = 0; i < list; i++) {
    let trElement = document.createElement("tr");

    monthDaysElement.append(trElement);

    for (let j = 0; j < 7; j++) {
      let tdElement = document.createElement("td");
      tdElement.className = "day";

      trElement.append(tdElement);
    }
  }

  document.querySelector(".calendar").appendChild(monthDaysElement);

  let daysElement = [...document.getElementsByClassName("day")];
  let previousMonthDays = new Date(year, month, 0).getDate();

  for (
    let j = previousMonthDays - dayOfWeek + 1, previousCounter = 0;
    j <= previousMonthDays;
    j++, previousCounter++
  ) {
    if (previousCounter <= dayOfWeek) {
      let element = daysElement[previousCounter];
      element.innerText = j;
      element.classList.add("previousMonthDay");
      let cMonth = month % 12 || 12;
      element.dataset.date = `${element.innerText}/${cMonth}/${
        month > 0 ? year : year - 1
      }`;
    }
  }

  for (let j = 0, n = dayOfWeek; j < numberOfDays; j++, n++) {
    let element = daysElement[n];
    element.innerText = j + 1;
    element.classList.add("actualDayMonth");
    element.dataset.date = `${element.innerText}/${+month + 1}/${year}`;

    if (element.dataset.date === actualDate.toLocaleDateString()) {
      element.classList.add("today");
    }
  }

  daysElement
    .filter((x) => x.innerText === "")
    .forEach((element, i) => {
      element.classList.add("nextMonthDay");
      element.innerText = i + 1;
      let cMonth = month + (2 % 12) === 13 ? 1 : month + (2 % 12);
      element.dataset.date = `${element.innerText}/${cMonth}/${
        month + 1 < 12 ? year : year + 1
      }`;
    });

  for (let index = 0; index < daysElement.length; index++) {
    const element = daysElement[index];
    element.addEventListener("click", (e) => {
      console.log(e.target.dataset.date);
    });
  }
}

document.getElementById("dateText").innerText = date.toLocaleDateString(
  "en-US",
  { month: "long", year: "numeric" }
);
CreateCalendar(date);

function PreviousClick() {
  date.setMonth(date.getMonth() - 1);
  document.getElementById("dateText").innerText = date.toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );
  CreateCalendar(date);
}

function NextClick() {
  date.setMonth(date.getMonth() + 1);
  document.getElementById("dateText").innerText = date.toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );
  CreateCalendar(date);
}
