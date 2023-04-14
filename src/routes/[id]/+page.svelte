<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
	$: ({ record } = data);
</script>

<a href="/" role="button">Назад</a>

<form class="w-80" action="?/updateRecord" method="POST" use:enhance>
	<h3>Редактировать {record.title}</h3>
	<label for="title">
		<span>Заголовок</span>
		<input class="input" type="text" id="title" name="title" bind:value={$form.title} />
		{#if $errors.title}
			<small class="text-error-500">{$errors.title}</small>
		{/if}
	</label>

	<br />
	<label for="title">
		<span>Текст</span>
		<textarea class="textarea" id="content" name="content" rows={5} bind:value={$form.content} />
		{#if $errors.content}
			<small class="text-error-500">{$errors.content}</small>
		{/if}
	</label>

	<br />
	<button class="btn variant-filled-primary" type="submit">Обновить</button>
</form>
<br />

<form action="?/deleteRecord" method="POST">
	<button type="submit">Удалить</button>
</form>
