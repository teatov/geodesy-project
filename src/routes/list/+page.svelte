<script lang="ts">
	import type { PageData } from './$types';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const { federalSubjects } = data;

	let pagination = {
		offset: 0,
		limit: 20,
		size: data.surveys.length,
		amounts: [5, 10, 20, 50, 100],
	};

	$: surveys = data.surveys.slice(
		pagination.offset * pagination.limit,
		pagination.offset * pagination.limit + pagination.limit
	);
</script>

<svelte:head>
	<title>Список карточек обследования</title>
	<meta name="description" content="Список карточек обследования" />
</svelte:head>

<div class="container mx-auto mt-0 px-4 py-10 md:max-w-5xl space-y-4">
	<Paginator
		bind:settings={pagination}
		text="text-base"
		amountText="шт."
		buttonClasses="btn-sm variant-filled text-3xl"
	/>
	<ul class="space-y-1">
		{#each surveys as survey}
			<li class="flex flex-col gap-4 md:h-32 md:flex-row">
				<div class="flex gap-2">
					<img src="/{survey.centerMarkPhoto}" alt="" />
					<img src="/{survey.exteriorPhoto}" alt="" />
				</div>
				<div class="grow">
					<div class="flex flex-wrap justify-between gap-4">
						<span>{survey.surveyDate.toLocaleDateString()}</span>
						<span>{survey.federalSubject.name}</span>
						<span>
							{survey.latitude}
							{survey.longitude}
						</span>
					</div>
					<div class="flex flex-wrap justify-between gap-4">
						<span>{survey.markerIndex}</span>
						<span>{survey.markerName}</span>
						<span>{survey.placingYear}</span>
					</div>
					<div class="flex flex-wrap gap-4"><span>{survey.createdBy}</span></div>
				</div>
				<div>
					<a href="/{survey.id}/createDocx" class="btn variant-filled-secondary">Скачать .docx</a>
				</div>
			</li>
			<hr />
		{/each}
	</ul>
	<Paginator
		bind:settings={pagination}
		text="text-base"
		amountText="шт."
		buttonClasses="btn-sm variant-filled text-3xl"
	/>
</div>
