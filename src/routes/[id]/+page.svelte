<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ record } = data);
</script>

<a href="/" role="button">Назад</a>

<form action="?/updateRecord" method="POST">
	<h3>Редактировать {record.title}</h3>
	<label for="title"> Заголовок </label>
	<input type="text" id="title" name="title" value={record.title} />
	<label for="title"> Текст </label>
	<textarea id="text" name="text" rows={5} value={record.text} />
	<button type="submit">Создать</button>
</form>
