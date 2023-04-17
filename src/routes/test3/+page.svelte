<script lang="ts">
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	let i = 0;
	function increment(n: number) {
		i += n;
	}
	let t = 1;
	let k = true;
	let inputDemo = '';

	const flavorOptions: AutocompleteOption[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false },
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } },
	];

	function onDemoSelection(event: any): void {
		inputDemo = event.detail.label;
	}
</script>

<div class="flex flex-col items-center">
	<div class="w-64">
		<h1>{i}</h1>
		<button type="button" class="btn variant-filled" on:click={() => increment(t)}>+{t}</button>

		<label class="label">
			<span>Input</span>
			<input class="input" type="number" placeholder="Input" bind:value={t} />
		</label>

		<p>{t}</p>
		<label class="flex items-center space-x-2">
			<input class="checkbox" type="checkbox" bind:checked={k} />
			<p>Option 1</p>
		</label>
		{#if k}
			<p>cgyjk</p>
		{/if}
        <input class="input" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." />
        
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto">
	<Autocomplete bind:input={inputDemo} options={flavorOptions} on:selection={onDemoSelection} />
</div>

	</div>
</div>
