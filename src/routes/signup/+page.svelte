<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<hgroup>
	<h2>Регистрация</h2>
</hgroup>

<form method="POST" use:enhance>
	<label for="name">ФИО</label>
	<input type="text" id="fullName" name="fullName" required />
	<br />
	<label for="email">Почта</label>
	<input type="email" id="email" name="email" required />
	<br />
	<label for="password">Пароль</label>
	<input type="password" id="password" name="password" required />
	<br />
	<button type="submit">Зарегистрироваться</button>
</form>
<p>Уже есть учётная запись? <a href="/login">Войти</a></p>
