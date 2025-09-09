(function () {
	const levels = Array.from(document.querySelectorAll(".item-list"));
	const texts = Array.from(document.querySelectorAll(".challenge"));
	const input = document.getElementById("answer");
	const timer = document.getElementById("timer");
	let gameOver = true;

	levels.forEach((level, i) => {
		level.addEventListener("click", () => {
			texts.forEach((text, j) => {
				if (i == j) {
					text.classList.add("challenge-show");
				} else {
					text.classList.remove("challenge-show");
				}
			});
		});
	});

	function start() {
		let runTimer = 60;
		if (gameOver) {
			gameOver = false;
			let count = setInterval(() => {
                console.log(gameOver);
				runTimer--;
				timer.textContent = `${runTimer}s`;
				if (runTimer <= 0) {
					clearInterval(count);
					alert("Fim do tempo!");
					gameOver = true;
				}
			}, 1000);
		}
	}

	input.addEventListener("input", () => {
		start();
	});
})();
