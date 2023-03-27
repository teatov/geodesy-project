<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ record } = data);
</script>

<a href="/" role="button">Назад</a>

<form action="?/updateRecord" method="POST">
	<h3>Редактировать {record.title}</h3>
	<label for="title"> Заголовок </label>
	<input type="text" id="title" name="title" required value={record.title} />
	<br />
	<label for="title"> Текст </label>
	<textarea id="content" name="content" rows={5} required value={record.content} />
	<br />
	<button type="submit">Обновить</button>
</form>
