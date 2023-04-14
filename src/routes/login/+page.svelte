<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<hgroup>
	<h2>Вход</h2>
</hgroup>

<form method="POST" use:enhance>
	<label for="email">Почта</label>
	<input type="text" id="email" name="email" required />
	<br />
	<label for="password">Пароль</label>
	<input type="password" id="password" name="password" required />
	<br />
	<button type="submit">Войти</button>
</form>
<p>Нет учётной записи? <a href="/register">Зарегистрироваться</a></p>
