export default class InputsWithPlaceholder {
	constructor(parent) {
		// this.parent = parent;
		// this.inputs = [...this.parent.querySelectorAll('input[type="text"][data-text]')];
		this.inputs = [...document.querySelectorAll('input[type="text"][data-text]')];
	}

	init() {
		if (this.inputs.length) {
			this.inputs.forEach((element) => {
				// Создать обёртку для input
				const inputWrapperEl = document.createElement("div");
				inputWrapperEl.classList.add("input-wrapped");
				element.parentNode.insertBefore(inputWrapperEl, element);
				inputWrapperEl.appendChild(element);

				// Создать для input label (placeholder) с текстом из [data-text]
				const placeholderText = element.getAttribute("data-text");
				const labelEl = document.createElement("label");
				labelEl.textContent = placeholderText;
				labelEl.classList.add("label-placeholder");
				labelEl.setAttribute("for", element.id);

				element.parentElement.insertBefore(labelEl, element);

				element.addEventListener("focus", () => {
					labelEl.classList.add("is-active");
				});

				element.addEventListener("blur", () => {
					if (!element.value.length) {
						labelEl.classList.remove("is-active");
					}
				});
			});
		}
	}
}
