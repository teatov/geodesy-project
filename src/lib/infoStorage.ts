import {
	SignType,
	PresenceState,
	IntegrityState,
	OpennessState,
	ReadabilityState,
	ObservabilityState,
} from '@prisma/client';

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

export function getStateString(
	state: PresenceState | IntegrityState | OpennessState | ReadabilityState | ObservabilityState
): string {
	switch (state) {
		case PresenceState.PRESENT:
			return 'Присутствует';
		case PresenceState.MISSING:
			return 'Отсутствует';
		case IntegrityState.INTACT:
			return 'Сохранился';
		case IntegrityState.NOT_INTACT:
			return 'Не сохранился';
		case OpennessState.OPENED:
			return 'Вскрывался';
		case OpennessState.NOT_OPENED:
			return 'Не вскрывался';
		case ReadabilityState.READABLE:
			return 'Читается';
		case ReadabilityState.UNREADABLE:
			return 'Не читается';
		case ObservabilityState.OBSERVABLE:
			return 'Возможны';
		case ObservabilityState.CONDITIONALLY_OBSERVABLE:
			return 'Условно возможны';
		case ObservabilityState.UNOBSERVABLE:
			return 'Невозможны';

		default:
			return '-';
	}
}

export function getRecoveryRecommendations(
	state: PresenceState | IntegrityState | OpennessState | ReadabilityState
): string {
	const recoveryRequired = 'Необходимо восстановить';
	const recoveryNotRequired = 'Нет необходимости';

	if (
		state === PresenceState.MISSING ||
		state === IntegrityState.NOT_INTACT ||
		state === OpennessState.OPENED ||
		state === ReadabilityState.UNREADABLE
	) {
		return recoveryRequired;
	}

	if (
		state === PresenceState.PRESENT ||
		state === IntegrityState.INTACT ||
		state === OpennessState.NOT_OPENED ||
		state === ReadabilityState.READABLE
	) {
		return recoveryNotRequired;
	}

	return '-';
}

export function getSignTypeString(state: SignType): string {
	switch (state) {
		case SignType.SIGNAL_SIMPLE:
			return 'Сигнал простой';
		case SignType.SIGNAL_COMPLEX:
			return 'Сигнал сложный';
		case SignType.PYRAMID_WOOD_THREE_SIDED:
			return 'Пирамида деревянная трёхгранная';
		case SignType.PYRAMID_WOOD_FOUR_SIDED:
			return 'Пирамида деревянная четырёхгранная';
		case SignType.PYRAMID_METAL_THREE_SIDED:
			return 'Пирамида металлическая трёхгранная';
		case SignType.PYRAMID_METAL_FOUR_SIDED:
			return 'Пирамида металлическая четырёхгранная';
		case SignType.STAND_WOOD_THREE_SIDED:
			return 'Штатив деревянный трёхгранный';
		case SignType.STAND_WOOD_FOUR_SIDED:
			return 'Штатив деревянный четырёхгранный';
		case SignType.STAND_METAL_THREE_SIDED:
			return 'Штатив металлический трёхгранный';
		case SignType.STAND_METAL_FOUR_SIDED:
			return 'Штатив металлический четырёхгранный';
		case SignType.POST_CONCRETE:
			return 'Тур бетонный';
		case SignType.POST_ROCK:
			return 'Тур каменный';
		case SignType.POST_BRICK:
			return 'Тур кирпичный';

		default:
			return '-';
	}
}