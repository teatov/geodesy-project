<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { getStateString, getRecoveryRecommendations, getSignTypeString } from '$lib/infoStorage';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// const { form, errors, enhance } = superForm(data.form);
	$: ({ survey } = data);
</script>

<svelte:head>
	<title>Просмотр карточки обследования</title>
	<meta name="description" content="Просмотр карточки обследования" />
</svelte:head>

<!-- <form class="w-80" action="?/updateRecord" method="POST" use:enhance>
	<h3>Редактировать {record.title}</h3>
	<TextInput type="text" name="title" label="Заголовок" value={$form.title} errors={$errors.title} />

	<br />
	<TextArea type="text" name="content" label="Текст" value={$form.content} errors={$errors.content} />
	{#if $errors._errors}
		<br />
		<small class="text-error-500">{$errors._errors}</small>
	{/if}
	<br />
	<button class="btn variant-filled-primary" type="submit">Обновить</button>
</form>
<br />

<form action="?/deleteRecord" method="POST">
	<button class="btn variant-filled-error" type="submit">Удалить</button>
</form> -->

<div class="container mx-auto mt-0 px-4 py-10 md:max-w-5xl space-y-4">
	<h3 class="my-5 text-center">Карточка обследования пункта</h3>
	<div>
		<a href="/{survey.id}/createDocx" class="btn variant-filled-secondary">Скачать .docx</a>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<p class="md:col-span-2"><b>Создано:</b> {survey.createdAt.toLocaleString()}</p>
		<hr class="md:col-span-2" />
		<p><b>Кем выполнены работы по обследованию:</b> {survey.workBy}</p>
		<p><b>Дата производства работ:</b> {survey.surveyDate.toLocaleDateString()}</p>
		<hr class="md:col-span-2" />
		<p class="md:col-span-2"><b>Субъект Российской Федерации:</b> {survey.federalSubject.name}</p>
		<p><b>№ по каталогу/индекс пункта:</b> {survey.markerIndex}</p>
		<p><b>Название пункта, класс, № марки:</b> {survey.markerName}</p>
		<p><b>Год закладки:</b> {survey.placingYear}</p>
		<p><b>Высота знака (в метрах):</b> {survey.signHeight}</p>
		<hr class="md:col-span-2" />
		<p><b>Тип центра:</b> {survey.centerType}</p>
		<p><b>Высота над уровнем моря (в метрах) :</b> {survey.altitude}</p>
		<p><b>Трапеции:</b> {survey.trapezes}</p>
		<p><b>Координаты:</b> {survey.latitude} {survey.longitude}</p>
		<hr class="md:col-span-2" />
		<p><b>Тип знака:</b> {getSignTypeString(survey.signType)}</p>
		<hr class="md:col-span-2" />
		<p><b>Опознавательный столб (знак):</b> {getStateString(survey.signPresence)}</p>
		<p><b>Монолит I:</b> {getStateString(survey.monolith1Integrity)}</p>
		<p><b>Монолит II:</b> {getStateString(survey.monolith2Openness)}</p>
		<p><b>Монолиты III и IV:</b> {getStateString(survey.monoliths3And4Openness)}</p>
		<p><b>Наружный знак:</b> {getStateString(survey.outerSignIntegrity)}</p>
		<p><b>ОРП I:</b> {getStateString(survey.orp1Integrity)}</p>
		<p><b>ОРП II:</b> {getStateString(survey.orp2Integrity)}</p>
		<p><b>Окопка:</b> {getStateString(survey.trenchReadability)}</p>
		<hr class="md:col-span-2" />
		<p><b>Высота верхней марки (в метрах):</b> {survey.signHeight}</p>
		<p><b>Спутниковые наблюдения на пункте:</b> {getStateString(survey.satelliteObservability)}</p>
		<hr class="md:col-span-2" />
		<div>
			<p><b>Фотография внешнего оформления (в перспективе):</b></p>
			<img class="h-96" src="/surveyPhotos/{survey.exteriorPhoto}" alt="" />
		</div>
		<div>
			<p><b>Фотография марки центра вблизи:</b> </p>
			<img class="h-96" src="/surveyPhotos/{survey.centerMarkPhoto}" alt="" />
		</div>
		<hr class="md:col-span-2" />
		<p class="md:col-span-2"><b>Примечания:</b> {survey.extraNotes}</p>
		<p class="md:col-span-2"><b>Составил(а):</b> {survey.createdBy}</p>
	</div>
</div>