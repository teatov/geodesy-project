<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance, capture, restore } = superForm(data.form, {
		resetForm: false,
	});
	$: ({ records } = data);

	export const snapshot = { capture, restore };
</script>

{#if data.user}
	<form class="w-80" action="?/createRecord" method="POST" use:enhance>
		<h3>Создать</h3>
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
		{#if $errors._errors}
			<br />
			<small class="text-error-500">{$errors._errors}</small>
		{/if}
		<br />
		<button class="btn variant-filled-primary" type="submit">Создать</button>
		<hr />
	</form>
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
