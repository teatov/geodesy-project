<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import { boolean } from 'zod';

	export let name: string;
	export let value: string | number | undefined = undefined;
	export let label: string | undefined;
	export let modal: ModalSettings | undefined = undefined;
	export let errors: string[] | undefined;
	export let required: boolean | undefined = undefined;
</script>

<label for={name}>
	{#if label}<span>{label}</span>{/if}
	{#if required}<span class="text-error-500">*</span>{/if}
	<div class="flex gap-2">
		<div class="grow">
			<input
				class="input {errors ? 'input-error' : ''}"
				id={name}
				{name}
				{...$$restProps}
				bind:value
				required={false}
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
