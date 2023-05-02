<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { FileButton } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const { form, errors, enhance, capture, restore } = superForm(data.form, {
		resetForm: false,
	});
	$: ({ records } = data);

	export const snapshot = { capture, restore };

	let timeHorizontal: string = 'months';
	let forma = 0, form_sht = 0;
	let signal =0;
	let material = 0, form_pir = 0;
	let sputnic = 0;
	let height = 0;
	let stolb = 0,stolb_vost = 0, monolit1 = 0, monolit2 = 0, monolit3 = 0, outznak = 0, orp1 = 0, orp2 = 0, okopka = 0;
	let monolit1_vost = 0, monolit2_vost = 0, monolit3_vost =0, outznak_vost = 0, orp1_vost = 0;
	let orp2_vost = 0, okopka_vost = 0;
	let file;
</script>

{#if data.user}
<div class="grid justify-items-center w-3/4 text-sm font-serif">
	<form action="?/createRecord" method="POST" use:enhance>
		<h3 class="my-5 text-center">Карточка обследования пункта ГГС</h3>
		<div class="m-3">
		<TextInput type="text" name="Username" label="ФИО заполняющего" value={$form.title} errors={$errors.title} /></div>
		<div class="m-3">
		<TextInput type="int" name="number" label="Номер телефона" value={$form.title} errors={$errors.title} />
		</div>
		<div class="m-3">
		<TextInput type="text" name="email" label="Электронная почта" value={$form.title} errors={$errors.title} />
		</div>
		<div class="m-3">
		<TextInput type="date" name="createdAt" label="Год производства работ" value={$form.title} errors={$errors.title} />
		</div>
		<div class="m-3">
		<TextInput type="text" name="federalSubject" label="Субъект Российской Федерации" value={$form.title} errors={$errors.title} /></div>
		<div class="m-3">
		<p>Кем выполнена работа</p>
		<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={timeHorizontal} name="special" value="Volonter">Волонтер</RadioItem>
			<RadioItem bind:group={timeHorizontal} name="special" value="Special">Специалист</RadioItem>
		</RadioGroup>
	</div>
	<div class="m-3">
		<TextInput type="text" name="markerName" label="Название геодезического пункта (если известно)" value={$form.title} errors={$errors.title} />
	</div>	
	<div class="m-3">
		<TextInput type="text" name="markerIndex" label="Номер геодезического пункта (если известно)" value={$form.title} errors={$errors.title} />	
		</div>
		<div class="m-3">
		<Accordion autocollapse class="card p-4 text-token">
			<AccordionItem autocollapse>
				<svelte:fragment slot="lead"><i class="fa-solid fa-film text-xl w-6 text-center" /></svelte:fragment>
						<svelte:fragment slot="summary"><p>Тип знака (наружное оформление):</p></svelte:fragment>
						<svelte:fragment slot="content">
							<p><strong>Сигнал </strong> (состоит из двух вложенных друг в друга конструкций — внешней и внутренней усеченных пирамид, или ферм, одна из которых несёт площадку для наблюдателя и визирную цель, а другая — столик для прибора.) </p>
							<p><strong>Пирамида</strong> (обычно высота 5-8 м, может быть определена путем измерения с точностью до 0.1 м и проставлена в ячейку)</p>
							<p><strong>Штатив</strong> (имеет высоту инструментального столика 1.2м.)</p>
							<p><strong>Тур</strong> (аналог штатива, устанавливается на столбе)</p>
						</svelte:fragment>
			</AccordionItem>
			<div class="m-3">
			<RadioGroup class = "forma" active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={forma} name="form" value={1}>Сигнал</RadioItem>
			<RadioItem bind:group={forma} name="form" value={2}>Пирамида</RadioItem>
			<RadioItem bind:group={forma} name="form" value={3}>Штатив</RadioItem>
			<RadioItem bind:group={forma} name="form" value={4}>Тур</RadioItem>
		</RadioGroup>
	</div>
	<div class="m-3">
		{#if forma === 1}
			<RadioGroup class = "form_signal" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={signal} name="form" value="1"><p><italic>Простой сигнал</italic> (высота от 6м. до 15м.)</p> </RadioItem>
				<RadioItem bind:group={signal} name="form" value="2"><italic>Сложный сигнал </italic>(от 16м. до 55м.) </RadioItem>
			</RadioGroup>
		{:else if forma == 2}
			<RadioGroup class = "form_piramida" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={material} name="form" value="1">Деревянная</RadioItem>
				<RadioItem bind:group={material} name="form" value="2">Металлическая</RadioItem>
			</RadioGroup>
			<RadioGroup class = "form_piramida" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={form_pir} name="form" value="1">Трехгранная</RadioItem>
				<RadioItem bind:group={form_pir} name="form" value="2">Четырехгранная</RadioItem>
			</RadioGroup>
		{:else if forma == 3}
			<RadioGroup class = "form_shtativ" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={material} name="form" value="1">Деревянный</RadioItem>
				<RadioItem bind:group={material} name="form" value="2">Металлическый</RadioItem>
			</RadioGroup>
			<RadioGroup class = "form_shtativ" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={form_sht} name="form" value="1">Трехгранный</RadioItem>
				<RadioItem bind:group={form_sht} name="form" value="2">Четырехгранный</RadioItem>
			</RadioGroup>
		{:else if forma == 4}
			<RadioGroup class = "form_tur" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={material} name="form" value="1">Бетонный</RadioItem>
				<RadioItem bind:group={material} name="form" value="2">Каменный</RadioItem>
				<RadioItem bind:group={material} name="form" value="3">Кирпичный</RadioItem>
			</RadioGroup>
		{/if}
	</div>
		</Accordion>
	</div>
	<div class="m-3">
		<TextInput type="text" name="height" label="Высота над уровнем моря (может быть снята с карты или с показаний GPS приёмника) " value={$form.title} errors={$errors.title} />
		</div>
		<div class="m-3">
		<TextInput type="text" name="coordinate" label="Координаты по GPS приёмнику (43.115468, 131.885431 и высота над эллипсоидом WGS-84))" value={$form.title} errors={$errors.title} />
	</div>
	<div class="m-3">
		<Accordion autocollapse class="card p-4 text-token">
			<AccordionItem autocollapse>
				<svelte:fragment slot="lead"><i class="fa-solid fa-film text-xl w-6 text-center" /></svelte:fragment>
						<svelte:fragment slot="summary"><p class="font-bold">Результаты обследования пункта:</svelte:fragment>
			</AccordionItem>


			<p>Опознавательный столб (знак)</p>
			<RadioGroup class = "signIsPlaced" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={stolb} name="signIsPlaced" value={1}>устанавливался</RadioItem>
				<RadioItem bind:group={stolb} name="signIsPlaced" value={2}>не устанавливался</RadioItem>
			</RadioGroup>
			{#if stolb == 1}
			<p>Рекомендации по восстановлению опознавательного столба</p>
			<RadioGroup class = "signIsPlaced" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={stolb_vost} name="signIsPlaced" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={stolb_vost} name="signIsPlaced" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>Монолит I</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={monolit1} name="monolith1IsIntact" value={1}>Сохранился</RadioItem>
				<RadioItem bind:group={monolit1} name="monolith1IsIntact" value={2}>Не сохранился</RadioItem>
			</RadioGroup>
			{#if monolit1 == 1}
			<p>Рекомендации по восстановлению монолита I</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={monolit1_vost} name="monolith1IsIntact" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={monolit1_vost} name="monolith1IsIntact " value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>Монолит II</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={monolit2} name="monolith2IsOpened" value={1}>Вскрывался</RadioItem>
				<RadioItem bind:group={monolit2} name="monolith2IsOpened" value={2}>Не вскрывался</RadioItem>
			</RadioGroup>
			{#if monolit2 == 1}
			<p>Рекомендации по восстановлению монолита II</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={monolit2_vost} name="monolith2IsOpened" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={monolit2_vost} name="monolith2IsOpened" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>Монолиты III и IV</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={monolit3} name="monoliths3And4AreOpened" value={1}>Вскрывался</RadioItem>
				<RadioItem bind:group={monolit3} name="monoliths3And4AreOpened" value={2}>Не вскрывался</RadioItem>
			</RadioGroup>
			{#if monolit3 == 1}
			<p>Рекомендации по восстановлению монолита III и IV</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={monolit2_vost} name="monoliths3And4AreOpened" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={monolit2_vost} name="monoliths3And4AreOpened" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>Наружный знак</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={outznak} name="outerSignIsIntact" value={1}>Сохранился</RadioItem>
				<RadioItem bind:group={outznak} name="outerSignIsIntact" value={2}>Не сохранился</RadioItem>
			</RadioGroup>
			{#if outznak == 1}
			<p>Рекомендации по восстановлению наружного знака</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={outznak_vost} name="outerSignIsIntact" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={outznak_vost} name="outerSignIsIntact" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>ОРП I</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={orp1} name="orp1IsIntact" value={1}>Сохранился</RadioItem>
				<RadioItem bind:group={orp1} name="orp1IsIntact" value={2}>Не сохранился</RadioItem>
			</RadioGroup>
			{#if orp1 == 1}
			<p>Рекомендации по восстановлению ОРП I</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={orp1_vost} name="orp1IsIntact" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={orp2_vost} name="orp1IsIntact" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>ОРП II</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={orp2} name="orp2IsIntact" value={1}>Сохранился</RadioItem>
				<RadioItem bind:group={orp2} name="orp2IsIntact" value={2}>Не сохранился</RadioItem>
			</RadioGroup>
			{#if orp2 == 1}
			<p>Рекомендации по восстановлению ОРП II</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={orp2_vost} name="orp2IsIntact" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={orp2_vost} name="orp2IsIntact" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
			<p>Окопка</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={okopka} name="trenchIsReadable" value={1}>Читается</RadioItem>
				<RadioItem bind:group={okopka} name="trenchIsReadable" value={2}>Не читается</RadioItem>
			</RadioGroup>
			{#if okopka == 1}
			<p>Рекомендации по восстановлению окопки</p>
			<RadioGroup class = "form" active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={okopka_vost} name="trenchIsReadable" value={1}>Необходимо восстановить</RadioItem>
				<RadioItem bind:group={okopka_vost} name="trenchIsReadable" value={2}>Нет необходимости</RadioItem>
			</RadioGroup>
			{/if}
		</Accordion>
		<div class="m-3">
		<p>Фотография внешнего оформления (в перспективе)</p>
		<FileButton file name="files"/>
	</div>
		<p class="m-3">Фотография марки центра вблизи (очищенной от пыли, грязи и других загрязнений, чтобы читалась надпись и номер марки данного центра)</p>
		<FileButton class="m-3" name="files"/>
		<p class="m-3">Высота верхней марки</p>
		
		<RadioGroup class="m-3" active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={height}  name="upperMarkBelowGroundHeight" value="1">Выше уровня моря</RadioItem>
			<RadioItem bind:group={height} name="upperMarkBelowGroundHeight" value="2">Ниже</RadioItem>
			<TextInput type="int" name="height" label="Высота" value={$form.title} errors={$errors.title} />
		</RadioGroup>	
		<p class="m-3">Спутниковые наблюдения на пункте</p>
		<RadioGroup class="m-3" active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={sputnic}  name="satelliteObservability" value="1">Возможны</RadioItem>
			<RadioItem bind:group={sputnic} name="satelliteObservability" value="2">Условно возможны</RadioItem>
			<RadioItem bind:group={sputnic} name="satelliteObservability" value="3">Невозможны</RadioItem>
		</RadioGroup>	
		{#if sputnic == 3}
			<TextArea type="text" name="satelliteObservability" label="Укажите причину невозможности спутникового наблюдения - наличие и расстояние до лесного массива, зданий, сооружений и других объектов, мешающих видимости с пункта" value={$form.title} errors={$errors.title} />	
		{/if}
		<br />
		
		{#if $errors._errors}
			<br />
			<small class="text-error-500">{$errors._errors}</small>
		{/if}

		<br />
		<button class="m-3 btn variant-filled-primary" type="submit">Создать</button>
		<hr />
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
