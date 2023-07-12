<script lang="ts">
	import type { PageData } from './$types';
	import { Paginator } from '@skeletonlabs/skeleton';
	import Autocomplete from '$lib/components/Autocomplete.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import TextInput from '$lib/components/TextInput.svelte';

	export let data: PageData;

	const { federalSubjects } = data;

	const { form, errors, enhance } = superForm(data.form, {
		resetForm: false,
	});

	let pagination = {
		offset: 0,
		limit: 20,
		size: data.surveys.length,
		amounts: [1, 5, 10, 20, 50, 100],
	};

	$: surveys = data.surveys.slice(
		pagination.offset * pagination.limit,
		pagination.offset * pagination.limit + pagination.limit
	);

	let federalDistrictInputValue = '';

	
</script>

<svelte:head>
	<title>Список карточек обследования</title>
	<meta name="description" content="Список карточек обследования" />
</svelte:head>

<div class="container mx-auto mt-0 px-4 py-10 md:max-w-5xl space-y-4">
	<Accordion>
		<AccordionItem>
			<svelte:fragment slot="summary">Фильтровать карточки</svelte:fragment>
			<svelte:fragment slot="content">
				<form method="GET" class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
				/>
						<Autocomplete
						name="federalSubject"
						bind:value={$form.federalSubject}
						options={federalSubjects}
						label="Субъект Российской Федерации"
						errors={$errors.federalSubject}
						/>
						<TextInput 
						type="number"
						name="placingYear"
						label="Год закладки"
						value={$form.placingYear || undefined}
								errors={$errors.placingYear}
								/>
								<TextInput
					type="text"
					name="workBy"
					label="Кем выполнены работы по обследованию"
					value={$form.workBy}
					errors={$errors.workBy}
				/>
				<TextInput
						type="text"
						name="createdBy"
						label="Составил(а)"
						value={$form.createdBy}
						errors={$errors.createdBy}
					/>
								<div class="flex justify-center md:col-span-2 gap-4">
									<button class="btn variant-filled-primary" type="submit">Фильтровать</button>
									<button class="btn variant-filled-error" type="reset">Очистить фильтры</button>
								</div>
			</form>

			</svelte:fragment>
		</AccordionItem>
	</Accordion>
	<Paginator
		bind:settings={pagination}
		text="text-base"
		amountText="шт."
		controlVariant="variant-surface"
		showFirstLastButtons
		showNumerals
	/>
	<ul class="space-y-4">
		{#each surveys as survey}
			<li class="card p-2 flex flex-col gap-4 md:flex-row">
				<div class="flex gap-2 h-32 w-[10rem] items-stretch">
					<img class="w-[50%] h-fit" src="/surveyPhotos/{survey.exteriorPhoto}" alt="" />
					<img class="w-[50%] h-fit" src="/surveyPhotos/{survey.centerMarkPhoto}" alt="" />
				</div>
				<span class="d-none md:divider-vertical" />
				<div class="grow">
					<div class="flex flex-col md:flex-row justify-between gap-0.5 md:gap-4">
						<span><b>Дата работ:</b> {survey.surveyDate.toLocaleDateString()}</span>
						<span class="d-none md:divider-vertical" />
						<span><b>Субъект РФ:</b> {survey.federalSubject.name}</span>
						<span class="d-none md:divider-vertical" />
						<span><b>Координаты:</b>
							{survey.latitude}
							{survey.longitude}
						</span>
					</div>
					<hr />
					<div class="flex flex-col md:flex-row justify-between gap-0.5 md:gap-4">
						<span><b>№ по каталогу/индекс пункта:</b> {survey.markerIndex}</span>
						<span class="d-none md:divider-vertical" />
						<span><b>Название пункта, класс, № марки:</b> {survey.markerName}</span>
						<span class="d-none md:divider-vertical" />
						<span><b>Год закладки:</b> {survey.placingYear}</span>
					</div>
					<hr />
					<div class="flex flex-col md:flex-row justify-between gap-0.5 md:gap-4">
						<span><b>Обследование выполнил(а):</b> {survey.workBy}</span>
						<span class="d-none md:divider-vertical" />
						<span><b>Составил(а):</b> {survey.createdBy}</span>
					</div>
				</div>
				<span class="d-none md:divider-vertical" />
				<div class="flex md:flex-col gap-4">
					<a href="/{survey.id}" class="btn variant-filled-primary">Открыть</a>
					<a href="/{survey.id}/createDocx" class="btn variant-filled-secondary">Скачать .docx</a>
				</div>
			</li>
		{/each}
	</ul>
</div>
