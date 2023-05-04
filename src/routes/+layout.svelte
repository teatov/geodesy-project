<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container mx-auto mt-0 space-y-10 px-4 py-10 md:max-w-4xl">
	<nav class="flex justify-center space-x-4">
		<ul>
			<a href="/" class="font-bold px-3 py-1 text-slate-700 rounded hover:bg-slate-100 hover:text-slate-900" role="button">На главную</a>
			{#if !data.user}
					<a href="/login" class="font-bold px-3 py-1 text-slate-700 rounded hover:bg-slate-100 hover:text-slate-900" role="button">Вход</a>
			{:else}
					<a href="/profile" class="font-bold px-3 py-1 text-slate-900 rounded
					hover:bg-slate-100 hover:text-slate-900" role="button">Личный кабинет</a>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
