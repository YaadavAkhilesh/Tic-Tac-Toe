const boXes = document.querySelectorAll(".boxx");
const start_Btn = document.querySelector(".start-game");
const restart_Btn = document.querySelector(".reset-game");
// 📢winner lining element
const Liner = document.querySelector(".line");
// 🤖my audio
const gameAudio = document.querySelector("audio");
// 👻👻start audio sound
const startAudio = document.querySelector(".startaudio");

function gameLoad() {
  boXes.forEach((box) => {
    box.disabled = true;
    box.textContent = "";
  });
}

gameLoad();

start_Btn.addEventListener("click", () => {
  startAudio.play();
  startAudio.playbackRate = 2.0;
  start_Btn.style.display = "none";
  restart_Btn.style.display = "block";
  tictac();
});

function tictac() {
  let flag = true;

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2, 40, 0, 0],
      [3, 4, 5, 100, 0, 0],
      [6, 7, 8, 160, 0, 0],
      [0, 3, 6, 0, 90, 120],
      [1, 4, 7, 0, 90, 0],
      [2, 5, 8, 0, 90, -120],
      [0, 4, 8, 100, 20, 0],
      [2, 4, 6, 100, -20, 0],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c, e, f, g] = combination;
      console.log(e);

      if (
        boXes[a].textContent.trim() !== "" &&
        boXes[a].textContent === boXes[b].textContent &&
        boXes[a].textContent === boXes[c].textContent
      ) {
        Liner.style.width = "0"; // Set initial width to 0
        Liner.style.display = "block";

        // Trigger reflow (force browser to repaint before changing width)
        Liner.offsetWidth; // eslint-disable-line no-unused-expressions

        // Set width to 100% with a transition effect
        Liner.style.width = "100%";
        Liner.style.transform = `translateY(${e}px) rotate(${f}deg) translateY(${g}px)`;
        let winner = document.querySelector("h1");
        // 😊winner find
        winner.textContent = `${boXes[a].textContent} + wins!`;
        restart_Btn.textContent = "start new game";
      }
    }
  }

  boXes.forEach((box) => {
    box.disabled = false;
    box.addEventListener("click", () => {
      gameAudio.play();
      gameAudio.playbackRate = 2.0;
      if (box.textContent.trim() !== "") {
        alert("This box has already been selected!");
        return;
      }

      box.textContent = flag ? "❌" : "🟢";
      flag = !flag;
      console.log(flag);
      checkWinner();
    });
  });
}

restart_Btn.addEventListener("click", () => {
  start_Btn.style.display = "block";
  restart_Btn.style.display = "none";
  gameLoad();
  location.reload();
});
