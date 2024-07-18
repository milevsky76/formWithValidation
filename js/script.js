$(function () {
	$("#phone").mask("+375 (99) 999-99-99");

	$('#form input[type="text"]').on('invalid', function (evt) {
		if (this.validity.valueMissing) {
			this.setCustomValidity('Обязательное поле для заполнения.');
		}
	});

	$('#form input[type="email"]').on('invalid', function (evt) {
		if (this.validity.valueMissing) {
			this.setCustomValidity('Обязательное поле для заполнения.');
		} else if (this.validity.typeMismatch || this.validity.patternMismatch) {
			this.setCustomValidity('Введите данные в указанном формате.');
		}
	});

	$('#form input[type="tel"]').on('invalid', function (evt) {
		if (this.validity.valueMissing) {
			this.setCustomValidity('Обязательное поле для заполнения.');
		} else {
			this.setCustomValidity('');
		}
	});

	$('#form input[type="number"]').on('invalid', function (evt) {
		if (this.validity.valueMissing) {
			this.setCustomValidity('Обязательное поле для заполнения.');
		}
	});

	$('#form input[type="text"], #form input[type="email"], #form input[type="tel"], #form input[type="number"]').on('input', function (evt) {
		this.setCustomValidity('');
	});

	$('#form select').on('invalid', function (evt) {
		if (this.validity.valueMissing) {
			this.setCustomValidity('Обязательное поле для заполнения.');
		}
	});

	$('#form input[type="checkbox"]').on('invalid', function (evt) {
		if (this.validity.valueMissing) {
			this.setCustomValidity('Чтобы продолжить, установите этот флажок.');
		}
	});

	$('#form select, #form input[type="checkbox"]').on('change', function (evt) {
		this.setCustomValidity('');
	});

	$('#form').on('submit', function (evt) {
		evt.preventDefault();

		const $form = $(this);
		const $formData = $(this).serializeArray();
		const $messageSuccess = $('.success-message');
		const $messageError = $('.error-message');

		$.ajax({
			url: getRandomResponseStatus(),
			type: 'post',
			dataType: 'html',
			data: JSON.stringify($formData),
			success: function (response) {
				$form.hide();
				$messageSuccess.show();
				$messageError.hide();
				$form[0].reset();
			},
			error: function (xhr, status, error) {
				$form.hide();
				$messageSuccess.hide();
				$messageError.show();
				$form[0].reset();
			}
		});
	});
});

function getRandomResponseStatus() {
	const statuses = {
		200: "https://run.mocky.io/v3/c33554ac-999f-4260-9977-d88769381c4f",
		400: "https://run.mocky.io/v3/2079912e-35c8-471a-accd-5d0a65064ac2"
	};

	return statuses[200];
	// return Math.random() < 0.5 ? statuses[200] : statuses[400];
}