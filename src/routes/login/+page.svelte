<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<hgroup>
	<h2>Вход</h2>
</hgroup>

<form method="POST" use:enhance>
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
	<button type="submit">Войти</button>
</form>
<p>Нет учётной записи? <a href="/register">Зарегистрироваться</a></p>
