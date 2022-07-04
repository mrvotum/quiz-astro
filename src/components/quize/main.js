import BarChart from '../barChart/main.js';

export default class QuizForm {
	constructor(parent) {
		this.parent = parent;
		this.form = this.parent.querySelector(".quiz__form");
		this.btnStart = this.parent.querySelector('[data-btn="quiz-start"]');
		this.inputs = [...this.parent.querySelectorAll('input[type="text"]')];
		this.quizList = this.parent.querySelector(".quiz__list");
		this.answer = [...this.parent.querySelectorAll(".answer")];
		this.questionCount = 1;
		this.personInfo = {
			personName: "",
			personSurname: "",
			maxScore: 0,
		};
		this.questionsBlocksCount = 1;
	}

	init() {
		console.log("Started");
		this.addAnswersBtns();
		this.addListeners();
	}

	addListeners() {
		const btnRandom = this.parent.querySelector('[data-btn="quiz-random"]');
		if (btnRandom) {
			// Показать рандомные числа для быстрого перехода
			btnRandom.addEventListener("click", () => {
				this.personInfo = {
					personName: "Alexander",
					personSurname: "Ivanov",
					maxScore: 250,
					category1: 24,
					categoryCount1: 7,
					category2: 28,
					categoryCount2: 10,
					category3: 15,
					categoryCount3: 7,
				};

				this.showResults();
			});
		}

		this.btnStart.addEventListener("click", () => {
			console.log("start quiz");

			this.inputs.forEach((element) => {
				this.personInfo[element.getAttribute('id')] = element.value;
			});

			this.form.style.display = "none";
			this.parent.classList.remove("quiz--disabled");
			this.quizList.classList.remove("quiz__list--hidden");
		});

		// this.inputs.forEach((element) => {
		// 	element.addEventListener("blur", (e) => {
		// 		// Тут нужно воткнуть проверку на пустые символы и всё такое
		// 		// console.log(`input: ${element.getAttribute('id')}=${e.target.value}`);
		// 		console.log(`input: ${element.getAttribute("id")}=${e.target.value}`);

		// 		console.log(this.personInfo[element.getAttribute("id")]);
		// 	});
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
				Number(e.target.name.split("-")[2]) === this.questionCount
			) {
				this.questionCount++;
				const nextQuestionsBlock = Number(e.target.name.split("-")[1]);
				const nextQuestion = this.parent.querySelector(
					`[data-question="question-${this.questionCount}"][data-questions-block="${nextQuestionsBlock}"]`
				);

				if (nextQuestion) {
					nextQuestion.classList.remove("quiz__question--hidden");
				}
			}
		});
	}

	addAnswersBtns() {
		this.questions = [
			...this.parent.querySelectorAll("[data-questions-block]"),
		];

		this.questions.forEach((question) => {
			const blockId = question.getAttribute("data-questions-block");
			const answersBlock = question.querySelector(".answers");

			if (question.classList.contains("last-question-in-block")) {
				const btnEl = document.createElement("button");
				btnEl.classList.add("btn");
				btnEl.setAttribute("type", "submit");
				btnEl.textContent = "Next";

				answersBlock.appendChild(btnEl);

				this.nextStep(btnEl, blockId);
			} else {
				const id = question.getAttribute("data-question").split("-")[1];

				for (let i = 1; i < 6; i++) {
					answersBlock.innerHTML += `
						<input type="radio" name="question-${blockId}-${id}" id="question-${blockId}-${id}-${i}" value="${i}" data-questions-block="${blockId}">
						<label class="answer" for="question-${blockId}-${id}-${i}">${i}</label>
					`;
				}
			}
		});
	}

	nextStep(btnEl, blockId) {
		blockId = Number(blockId);

		btnEl.addEventListener("click", () => {
			const nextBlock = this.parent.querySelector(
				`[data-quiz-list="${blockId + 1}"]`
			);

			if (nextBlock) {
				nextBlock.className = "quiz__question";
				this.questionCount = 1;
				this.questionsBlocksCount += 1;
			} else {
				this.calculateScore();
				this.showResults();
			}
		});
	}

	calculateScore() {
		const radioBtns = [...this.parent.querySelectorAll('input[type="radio"]:checked')];
		let maxScore = 0;

		if (radioBtns) {
			for (let i = 0; i < this.questionsBlocksCount; i++) {
				const element = [...this.parent.querySelectorAll(`input[type="radio"][data-questions-block="${i + 1}"]:checked`)];
				let categoryScore = 0;

				element.forEach(el => {
					categoryScore = categoryScore + Number(el.value);
				});

				this.personInfo[`category${i + 1}`] = categoryScore;
				this.personInfo[`categoryCount${i + 1}`] = element.length;
			}

			radioBtns.forEach(element => {
				maxScore = maxScore + Number(element.value);
			});

			this.personInfo.maxScore = radioBtns.length * 5;
		} else {
			console.error('Не получилось найти отмеченные вопросы');
			return;
		}

		// if (radioBtns) {
		// 	radioBtns.forEach(element => {
		// 		score = score + Number(element.value);
		// 	});

		// 	this.personInfo.maxScore = radioBtns.length * 5;
		// 	this.personInfo.score = score;
		// } else {
		// 	console.error('Не получилось найти отмеченные вопросы');
		// 	return;
		// }
	}

	showResults() {
		console.log(this.personInfo);
		this.parent.style.display = "none";

		// Инициализация класса
		const barChart = new BarChart(this.personInfo);
		barChart.init();
	}
}
