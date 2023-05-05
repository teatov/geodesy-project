<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import InfoButton from '$lib/components/InfoButton.svelte';

	export let name: string;
	export let value: string | undefined;
	export let label: string | undefined;
	export let modal: ModalSettings | undefined = undefined;
	export let errors: string[] | undefined;
</script>

<label for={name}>
	{#if label}<span>{label}</span>{/if}
	<div class="flex gap-2">
		<div class="grow">
			<input
				class="input {errors ? 'input-error' : ''}"
				id={name}
				{name}
				{...$$restProps}
				bind:value
			/>
		</div>
		{#if modal}
			<InfoButton {modal} />
		{/if}
	</div>
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}
</label>
