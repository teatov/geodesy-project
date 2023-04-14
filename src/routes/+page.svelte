<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, constraints, enhance } = superForm(data.form);
	$: ({ records } = data);
</script>

{#if data.user}
	<form action="?/createRecord" method="POST" use:enhance>
		<h3>Создать</h3>
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
		<button type="submit">Создать</button>
		<hr />
	</form>
{/if}

{#each records as record}
	<article>
		<header>{record.title}</header>
		<p>
			{record.content}
		</p>
		{#if record.authUserId === data.user?.userId}
			<form action="?/deleteRecord&id={record.id}" method="POST">
				<button type="submit">Удалить</button>
			</form>
			<a href="/{record.id}" role="button">Редактировать</a>
		{/if}
		<hr />
	</article>
{/each}
