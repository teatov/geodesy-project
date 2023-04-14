<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
	$: ({ record } = data);
</script>

<a href="/" role="button">Назад</a>

<form action="?/updateRecord" method="POST" use:enhance>
	<h3>Редактировать {record.title}</h3>
	<label for="title"> Заголовок </label>
	<input type="text" id="title" name="title" bind:value={$form.title} />
	{#if $errors.title}
		<small>{$errors.title}</small>
	{/if}
	<br />
	<label for="title"> Текст </label>
	<textarea id="content" name="content" rows={5} bind:value={$form.content} />
	{#if $errors.content}
		<small>{$errors.content}</small>
	{/if}
	<br />
	<button type="submit">Обновить</button>
</form>
<br>

<form action="?/deleteRecord" method="POST">
	<button type="submit">Удалить</button>
</form>