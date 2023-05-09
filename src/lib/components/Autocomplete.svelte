<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import { Autocomplete, modalStore } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, ModalSettings } from '@skeletonlabs/skeleton';

	export let name: string;
	export let value: string | undefined = undefined;
	export let options: AutocompleteOption[] = [];
	export let label: string | undefined = undefined;
	export let modal: ModalSettings | undefined = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<label for={name} {...$$restProps}>
	{#if label}<span>{label}</span>{/if}
	<div class="mb-2 flex gap-2">
		<input class="input {errors ? 'input-error' : ''}" type="search" id={name} {name} bind:value />
		{#if modal}
			<InfoButton {modal} />
		{/if}
	</div>
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}

	<div class="card max-h-48 w-full overflow-y-auto p-4">
		<Autocomplete
			bind:input={value}
			{options}
			on:selection={(event) => {
				value = event.detail.label;
			}}
		/>
	</div>
</label>
