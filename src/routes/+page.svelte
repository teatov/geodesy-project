<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ records } = data);
</script>

<form action="?/createRecord" method="POST">
	<h3>Создать</h3>
	<label for="title"> Заголовок </label>
	<input type="text" id="title" name="title" />
	<label for="title"> Текст </label>
	<textarea id="text" name="text" rows={5} />
	<button type="submit">Создать</button>
	<hr />
</form>

{#each records as record}
	<article>
		<header>{record.title}</header>
		<p>
			{record.text}
		</p>
		<form action="?/deleteRecord&id={record.id}" method="POST">
			<button type="submit">Удалить</button>
		</form>
		<a href="/{record.id}" role="button">Редактировать</a>
		<hr />
	</article>
{/each}
