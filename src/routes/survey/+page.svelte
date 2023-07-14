<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import RadioGroup from '$lib/components/RadioGroup.svelte';
	import Autocomplete from '$lib/components/Autocomplete.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { radioItems } from '$lib/infoStorage';
	import { modals } from '$lib/modalStorage';

	export let data: PageData;

	const { federalSubjects } = data;

	const { form, errors, enhance, capture, restore } = superForm(data.form, {
		resetForm: false,
	});

	export const snapshot = { capture, restore };

	let federalDistrictInputValue = '';

	let signMainTypeRadio: string,
		signalRadio: string,
		signMateialRadio: string,
		signSidesRadio: string,
		postRadio: string,
		signPresenceRadio: string,
		monolith1IntegrityRadio: string,
		monolith2OpennessRadio: string,
		monoliths3And4OpennessRadio: string,
		outerSignIntegrityRadio: string,
		orp1IntegrityRadio: string,
		orp2IntegrityRadio: string,
		trenchReadabilityRadio: string,
		satelliteObservabilityRadio: string;
</script>

<svelte:head>
	<title>Заполнение карточки обследования</title>
	<meta name="description" content="Заполнение карточки обследования геодезического пункта" />
</svelte:head>

<div class="container mx-auto mt-0 space-y-10 px-4 py-10 md:max-w-5xl">
	<div>
		<form action="?/createRecord" method="POST" use:enhance>
			<h3 class="my-5 text-center">Карточка обследования пункта ГГС</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<TextInput
					type="text"
					name="workBy"
					label="Кем выполнены работы по обследованию"
					value={$form.workBy}
					errors={$errors.workBy}
					required
				/>
				<TextInput
					type="date"
					name="surveyDate"
					label="Дата производства работ"
					value={$form.surveyDate
						? [
								$form.surveyDate.getFullYear(),
								String($form.surveyDate.getMonth() + 1).padStart(2, '0'),
								String($form.surveyDate.getDate()).padStart(2, '0'),
						  ].join('-')
						: ''}
					errors={$errors.surveyDate}
					required
				/>
				<hr class="md:col-span-2" />
				<Autocomplete
					name="federalSubject"
					bind:value={federalDistrictInputValue}
					options={federalSubjects}
					label="Субъект Российской Федерации"
					class="md:col-span-2"
					errors={$errors.federalSubject}
					required
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
					label="Название пункта, класс, № марки"
					value={$form.markerName}
					errors={$errors.markerName}
					required
				/>
				<TextInput
					type="number"
					name="placingYear"
					label="Год закладки"
					value={$form.placingYear || undefined}
					errors={$errors.placingYear}
				/>
				<TextInput
					type="number"
					name="signHeight"
					label="Высота знака (в метрах)"
					value={$form.signHeight || undefined}
					errors={$errors.signHeight}
					required
					step="any"
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
					type="number"
					name="altitude"
					label="Высота над уровнем моря (в метрах)"
					value={$form.altitude || undefined}
					errors={$errors.altitude}
					step="any"
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
					label="Координаты"
					value={$form.coordinates}
					errors={$errors.coordinates}
					modal={modals.coordinates}
					required
				/>
				<hr class="md:col-span-2" />
				<RadioGroup
					name="signMainType"
					label="Тип знака"
					items={radioItems.signMainType}
					bind:value={signMainTypeRadio}
					errors={$errors.signMainType}
					class="md:col-span-2"
					modal={modals.signType}
					required
				/>
				{#if signMainTypeRadio === 'SIGNAL'}
					<RadioGroup
						name="signalType"
						label="Тип сигнала"
						items={radioItems.signal}
						bind:value={signalRadio}
						errors={$errors.signalType}
						class="md:col-span-2"
						required
					/>
				{/if}
				{#if ['PYRAMID', 'STAND'].includes(signMainTypeRadio)}
					<RadioGroup
						name="signMaterial"
						label={`Материал ${signMainTypeRadio === 'PYRAMID' ? 'пирамиды' : 'штатива'}`}
						items={radioItems.signMateial}
						bind:value={signMateialRadio}
						errors={$errors.signMaterial}
						required
					/>
					<RadioGroup
						name="signSides"
						label={`Форма ${signMainTypeRadio === 'PYRAMID' ? 'пирамиды' : 'штатива'}`}
						items={radioItems.signSides}
						bind:value={signSidesRadio}
						errors={$errors.signSides}
						required
					/>
				{/if}
				{#if signMainTypeRadio == 'POST'}
					<RadioGroup
						name="postType"
						label="Материал тура"
						items={radioItems.post}
						bind:value={postRadio}
						errors={$errors.postType}
						class="md:col-span-2"
						required
					/>
				{/if}
				<hr class="md:col-span-2" />
				<RadioGroup
					name="signPresence"
					label="Опознавательный столб (знак)"
					items={radioItems.presence}
					bind:value={signPresenceRadio}
					errors={$errors.signPresence}
					required
				/>

				<RadioGroup
					name="monolith1Integrity"
					label="Монолит I"
					items={radioItems.integrity}
					bind:value={monolith1IntegrityRadio}
					errors={$errors.monolith1Integrity}
					required
				/>
				<RadioGroup
					name="monolith2Openness"
					label="Монолит II"
					items={radioItems.openness}
					bind:value={monolith2OpennessRadio}
					errors={$errors.monolith2Openness}
					required
				/>
				<RadioGroup
					name="monoliths3And4Openness"
					label="Монолиты III и IV"
					items={radioItems.openness}
					bind:value={monoliths3And4OpennessRadio}
					errors={$errors.monoliths3And4Openness}
					required
				/>
				<RadioGroup
					name="outerSignIntegrity"
					label="Наружный знак"
					items={radioItems.integrity}
					bind:value={outerSignIntegrityRadio}
					errors={$errors.outerSignIntegrity}
					required
				/>

				<RadioGroup
					name="orp1Integrity"
					label="ОРП I"
					items={radioItems.integrity}
					bind:value={orp1IntegrityRadio}
					errors={$errors.orp1Integrity}
					required
				/>
				<RadioGroup
					name="orp2Integrity"
					label="ОРП II"
					items={radioItems.integrity}
					bind:value={orp2IntegrityRadio}
					errors={$errors.orp2Integrity}
					required
				/>
				<RadioGroup
					name="trenchReadability"
					label="Окопка"
					items={radioItems.readability}
					bind:value={trenchReadabilityRadio}
					errors={$errors.trenchReadability}
					required
				/>
				<hr class="md:col-span-2" />
				<TextInput
					type="number"
					name="upperMarkBelowGroundHeight"
					label="Высота верхней марки (в метрах)"
					value={$form.upperMarkBelowGroundHeight || undefined}
					errors={$errors.upperMarkBelowGroundHeight}
					required
					step="any"
				/>
				<RadioGroup
					name="satelliteObservability"
					label="Спутниковые наблюдения на пункте"
					items={radioItems.satelliteObservability}
					bind:value={satelliteObservabilityRadio}
					errors={$errors.satelliteObservability}
					required
				/>
				<hr class="md:col-span-2" />
				<TextInput
					type="file"
					name="exteriorPhoto"
					label="Фотография внешнего оформления (в перспективе)"
					value=""
					errors={$errors.exteriorPhoto}
					accept="image/*"
				/>
				<TextInput
					type="file"
					name="centerMarkPhoto"
					label="Фотография марки центра вблизи"
					value=""
					errors={$errors.centerMarkPhoto}
					accept="image/*"
					modal={modals.centerMarkPhoto}
				/>
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
						label="Составил(а)"
						value={$form.createdBy}
						errors={$errors.createdBy}
						required
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
</div>
