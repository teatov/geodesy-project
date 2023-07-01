<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<svelte:head>
	<title>Регистрация</title>
	<meta name="description" content="Регистрация" />
</svelte:head>

<hgroup>
	<h2 class="flex justify-center space-x-4">Регистрация</h2>
</hgroup>

<div class="flex justify-center space-x-4">
	<form class="w-80" method="POST" use:enhance>
		<TextInput
			type="text"
			name="fullName"
			label="ФИО"
			value={$form.fullName}
			errors={$errors.fullName}
		/>

		<br />
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
		<button class="btn variant-filled-primary" type="submit">Зарегистрироваться</button>
	</form>
</div>

<div class="flex justify-center space-x-4">
	<p>Уже есть учётная запись? <a href="/login">Войти</a></p>
</div>
