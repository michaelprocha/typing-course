(function () {
	const levels = Array.from(document.querySelectorAll(".item-list"));
	const texts = Array.from(document.querySelectorAll(".challenge"));
	const textsChallenge = Array.from(document.querySelectorAll(".text-challenge"));
	const input = document.getElementById("answer");
	const timer = document.getElementById("timer");
	const currentRight = document.getElementById("right-letter");
	const currentWrong = document.getElementById("wrong-letter");

	let spanChar = "";
	let right = 0;
	let wrong = 0;
	let runTimer = 60;
	let win = false;
	let gameOver = true;
	let saveTexts = [];

	textsChallenge.forEach((element, i) => {
		saveTexts[i] = element.textContent.replace(/\s+/g, " ").trim();
	});

	console.log(textsChallenge);
	console.log(saveTexts);

	texts.forEach((element, i) => {
		if (element.classList.contains("challenge-show")) {
			[...textsChallenge[i].textContent].forEach((char) => {
				spanChar += `<span>${char}</span>`;
			});
			textsChallenge[i].innerHTML = spanChar;
			textsChallenge[i].id = "current";
		}
	});

	levels.forEach((level, i) => {
		level.addEventListener("click", () => {
			if (gameOver) {
				texts.forEach((text, j) => {
					if (i == j) {
						text.classList.add("challenge-show");
					} else {
						text.classList.remove("challenge-show");
					}
				});
				texts.forEach((element, i) => {
					if (element.classList.contains("challenge-show")) {
						[...textsChallenge[i].textContent].forEach((char) => {
							spanChar += `<span>${char}</span>`;
						});
						textsChallenge[i].innerHTML = spanChar;
						textsChallenge[i].id = "current";
						spanChar = "";
					} else {
						textsChallenge[i].textContent = saveTexts[i];
						textsChallenge[i].removeAttribute("id");
					}
				});
			}
		});
	});

	function gameProgress() {
		const letter = [...document.querySelectorAll("#current span")];
		letter.forEach((span, index) => {
			if (gameOver == false) {
				if (input.value[index] == span.textContent) {
					span.classList.add("right");
					span.classList.remove("wrong");
				} else if (input.value[index] == undefined) {
					span.classList.remove("wrong");
					span.classList.remove("right");
				} else {
					span.classList.add("wrong");
					span.classList.remove("right");
				}
			}
		});
	}

	function count() {
		const letterRight = Array.from(document.getElementsByClassName("right"));
		const letterWrong = Array.from(document.getElementsByClassName("wrong"));
		right = letterRight.length;
		wrong = letterWrong.length;
		currentRight.textContent = right;
		currentWrong.textContent = wrong;
	}

	function game() {
		if (gameOver) {
			gameOver = false;
			let intervalId = setInterval(() => {
				runTimer--;
				timer.textContent = `${runTimer}`;
				if (runTimer <= 0) {
					gameOver = true;
					input.value = "";
					currentRight.textContent = "0";
					currentWrong.textContent = "0";
					timer.textContent = "60";
					runTimer = 60;
					alert("Fim do tempo!");
					clearInterval(intervalId);
				}
				if (win) {
					win = false;
					gameOver = true;
					input.value = "";
					currentRight.textContent = "0";
					currentWrong.textContent = "0";
					timer.textContent = `60`;
					runTimer = 60;
					alert("Você conseguiu!");
					clearInterval(intervalId);
				}
			}, 1000);
		}
	}

	function endGame() {
		const letter = [...document.querySelectorAll("#current span")];
		if (gameOver) {
			letter.forEach((span) => {
				span.classList.remove("wrong");
				span.classList.remove("right");
			});
		}
	}

	function winGame() {
		const letter = [...document.querySelectorAll("#current span")];
		const letterRight = Array.from(document.getElementsByClassName("right"));
		if (letter.length == letterRight.length) {
			win = true;
		}
	}

	input.addEventListener("input", () => {
		game();
		gameProgress();
		count();
		game();
		winGame();
		endGame();
	});
})();
