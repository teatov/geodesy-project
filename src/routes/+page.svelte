<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ records } = data);
</script>

<form action="?/createRecord" method="POST">
	<h3>Создать</h3>
	<label for="title"> Заголовок </label>
	<input type="text" id="title" name="title" required />
	<br />
	<label for="title"> Текст </label>
	<textarea id="content" name="content" rows={5} required />
	<br />
	<button type="submit">Создать</button>
	<hr />
</form>

{#each records as record}
	<article>
		<header>{record.title}</header>
		<p>
			{record.content}
		</p>
		<form action="?/deleteRecord&id={record.id}" method="POST">
			<button type="submit">Удалить</button>
		</form>
		<a href="/{record.id}" role="button">Редактировать</a>
		<hr />
	</article>
{/each}
