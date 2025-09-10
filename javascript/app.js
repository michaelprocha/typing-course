(function () {
	const levels = Array.from(document.querySelectorAll(".item-list"));
	const texts = Array.from(document.querySelectorAll(".challenge"));
	const textsChallenge = Array.from(document.querySelectorAll(".text-challenge"));
	const input = document.getElementById("answer");
	const timer = document.getElementById("timer");
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
		});
	});

	function start() {
		let runTimer = 60;
		if (gameOver) {
			gameOver = false;
			let count = setInterval(() => {
				runTimer--;
				timer.textContent = `${runTimer}s`;
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
					timer.textContent = `60s`;
					clearInterval(count);
				}
			}, 1000);
		}
	}

	function textSelect() {
		if (gameOver == true) {
			texts.forEach((element, i) => {
				if (element.classList.contains("challenge-show")) {
					let spanChar = "";
					[...textsChallenge[i].textContent].forEach((char) => {
						spanChar += `<span>${char}</span>`;
					});
					textsChallenge[i].innerHTML = spanChar;
					textsChallenge[i].id = "current";
					console.log(textsChallenge[i]);
				}else{
					textsChallenge[i].textContent = textsChallenge[i].textContent; 
					textsChallenge[i].removeAttribute('id');
				}
			});
		}
	}

	input.addEventListener("input", () => {
		textSelect();
		start();
	});
})();