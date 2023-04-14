<script lang="ts">
	import TextArea from '$lib/components/TextArea.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
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
		<TextInput type="text" name="title" label="Заголовок" value={$form.title} errors={$errors.title} />

		<br />
		<TextArea type="text" name="content" label="Текст" value={$form.content} errors={$errors.content} />

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
