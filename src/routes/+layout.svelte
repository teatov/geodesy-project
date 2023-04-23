<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container mx-auto mt-0 space-y-8 px-4 py-3 md:max-w-4xl">
	<nav>
		<ul>
			<li><a href="/">На главную</a></li>
			{#if !data.user}
				<li>
					<a href="/signup">Регистрация</a>
				</li>
				<li><a href="/login" role="button">Вход</a></li>
			{:else}
				<li>
					<a href="/profile" role="button">Личный кабинет</a>
				</li>
			{/if}
		</ul>
	</nav>
	<slot />
</div>
