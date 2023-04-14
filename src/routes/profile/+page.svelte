<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Личный кабинет</h2>
<div>
	<ul class="list">
		<li>
			<p>Почта: {data.user.email}</p>
		</li>
		<li>
			<p>ФИО: {data.user.fullName}</p>
		</li>
	</ul>
	<br />
	<form method="POST">
		<button class="btn variant-filled-error" formaction="/logout" type="submit"
			>Выйти из учётной записи</button
		>
	</form>
</div>
