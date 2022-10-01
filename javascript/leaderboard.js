import { getData } from "./database.js";

document.addEventListener("DOMContentLoaded", () => {
  const leaderboardContainer = document.querySelector(".leaderboard-container");

  // for (let i = 0; i < 2; i++) {
  //   data[i] = getData("user" + (i + 1));
  //   scores[i].name = data.name;
  //   scores[i].score = data.score;
  //   console.log(scores[i]);
  // }

  function updateLeaderboardView() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    scores.sort(function (a, b) {
      return b.score - a.score;
    });
    let elements = [];

    for (let i = 0; i < scores.length; i++) {
      let name = document.createElement("div");
      let score = document.createElement("div");
      name.classList.add("name");
      score.classList.add("score");
      name.innerText = scores[i].name;
      score.innerText = scores[i].score;

      let scoreRow = document.createElement("div");
      scoreRow.classList.add("row");
      scoreRow.appendChild(name);
      scoreRow.appendChild(score);
      leaderboard.appendChild(scoreRow);

      elements.push(scoreRow);
    }

    let colors = ["gold", "silver", "#cd7f32", "white"];
    for (let i = 0; i < 3; i++) {
      elements[i].style.color = colors[i];
    }
    for (let i = 3; i < scores.length; i++) {
      elements[i].style.color = colors[3];
    }
  }

  updateLeaderboardView();
});
