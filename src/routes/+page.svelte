<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { FileButton } from '@skeletonlabs/skeleton';
	import schemaImage from '$lib/images/Fig.jpg';
	import schemaImage1 from '$lib/images/punkt_draw.jpg';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const { form, errors, enhance, capture, restore } = superForm(data.form, {
		resetForm: false,
	});
	$: ({ records } = data);

	export const snapshot = { capture, restore };

	export let parent: any;

	let surveyorRole: string;
	let signMainTypeRadio: number,
		signalRadio: number,
		pyramidMaterialRadio: number,
		pyramidSidesRadio: number,
		standMaterialRadio: number,
		standSidesRadio: number,
		postRadio: number,
		signPresenceRadio: number,
		monolith1IntegrityRadio: number,
		monolith2OpennessRadio: number,
		monoliths3And4OpennessRadio: number,
		outerSignIntegrityRadio: number,
		orp1IntegrityRadio: number,
		orp2IntegrityRadio: number,
		trenchReadabilityRadio: number,
		satelliteObservabilityRadio: number;
	const alert: ModalSettings = {
		type: 'alert',
		// Data
		title: 'Example Alert',
		body: 'This is an example modal.',
		image: schemaImage,
	};
</script>

{#if data.user}
	<div class="grid w-3/4 justify-items-center font-serif text-sm">
		<form action="?/createRecord" method="POST" use:enhance>
			<h3 class="my-5 text-center">Карточка обследования пункта ГГС</h3>
			<div class="m-3">
				<TextInput
					type="text"
					name="workBy"
					label="ФИО заполняющего"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<!-- <div class="m-3">
				<TextInput
					type="int"
					name="number"
					label="Номер телефона"
					value={$form.title}
					errors={$errors.title}
				/>
			</div> -->
			<div class="m-3">
				<TextInput
					type="text"
					name="email"
					label="Электронная почта"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<TextInput
					type="date"
					name="surveyDate"
					label="Дата производства работ"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<TextInput
					type="text"
					name="federalSubject"
					label="Субъект Российской Федерации"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<p>Кем выполнена работа</p>
				<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
					<RadioItem bind:group={surveyorRole} name="surveyorRole" value="volunteer">
						Волонтёр
					</RadioItem>
					<RadioItem bind:group={surveyorRole} name="surveyorRole" value="specialist">
						Специалист
					</RadioItem>
				</RadioGroup>
			</div>
			{#if surveyorRole == 'specialist'}
				<div class="m-3">
					<TextInput
						type="text"
						name="centerType"
						label="Тип центра"
						value={$form.title}
						errors={$errors.title}
					/>
				</div>
				<div class="m-3">
					<!-- <p>Трапеции</p> -->
					<!-- <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
						<RadioItem bind:group={trapecy} name="trapezes" value="1">1:50 000</RadioItem>
						<RadioItem bind:group={trapecy} name="trapezes" value="2">1:200 000</RadioItem>
					</RadioGroup> -->
					<TextInput
						type="text"
						name="trapezes"
						label="Трапеции"
						value={$form.title}
						errors={$errors.title}
					/>
				</div>
			{/if}
			<div class="m-3">
				<TextInput
					type="text"
					name="markerName"
					label="Название геодезического пункта (если известно)"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<TextInput
					type="text"
					name="markerIndex"
					label="Номер геодезического пункта (если известно)"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<Accordion autocollapse class="card p-4 text-token">
					<AccordionItem autocollapse>
						<svelte:fragment slot="lead"
							><i class="fa-solid fa-film w-6 text-center text-xl" /></svelte:fragment
						>
						<svelte:fragment slot="summary"><p>Тип знака (наружное оформление):</p></svelte:fragment
						>
						<svelte:fragment slot="content">
							<p>
								<strong>Сигнал </strong> (состоит из двух вложенных друг в друга конструкций — внешней
								и внутренней усеченных пирамид, или ферм, одна из которых несёт площадку для наблюдателя
								и визирную цель, а другая — столик для прибора.)
							</p>
							<p>
								<strong>Пирамида</strong> (обычно высота 5-8 м, может быть определена путем измерения
								с точностью до 0.1 м и проставлена в ячейку)
							</p>
							<p><strong>Штатив</strong> (имеет высоту инструментального столика 1.2м.)</p>
							<p><strong>Тур</strong> (аналог штатива, устанавливается на столбе)</p>
						</svelte:fragment>
					</AccordionItem>
					<div class="m-3">
						<RadioGroup
							class="signMainTypeRadio"
							active="variant-filled-primary"
							hover="hover:variant-soft-primary"
						>
							<RadioItem bind:group={signMainTypeRadio} name="signMainType" value={1}
								>Сигнал</RadioItem
							>
							<RadioItem bind:group={signMainTypeRadio} name="signMainType" value={2}
								>Пирамида</RadioItem
							>
							<RadioItem bind:group={signMainTypeRadio} name="signMainType" value={3}
								>Штатив</RadioItem
							>
							<RadioItem bind:group={signMainTypeRadio} name="signMainType" value={4}>Тур</RadioItem
							>
						</RadioGroup>
					</div>
					<div class="m-3">
						{#if signMainTypeRadio === 1}
							<RadioGroup
								class="form_signal"
								active="variant-filled-primary"
								hover="hover:variant-soft-primary"
							>
								<RadioItem bind:group={signalRadio} name="signType" value="1"
									><p><italic>Простой сигнал</italic> (высота от 6м. до 15м.)</p>
								</RadioItem>
								<RadioItem bind:group={signalRadio} name="signType" value="2"
									><italic>Сложный сигнал </italic>(от 16м. до 55м.)
								</RadioItem>
							</RadioGroup>
						{:else if signMainTypeRadio == 2}
							<RadioGroup
								class="form_piramida"
								active="variant-filled-primary"
								hover="hover:variant-soft-primary"
							>
								<RadioItem bind:group={pyramidMaterialRadio} name="signType" value="1"
									>Деревянная</RadioItem
								>
								<RadioItem bind:group={pyramidMaterialRadio} name="signType" value="2"
									>Металлическая</RadioItem
								>
							</RadioGroup>
							<RadioGroup
								class="form_piramida"
								active="variant-filled-primary"
								hover="hover:variant-soft-primary"
							>
								<RadioItem bind:group={pyramidSidesRadio} name="signType" value="1"
									>Трехгранная</RadioItem
								>
								<RadioItem bind:group={pyramidSidesRadio} name="signType" value="2"
									>Четырехгранная</RadioItem
								>
							</RadioGroup>
						{:else if signMainTypeRadio == 3}
							<RadioGroup
								class="form_shtativ"
								active="variant-filled-primary"
								hover="hover:variant-soft-primary"
							>
								<RadioItem bind:group={standMaterialRadio} name="signType" value="1"
									>Деревянный</RadioItem
								>
								<RadioItem bind:group={standMaterialRadio} name="signType" value="2"
									>Металлический</RadioItem
								>
							</RadioGroup>
							<RadioGroup
								class="form_shtativ"
								active="variant-filled-primary"
								hover="hover:variant-soft-primary"
							>
								<RadioItem bind:group={standSidesRadio} name="signType" value="1"
									>Трехгранный</RadioItem
								>
								<RadioItem bind:group={standSidesRadio} name="signType" value="2"
									>Четырехгранный</RadioItem
								>
							</RadioGroup>
						{:else if signMainTypeRadio == 4}
							<RadioGroup
								class="form_tur"
								active="variant-filled-primary"
								hover="hover:variant-soft-primary"
							>
								<RadioItem bind:group={postRadio} name="signType" value="1">Бетонный</RadioItem>
								<RadioItem bind:group={postRadio} name="signType" value="2">Каменный</RadioItem>
								<RadioItem bind:group={postRadio} name="signType" value="3">Кирпичный</RadioItem>
							</RadioGroup>
						{/if}
					</div>
				</Accordion>
			</div>
			<div class="m-3">
				<TextInput
					type="text"
					name="altitude"
					label="Высота над уровнем моря (может быть снята с карты или с показаний GPS приёмника) "
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<TextInput
					type="text"
					name="coordinates"
					label="Координаты"
					value={$form.title}
					errors={$errors.title}
				/>
			</div>
			<div class="m-3">
				<Accordion autocollapse class="card p-4 text-token">
					<AccordionItem autocollapse>
						<svelte:fragment slot="lead"
							><i class="fa-solid fa-film w-6 text-center text-xl" /></svelte:fragment
						>
						<svelte:fragment slot="summary"><p>Результаты обследования пункта:</p></svelte:fragment>
						<svelte:fragment slot="content"
							><img src={schemaImage} alt="" />
							<img src={schemaImage1} alt="" />
						</svelte:fragment>
					</AccordionItem>

					<p>Опознавательный столб (знак)</p>
					<RadioGroup
						class="signIsPlaced"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={signPresenceRadio} name="signPresence" value={1}
							>устанавливался</RadioItem
						>
						<RadioItem bind:group={signPresenceRadio} name="signPresence" value={2}
							>не устанавливался</RadioItem
						>
					</RadioGroup>

					<p>Монолит I</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={monolith1IntegrityRadio} name="monolith1Integrity" value={1}
							>Сохранился</RadioItem
						>
						<RadioItem bind:group={monolith1IntegrityRadio} name="monolith1Integrity" value={2}
							>Не сохранился</RadioItem
						>
					</RadioGroup>

					<p>Монолит II</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={monolith2OpennessRadio} name="monolith2Openness" value={1}
							>Вскрывался</RadioItem
						>
						<RadioItem bind:group={monolith2OpennessRadio} name="monolith2Openness" value={2}
							>Не вскрывался</RadioItem
						>
					</RadioGroup>

					<p>Монолиты III и IV</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem
							bind:group={monoliths3And4OpennessRadio}
							name="monoliths3And4Openness"
							value={1}>Вскрывался</RadioItem
						>
						<RadioItem
							bind:group={monoliths3And4OpennessRadio}
							name="monoliths3And4Openness"
							value={2}>Не вскрывался</RadioItem
						>
					</RadioGroup>

					<p>Наружный знак</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={outerSignIntegrityRadio} name="outerSignIntegrity" value={1}
							>Сохранился</RadioItem
						>
						<RadioItem bind:group={outerSignIntegrityRadio} name="outerSignIntegrity" value={2}
							>Не сохранился</RadioItem
						>
					</RadioGroup>

					<p>ОРП I</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={orp1IntegrityRadio} name="orp1Integrity" value={1}
							>Сохранился</RadioItem
						>
						<RadioItem bind:group={orp1IntegrityRadio} name="orp1Integrity" value={2}
							>Не сохранился</RadioItem
						>
					</RadioGroup>

					<p>ОРП II</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={orp2IntegrityRadio} name="orp2Integrity" value={1}
							>Сохранился</RadioItem
						>
						<RadioItem bind:group={orp2IntegrityRadio} name="orp2Integrity" value={2}
							>Не сохранился</RadioItem
						>
					</RadioGroup>

					<p>Окопка</p>
					<RadioGroup
						class="form"
						active="variant-filled-primary"
						hover="hover:variant-soft-primary"
					>
						<RadioItem bind:group={trenchReadabilityRadio} name="trenchReadability" value={1}
							>Читается</RadioItem
						>
						<RadioItem bind:group={trenchReadabilityRadio} name="trenchReadability" value={2}
							>Не читается</RadioItem
						>
					</RadioGroup>
				</Accordion>
				<div class="m-3">
					<p>Фотография внешнего оформления (в перспективе)</p>
					<input class="input" name="centerMarkPhoto" type="file" accept="image/*" multiple />
				</div>
				<div class="m-3">
					<p>
						Фотография марки центра вблизи (очищенной от пыли, грязи и других загрязнений, чтобы
						читалась надпись и номер марки данного центра)
					</p>
					<input class="input" type="file" accept="image/*" multiple />
				</div>
				<p class="m-3">Высота верхней марки</p>

				<TextInput
					type="int"
					name="upperMarkBelowGroundHeight"
					label="Высота"
					value={$form.title}
					errors={$errors.title}
				/>
				<p class="m-3">Спутниковые наблюдения на пункте</p>
				<RadioGroup class="m-3" active="variant-filled-primary" hover="hover:variant-soft-primary">
					<RadioItem bind:group={satelliteObservabilityRadio} name="satelliteObservability" value="1"
						>Возможны</RadioItem
					>
					<RadioItem bind:group={satelliteObservabilityRadio} name="satelliteObservability" value="2"
						>Условно возможны</RadioItem
					>
					<RadioItem bind:group={satelliteObservabilityRadio} name="satelliteObservability" value="3"
						>Невозможны</RadioItem
					>
				</RadioGroup>
				{#if satelliteObservabilityRadio == 3}
					<TextArea
						type="text"
						name="satelliteObservabilityNotes"
						label="Укажите причину невозможности спутникового наблюдения - наличие и расстояние до лесного массива, зданий, сооружений и других объектов, мешающих видимости с пункта"
						value={$form.title}
						errors={$errors.title}
					/>
				{/if}
				<br />

				{#if $errors._errors}
					<br />
					<small class="text-error-500">{$errors._errors}</small>
				{/if}

				<br />
				<button class="btn variant-filled-primary m-3" type="submit">Создать</button>
				<hr />
			</div>
		</form>
	</div>
{/if}

{#each records as record}
	<article>
		<strong>{record.title}</strong>
		<p>
			{record.content}
		</p>
		{#if record.authUserId === data.user?.userId}
			<a href="/{record.id}" role="button">Редактировать</a>
		{/if}
		<hr />
	</article>
{/each}
