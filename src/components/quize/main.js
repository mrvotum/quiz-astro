export default class QuizForm {
	constructor(parent) {
		this.parent = parent;
		this.form = this.parent.querySelector(".quiz__form");
		this.btnStart = this.parent.querySelector('[data-btn="quiz-start"]');
		this.inputs = [...this.parent.querySelectorAll('inputt[ype="text"]')];
		this.quizList = this.parent.querySelector(".quiz__list");
		this.answer = [...this.parent.querySelectorAll(".answer")];
		this.questionCount = 1;
	}

	init() {
		console.log("Started");
		this.addListeners();
	}

	addListeners() {
		this.btnStart.addEventListener("click", () => {
			console.log("start quiz");

			this.inputs.forEach((element) => {
				console.log(
					`input: ${element.getAttribute("data-input")}=${
						element.value
					}`
				);
			});

			this.form.style.display = "none";
			this.parent.classList.remove("quiz--disabled");
			this.quizList.classList.remove("quiz__list--hidden");
		});

		// this.inputs.forEach(element => {
		//   element.addEventListener('blur', (e) => {
		//     // Тут нужно воткнуть проверку на пустые символы и всё такое
		//     console.log(`input: ${element.getAttribute('data-input')}=${e.target.value}`);
		//   });
		// });

		// const div = document.getElementById('div');
		// const listener = function (event) {
		//   /* do something here */
		// };
		// div.addEventListener('click', listener, false);
		// div.removeEventListener('click', listener, false);

		this.parent.addEventListener("click", (e) => {
			if (
				e.target.type === "radio" &&
				Number(e.target.name.split("-")[1]) === this.questionCount
			) {
				this.questionCount++;
				const nextQuestion = this.parent.querySelector(
					`[data-question="question-${this.questionCount}"]`
				);

				if (nextQuestion) {
					nextQuestion.classList.remove("quiz__question--hidden");
				}
			}
		});
	}
}
