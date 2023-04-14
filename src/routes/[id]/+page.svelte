<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
	$: ({ record } = data);
</script>

<a href="/" role="button">Назад</a>

<form class="w-80" action="?/updateRecord" method="POST" use:enhance>
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
</form>
