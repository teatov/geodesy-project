<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import RadioGroup from '$lib/components/RadioGroup.svelte';
	import Autocomplete from '$lib/components/Autocomplete.svelte';
	import type { PageData } from './$types';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { radioItems } from '$lib/infoStorage';
	import { modals } from '$lib/modalStorage';
	import schemaImage from '$lib/images/Fig.jpg';
	import schemaImage1 from '$lib/images/punkt_draw.jpg';

	export let data: PageData;

	const { federalSubjects } = data;

	$: ({ surveys } = data);

	const { form, errors, enhance, capture, restore } = superForm(data.form, {
		resetForm: false,
	});

	export const snapshot = { capture, restore };

	export let parent: any;

	let federalDistrictInputValue = '';

	// let surveyorRoleRadio: string,
	// 	signMainTypeRadio: string,
	// 	signalRadio: string,
	// 	signMateialRadio: string,
	// 	signSidesRadio: string,
	// 	postRadio: string,
	// 	signPresenceRadio: string,
	// 	monolith1IntegrityRadio: string,
	// 	monolith2OpennessRadio: string,
	// 	monoliths3And4OpennessRadio: string,
	// 	outerSignIntegrityRadio: string,
	// 	orp1IntegrityRadio: string,
	// 	orp2IntegrityRadio: string,
	// 	trenchReadabilityRadio: string,
	// 	satelliteObservabilityRadio: string;
</script>

<svelte:head>
	<title>Заполнение карточки обследования</title>
	<meta name="description" content="Заполнение карточки обследования геодезического пункта" />
</svelte:head>

