export const radioItems = {
	signMainType: [
		{
			value: 'SIGNAL',
			label: 'Сигнал',
		},
		{
			value: 'PYRAMID',
			label: 'Пирамида',
		},
		{
			value: 'STAND',
			label: 'Штатив',
		},
		{
			value: 'POST',
			label: 'Тур',
		},
	],

	signal: [
		{
			value: 'SIGNAL_SIMPLE',
			label: 'Простой сигнал (высота от 6м. до 15м.)',
		},
		{
			value: 'SIGNAL_COMPLEX',
			label: 'Сложный сигнал (от 16м. до 55м.)',
		},
	],

	signMateial: [
		{
			value: 'WOOD',
			label: 'Деревянный',
		},
		{
			value: 'METAL',
			label: 'Металлический',
		},
	],

	signSides: [
		{
			value: 'THREE_SIDED',
			label: 'Трехгранная',
		},
		{
			value: 'FOUR_SIDED',
			label: 'Четырехгранная',
		},
	],

	post: [
		{
			value: 'POST_CONCRETE',
			label: 'Бетонный',
		},
		{
			value: 'POST_ROCK',
			label: 'Каменный',
		},
		{
			value: 'POST_BRICK',
			label: 'Кирпичный',
		},
	],

	presence: [
		{
			value: 'PRESENT',
			label: 'устанавливался',
		},
		{
			value: 'MISSING',
			label: 'не устанавливался',
		},
	],

	integrity: [
		{
			value: 'INTACT',
			label: 'Сохранился',
		},
		{
			value: 'NOT_INTACT',
			label: 'Не сохранился',
		},
	],

	openness: [
		{
			value: 'OPENED',
			label: 'Вскрывался',
		},
		{
			value: 'NOT_OPENED',
			label: 'Не вскрывался',
		},
	],

	readability: [
		{
			value: 'READABLE',
			label: 'Читается',
		},
		{
			value: 'UNREADABLE',
			label: 'Не читается',
		},
	],

	satelliteObservability: [
		{
			value: 'OBSERVABLE',
			label: 'Возможны',
		},
		{
			value: 'CONDITIONALLY_OBSERVABLE',
			label: 'Условно возможны',
		},
		{
			value: 'UNOBSERVABLE',
			label: 'Невозможны',
		},
	],
};
