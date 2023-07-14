<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import type { PageData } from './$types';
	import { Modal, AppShell } from '@skeletonlabs/skeleton';
	export let data: PageData;
</script>

<Modal regionBody="overflow-auto max-h-[calc(100vh-15rem)]" buttonTextCancel="Закрыть" />

<AppShell>
	<svelte:fragment slot="header">
		<nav class="flex justify-center space-x-4">
			<ul>
				<a href="/" class="btn hover:underline" role="button">На главную</a>
				<a href="/survey" class="btn hover:underline" role="button">Заполнить карточку</a>
				{#if !data.user}
					<a href="/login" class="btn hover:underline" role="button">Вход</a>
				{:else}
					<a href="/profile" class="btn hover:underline " role="button">Личный кабинет</a>
					<a href="/list" class="btn hover:underline" role="button">Список карточек</a>
				{/if}
			</ul>
		</nav>
	</svelte:fragment>
	<slot />
</AppShell>
