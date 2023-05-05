<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	export let name: string;
	export let value: string;
	export let label: string | undefined;
	export let modal: ModalSettings | undefined = undefined;
	export let errors: string[] | undefined;
</script>

<label for={name}>
	{#if label}<span>{label}</span>{/if}
	<textarea
		class="textarea {errors ? 'input-error' : ''}"
		rows={5}
		id={name}
		{name}
		{...$$restProps}
		bind:value
	/>
	{#if modal}
		<InfoButton {modal} />
	{/if}
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}
</label>
