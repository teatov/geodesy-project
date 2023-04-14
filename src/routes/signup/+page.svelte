<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<hgroup>
	<h2>Регистрация</h2>
</hgroup>

<form method="POST" use:enhance>
	<label for="name">ФИО</label>
	<input type="text" id="fullName" name="fullName" bind:value={$form.fullName} />
	{#if $errors.fullName}
		<small>{$errors.fullName}</small>
	{/if}
	<br />
	<label for="email">Почта</label>
	<input type="text" id="email" name="email" bind:value={$form.email} />
	{#if $errors.email}
		<small>{$errors.email}</small>
	{/if}
	<br />
	<label for="password">Пароль</label>
	<input type="password" id="password" name="password" bind:value={$form.password} />
	{#if $errors.password}
		<small>{$errors.password}</small>
	{/if}
	<br />
	<button type="submit">Зарегистрироваться</button>
</form>
<p>Уже есть учётная запись? <a href="/login">Войти</a></p>
