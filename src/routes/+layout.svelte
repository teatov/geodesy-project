<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import type { PageData } from './$types';
	import { Modal } from '@skeletonlabs/skeleton';
	export let data: PageData;
</script>

<Modal regionBody="overflow-auto max-h-[calc(100vh-15rem)]" buttonTextCancel="Закрыть"/>

<div class="container mx-auto mt-0 space-y-10 px-4 py-10 md:max-w-5xl">
	<nav class="flex justify-center space-x-4">
		<ul>
			<a
				href="/"
				class="rounded px-3 py-1 font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
				role="button">На главную</a
			>
			{#if !data.user}
				<a
					href="/login"
					class="rounded px-3 py-1 font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
					role="button">Вход</a
				>
			{:else}
				<a
					href="/profile"
					class="rounded px-3 py-1 font-bold text-slate-900
					hover:bg-slate-100 hover:text-slate-900"
					role="button">Личный кабинет</a
				>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
