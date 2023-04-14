<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form);
</script>

<hgroup>
	<h2>Вход</h2>
</hgroup>

<form class="w-80" method="POST" use:enhance>
	<label for="email"
		><span>Почта</span>
		<input class="input" type="text" id="email" name="email" bind:value={$form.email} />
		{#if $errors.email}
			<small class="text-error-500">{$errors.email}</small>
		{/if}
	</label>

	<br />
	<label for="password"
		><span>Пароль</span>
		<input
			class="input"
			type="password"
			id="password"
			name="password"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			<small class="text-error-500">{$errors.password}</small>
		{/if}
	</label>

	<br />
	<button class="btn variant-filled-primary" type="submit">Войти</button>
</form>
<p>Нет учётной записи? <a href="/signup">Зарегистрироваться</a></p>
