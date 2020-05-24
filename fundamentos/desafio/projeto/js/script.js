// lists
let allUsers = [];
let filteredUsers = [];

// elements
let inputElement = null;
let userListInfoElement = null;
let totalFilteredUsersElement = null;
let totalFilteredFemaleElement = null;
let totalFilteredMaleElement = null;
let totalUsers = null;
let ageSumElement = null;
let ageAverageElement = null;
let button = null;
let showStatisticsElement = null;
let statisticsElement = null;

// statistics
let totalFilteredUsers = 0;
let totalFilteredMale = 0;
let totalFilteredFemale = 0;
let ageSum = 0;
let showStatistics = false;

let numberFormat = Intl.NumberFormat("pt-BR");

window.addEventListener("load", () => {
  selectElements();
  fetchUsers();
});

const selectElements = () => {
  inputElement = document.querySelector("#name");
  inputElement.focus();
  inputElement.addEventListener("input", filterUsers);
  userListInfoElement = document.querySelector("#listInfo");
  totalFilteredUsersElement = document.querySelector("#totalFilteredUsers");
  totalFilteredMaleElement = document.querySelector("#totalFilteredMale");
  totalFilteredFemaleElement = document.querySelector("#totalFilteredFemale");
  ageSumElement = document.querySelector("#ageSum");
  ageAverageElement = document.querySelector("#ageAverage");
  button = document.querySelector("button");
  showStatisticsElement = document.querySelector("#showStatistics");
  showStatisticsElement.addEventListener("click", toggleStatistics);
  statisticsElement = document.querySelector("#statistics");
  console.log(showStatisticsElement);
};

const fetchUsers = async () => {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  console.log(json);
  allUsers = json.results.map((user) => {
    const { gender, name, dob, picture } = user;
    const completeName = `${name.first} ${name.last}`;
    return {
      completeName,
      age: dob.age,
      gender,
      thumbnail: picture.thumbnail,
    };
  });
};

const filterUsers = () => {
  const name = event.target.value.trim();
  if (!name) {
    filteredUsers = [];
  } else {
    filteredUsers = allUsers.filter((user) => {
      return user.completeName.toLowerCase().includes(name.toLowerCase());
    });
    filteredUsers = sortUsers(filteredUsers);
  }
  calc();
  render();
};

const render = () => {
  statistics();
  list();
};

const sortUsers = () => {
  return filteredUsers.sort((a, b) => {
    return a.completeName.localeCompare(b.completeName);
  });
};

const list = () => {
  if (!filteredUsers) {
    console.log("sem usuarios");
    console.log(filteredUsers);
    console.log(totalFilteredUsers);
    console.log(totalFilteredUsersElement);
    return;
  }
  let userListHTML = "<ul>";
  filteredUsers.forEach((user) => {
    userListHTML += `
            <li>
                <img class="photo" src="${user.thumbnail}" alt="User photo" />
                <span class="name">${
                  user.completeName
                } <span><span class="idade">| ${user.age} ${
      user.age > 1 ? "anos" : "ano"
    }</span>
            
            </li>
        `;
  });
  userListHTML += "</ul>";
  userListInfoElement.innerHTML = userListHTML;
  totalFilteredUsersElement.textContent = totalFilteredUsers;
};

const statistics = () => {
  totalFilteredMaleElement.textContent = totalFilteredMale;
  totalFilteredFemaleElement.textContent = totalFilteredFemale;
  totalFilteredUsersElement.textContent = totalFilteredUsers;
  ageSumElement.textContent = formatNumber(ageSum);
  ageAverageElement.textContent = formatNumber(ageAverage);
};

const calc = () => {
  totalFilteredUsers = filteredUsers.length;
  totalFilteredMale = totalByGender("male");
  totalFilteredFemale = totalByGender("female");
  ageSum = sumAge();
  ageAverage = average();
};

const totalByGender = (gender) => {
  return filteredUsers.filter((user) => user.gender === gender).length;
};

const sumAge = () => {
  return filteredUsers.reduce((acc, curr) => acc + curr.age, 0);
};

const average = () => {
  if (totalFilteredUsers === 0) {
    return 0;
  }
  return ageSum / totalFilteredUsers;
};

const formatNumber = (number) => {
  return numberFormat.format(number);
};

const toggleStatistics = () => {
  console.log(showStatistics);
  showStatistics = !showStatistics;
  const display = showStatistics ? "block" : "none";
  const buttonTextContent = showStatistics
    ? "Esconder estatísticas"
    : "Mostrar estatísticas";
  statisticsElement.style.display = display;
  showStatisticsElement.textContent = buttonTextContent;
};
