export default class BarChart {
	constructor(personInfo) {
		this.parent = document.querySelector('.chart-wrapper');
		this.personInfo = personInfo;
		this.scoreValue = [...document.querySelectorAll('.bar-chart__legend-label')];
	}

	init() {
		console.log('init graf');
		this.parent.style.display = 'flex';

		this.setInfo();
		this.setScore();
	}

	setInfo() {
		this.parent.querySelector('.person__name').textContent = this.personInfo.personName;
		this.parent.querySelector('.person__surname').textContent = this.personInfo.personSurname;
	}

	setScore() {
		const chartBars = [...this.parent.querySelectorAll('[data-bar-chart]')];
		let totalScore = 0;

		chartBars.forEach((element, i) => {
			const id = element.getAttribute('data-bar-chart');
			// К какому блоку вопросов относится колонка
			const questionsBlock = document.querySelector(`[data-quiz-list="${id}"]`);

			const barTitle = element.querySelector('.bar-chart__column-label');
			barTitle.textContent = questionsBlock.querySelector('.quiz__title').textContent;

			const barRsult = element.querySelector('.bar-chart__column-result');
			barRsult.textContent = this.convertScore(this.personInfo[`category${i + 1}`], this.personInfo[`categoryCount${i + 1}`]);

			totalScore += this.convertScore(this.personInfo[`category${i + 1}`], this.personInfo[`categoryCount${i + 1}`]);

			element.style.height = `${this.convertScore(this.personInfo[`category${i + 1}`], this.personInfo[`categoryCount${i + 1}`], true)}%`;

			setTimeout(() => {
				element.classList.remove('bar-chart__column--hidden');
			}, 200);
		});

		this.parent.querySelector('.result__score-total').textContent = Math.round(totalScore / 3);
		this.parent.querySelector('.result__level').textContent = this.levelResult(Math.round(totalScore / 3));

		setTimeout(() => {
			this.parent.querySelector('.result').classList.remove('result--hidden');
		}, 600);
	}

	convertScore(score, qCounter, toPercent) {
		let convertedScore = 0;
		const maxDefInCategory = qCounter * 5;
		const maxDefInNewSystem = (this.scoreValue.length - 1) * 100;

		if (!toPercent) {
			convertedScore = Math.round(score * maxDefInNewSystem / maxDefInCategory);
		} else {
			convertedScore = Math.round(score * 100 / maxDefInCategory);
			// console.log(`=============`);
			// console.log(`Всего вопросов: ${qCounter}`);
			// console.log(`Набрал: ${score}`);
			// console.log(`Максимум: ${maxDefInCategory}`);
			// console.log(`Набрал в процентах: ${convertedScore}`);
		}

		return convertedScore;
	}

	levelResult(totalScore) {
		let totlaScoreLevel = totalScore * (this.scoreValue.length - 1) / 500;
		totlaScoreLevel = Math.floor(totlaScoreLevel);

		const levelResult = this.scoreValue[totlaScoreLevel].getAttribute('data-level');

		return levelResult;
	}
}