{#if data.user}
	<div>
		<form action="?/createRecord" method="POST" use:enhance>
			<h3 class="my-5 text-center">Карточка обследования пункта ГГС</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<TextInput
					type="text"
					name="workBy"
					label="Кем выполнены работы по обследованию *"
					value={$form.workBy}
					errors={$errors.workBy}
				/>
				<TextInput
					type="date"
					name="surveyDate"
					label="Дата производства работ *"
					value={$form.surveyDate ? $form.surveyDate.toISOString().split('T')[0] : ''}
					errors={$errors.surveyDate}
				/>
				<hr class="md:col-span-2" />
				<Autocomplete
					name="federalSubject"
					bind:value={federalDistrictInputValue}
					options={federalSubjects}
					label="Субъект Российской Федерации *"
					class="md:col-span-2"
				/>
				<TextInput
					type="text"
					name="markerIndex"
					label="№ по каталогу/индекс пункта"
					value={$form.markerIndex}
					errors={$errors.markerIndex}
				/>
				<TextInput
					type="text"
					name="markerName"
					label="Название пункта, класс, № марки *"
					value={$form.markerName}
					errors={$errors.markerName}
				/>
				<TextInput
					type="text"
					name="placingYear"
					label="Год закладки"
					value={String($form.placingYear)}
					errors={$errors.placingYear}
				/>
				<TextInput
					type="text"
					name="signHeight"
					label="Высота знака (в метрах) *"
					value={String($form.signHeight)}
					errors={$errors.signHeight}
				/>
				<hr class="md:col-span-2" />
				<TextInput
					type="text"
					name="centerType"
					label="Тип центра"
					value={$form.centerType}
					errors={$errors.centerType}
				/>
				<TextInput
					type="text"
					name="altitude"
					label="Высота над уровнем моря (в метрах)"
					value={String($form.altitude)}
					errors={$errors.altitude}
				/>
				<TextInput
					type="text"
					name="trapezes"
					label="Трапеции"
					value={$form.trapezes}
					errors={$errors.trapezes}
				/>
				<TextInput
					type="text"
					name="coordinates"
					label="Координаты *"
					value={$form.coordinates}
					errors={$errors.coordinates}
					modal={modals.coordinates}
				/>
				<hr class="md:col-span-2" />
				<RadioGroup
					name="signMainType"
					label="Тип знака *"
					items={radioItems.signMainType}
					bind:value={$form.signMainType}
					errors={$errors.signMainType}
					class="md:col-span-2"
					modal={modals.signType}
				/>
				{#if $form.signMainType === 'SIGNAL'}
					<RadioGroup
						name="signalType"
						label="Тип сигнала *"
						items={radioItems.signal}
						bind:value={$form.signalType}
						errors={$errors.signalType}
						class="md:col-span-2"
					/>
				{/if}
				{#if ['PYRAMID', 'STAND'].includes($form.signMainType)}
					<RadioGroup
						name="signMaterial"
						label={`Материал ${$form.signMainType === 'PYRAMID' ? 'пирамиды' : 'штатива'} *`}
						items={radioItems.signMateial}
						bind:value={$form.signMaterial}
						errors={$errors.signMaterial}
					/>
					<RadioGroup
						name="signSides"
						label={`Форма ${$form.signMainType === 'PYRAMID' ? 'пирамиды' : 'штатива'} *`}
						items={radioItems.signSides}
						bind:value={$form.signSides}
						errors={$errors.signSides}
					/>
				{/if}
				{#if $form.signMainType == 'POST'}
					<RadioGroup
						name="postType"
						label="Материал тура *"
						items={radioItems.post}
						bind:value={$form.postType}
						errors={$errors.postType}
						class="md:col-span-2"
					/>
				{/if}
				<hr class="md:col-span-2" />
				<RadioGroup
					name="signPresence"
					label="Опознавательный столб (знак) *"
					items={radioItems.presence}
					bind:value={$form.signPresence}
					errors={$errors.signPresence}
				/>

				<RadioGroup
					name="monolith1Integrity"
					label="Монолит I *"
					items={radioItems.integrity}
					bind:value={$form.monolith1Integrity}
					errors={$errors.monolith1Integrity}
				/>
				<RadioGroup
					name="monolith2Openness"
					label="Монолит II *"
					items={radioItems.openness}
					bind:value={$form.monolith2Openness}
					errors={$errors.monolith2Openness}
				/>
				<RadioGroup
					name="monoliths3And4Openness"
					label="Монолиты III и IV *"
					items={radioItems.openness}
					bind:value={$form.monoliths3And4Openness}
					errors={$errors.monoliths3And4Openness}
				/>
				<RadioGroup
					name="outerSignIntegrity"
					label="Наружный знак *"
					items={radioItems.integrity}
					bind:value={$form.outerSignIntegrity}
					errors={$errors.outerSignIntegrity}
				/>

				<RadioGroup
					name="orp1Integrity"
					label="ОРП I *"
					items={radioItems.integrity}
					bind:value={$form.orp1Integrity}
					errors={$errors.orp1Integrity}
				/>
				<RadioGroup
					name="orp2Integrity"
					label="ОРП II *"
					items={radioItems.integrity}
					bind:value={$form.orp2Integrity}
					errors={$errors.orp2Integrity}
				/>
				<RadioGroup
					name="trenchReadability"
					label="Окопка *"
					items={radioItems.readability}
					bind:value={$form.trenchReadability}
					errors={$errors.trenchReadability}
				/>
				<hr class="md:col-span-2" />
				<TextInput
					type="text"
					name="upperMarkAboveGroundHeight"
					label="Высота верхней марки (в метрах) *"
					value={String($form.upperMarkAboveGroundHeight)}
					errors={$errors.upperMarkAboveGroundHeight}
				/>
				<RadioGroup
					name="satelliteObservability"
					label="Спутниковые наблюдения на пункте *"
					items={radioItems.satelliteObservability}
					bind:value={$form.satelliteObservability}
					errors={$errors.satelliteObservability}
				/>
				<hr class="md:col-span-2" />
				<TextInput
					type="file"
					name="exteriorPhoto"
					label="Фотография внешнего оформления (в перспективе) *"
					value={$form.exteriorPhoto}
					errors={$errors.exteriorPhoto}
					accept="image/*"
				/>
				<TextInput
					type="file"
					name="centerMarkPhoto"
					label="Фотография марки центра вблизи *"
					value={$form.centerMarkPhoto}
					errors={$errors.centerMarkPhoto}
					accept="image/*"
					modal={modals.centerMarkPhoto}
				/>
				<div class="md:col-span-2">
					<TextInput
						type="file"
						name="extraPhotos"
						label="Дополнительные фотографии"
						value={$form.extraPhotos}
						errors={$errors.extraPhotos}
						accept="image/*"
						multiple
					/>
				</div>
				<hr class="md:col-span-2" />
				<div class="md:col-span-2">
					<TextArea
						type="text"
						name="extraNotes"
						label="Примечания"
						value={$form.extraNotes}
						errors={$errors.extraNotes}
					/>
				</div>

				<div class="md:col-span-2">
					<TextInput
						type="text"
						name="createdBy"
						label="Составил(а) *"
						value={String($form.createdBy)}
						errors={$errors.createdBy}
					/>
				</div>
			</div>
			<hr class="md:col-span-2" />
			{#if $errors._errors}
				<small class="text-error-500">{$errors._errors}</small>
			{/if}

			<div class="my-12 flex justify-center">
				<button class="btn variant-filled-primary" type="submit">Создать</button>
			</div>
			<hr />
		</form>
	</div>
{/if}

{#each surveys as survey}
	<article>
		<strong>{survey.markerName}</strong>
		<p>
			{survey.latitude}
			{survey.longitude}
		</p>
		<p>
			{survey.createdBy}
		</p>
		<!-- {#if record.authUserId === data.user?.userId}
			<a href="/{record.id}" role="button">Редактировать</a>
		{/if} -->
		<form action="/{survey.id}/?/createDocx" method="POST">
			<button class="btn variant-filled-secondary" type="submit">Скачать .docx</button>
		</form>
		<hr />
	</article>
{/each}
