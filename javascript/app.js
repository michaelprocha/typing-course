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
	let gameOver = true;
	let changeLevel = false;

	levels.forEach((level, i) => {
		level.addEventListener("click", () => {
			texts.forEach((text, j) => {
				if (i == j) {
					text.classList.add("challenge-show");
				} else {
					text.classList.remove("challenge-show");
				}
			});
			changeLevel = true;
			timer.textContent = '0';
			currentRight.textContent = '0';
			currentWrong.textContent = '0';
			input.value = '';
		});
	});

	function start() {
		let runTimer = 60;
		if (gameOver) {
			gameOver = false;
			let count = setInterval(() => {
				runTimer--;
				timer.textContent = `${runTimer}`;
				if (runTimer <= 0) {
					gameOver = true;
					alert("Fim do tempo!");
					input.value = "";
					clearInterval(count);
				}
				if (changeLevel == true) {
					gameOver = true;
					changeLevel = false;
					input.value = "";
					timer.textContent = `60`;
					clearInterval(count);
				}
			}, 1000);
		}
	}

	function textSelect() {
		if (gameOver) {
			texts.forEach((element, i) => {
				if (element.classList.contains("challenge-show")) {
					[...textsChallenge[i].textContent].forEach((char) => {
						spanChar += `<span>${char}</span>`;
					});
					textsChallenge[i].innerHTML = spanChar;
					textsChallenge[i].id = "current";
				} else {
					textsChallenge[i].textContent = textsChallenge[i].textContent;
					textsChallenge[i].removeAttribute("id");
				}
			});
		}
	}

	function game() {
		if (!gameOver) {
			const letter = [...document.querySelectorAll("#current span")];
			letter.forEach((span, index) => {
				if (timer.textContent != "0") {
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
				} else {
					span.classList.remove("wrong");
					span.classList.remove("right");
				}
			});
		}
	}

	function count() {
		const letter = [...document.querySelectorAll("#current span")];
		const letterRight = Array.from(document.getElementsByClassName("right"));
		const letterWrong = Array.from(document.getElementsByClassName("wrong"));
		right = letterRight.length;
		wrong = letterWrong.length;
		currentRight.textContent = right;
		currentWrong.textContent = wrong;
		if (right == letter.length) {
			alert("Você conseguiu!");
		}
	}

	input.addEventListener("input", () => {
		textSelect();
		start();
		game();
		count();
	});
})();
