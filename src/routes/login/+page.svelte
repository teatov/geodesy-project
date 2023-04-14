<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<hgroup>
	<h2>Вход</h2>
</hgroup>

<form class="w-80" method="POST" use:enhance>
	<TextInput type="text" name="email" label="Почта" value={$form.email} errors={$errors.email} />
	<br />
	<TextInput
		type="password"
		name="password"
		label="Пароль"
		value={$form.password}
		errors={$errors.password}
	/>
	{#if $errors._errors}
		<br />
		<small class="text-error-500">{$errors._errors}</small>
	{/if}
	<br />
	<button class="btn variant-filled-primary" type="submit">Войти</button>
</form>
<p>Нет учётной записи? <a href="/signup">Зарегистрироваться</a></p>
