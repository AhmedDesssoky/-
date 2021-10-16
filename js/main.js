let explorBtn = document.querySelector(".title .btn"),
  hadithSection = document.querySelector(".hadith");

explorBtn.addEventListener("click", () => {
  hadithSection.scrollIntoView({
    behavior: "smooth",
  });
});
let fixedNav = document.querySelector(".header"),
  scrollBtn = document.querySelector(".scroll-btn");

window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");
  window.scrollY > 500
    ? scrollBtn.classList.add("active")
    : scrollBtn.classList.remove("active");
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
let hadithContainer = document.querySelector(".hadithContainer"),
  next = document.querySelector(".buttons .next "),
  prev = document.querySelector(".buttons .prev "),
  number = document.querySelector(".buttons .number ");

let hadithIndex = 0;
hadithChanger();
async function hadithChanger() {
  let result = await fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
  const data = await result.json();
    
      let Hadiths = data.data.hadiths;
      changeHadith();
      next.addEventListener("click", () => {
        hadithIndex == 299 ? (hadithIndex = 0) : hadithIndex++;
        changeHadith();
      });
      prev.addEventListener("click", () => {
        hadithIndex == 0 ? (hadithIndex = 299) : hadithIndex--;
        changeHadith();
      });

      function changeHadith() {
        hadithContainer.innerText = Hadiths[hadithIndex].arab;
        number.innerText = `300 - ${hadithIndex + 1}`;
      }
    ;
}

let sections = document.querySelectorAll("section"),
  Links = document.querySelectorAll(".header ul li ");
Links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active ").classList.remove("active");
    link.classList.add("active");

    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
let quranContainer = document.querySelector(".quranContainer");
getquran();
async function getquran() {
  let result = await fetch("http://api.alquran.cloud/v1/meta");
  const data = await result.json();

  let surths = data.data.surahs.references;
  let numberOfSurths = 114;
  for (let i = 0; i < numberOfSurths; i++) {
    quranContainer.innerHTML += `
                   <div class="sourah">
                   <p>${surths[i].name}</p>
                   <p>${surths[i].englishName}</p>
               </div>`;
  }
  let sourthTitle = document.querySelectorAll(".sourah");
  let popup = document.querySelector(".surah-popup"),
    ayatContainer = document.querySelector(".ayat");
  sourthTitle.forEach((title, index) => {
    title.addEventListener("click", () => {
      fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
        .then((response) => response.json())
        .then((data) => {
          ayatContainer.innerHTML = ``;
          let Ayat = data.data.ayahs;
          Ayat.forEach((aya) => {
            popup.classList.add("active");
            ayatContainer.innerHTML += `
                           <p>{${aya.numberInSurah}} - ${aya.text}</p>
                           `;
          });
        });
    });
  });
  let closepope = document.querySelector(".close-popup");
  closepope.addEventListener("click", () => {
    popup.classList.remove("active");
  });
}

let cards = document.querySelector(".cards");
getPrayTime();
async function getPrayTime() {
  let result = await fetch(
    "http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8"
  );
  const data = await result.json();

  let times = data.data.timings;

  cards.innerHTML = "";
  for (let time in times) {
    cards.innerHTML += `
                   <div class="card">
                   <div class="circle">
                       <svg>
                           <circle cx="100" cy="100" r="100"></circle>
                       </svg>
                       <div class="pray-time">${times[time]}</div>
                   </div>
                   <p>${time}</p>
               </div>`;
  }
}

let bars = document.querySelector(".bars"),
  sideBar = document.querySelector(".header ul");
bars.addEventListener("click", () => {
  sideBar.classList.toggle("active");
});





