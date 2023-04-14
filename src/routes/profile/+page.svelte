<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Личный кабинет</h1>
<div>
	<p>Почта: {data.user.email}</p>
	<p>ФИО: {data.user.fullName}</p>

	<form method="POST">
		<button formaction="/logout" type="submit">Выйти из учётной записи</button>
	</form>
</div>
