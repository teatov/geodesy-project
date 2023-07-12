<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import { RadioGroup, RadioItem, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	export let name: string;
	export let label: string | undefined = undefined;
	export let items: { value: number | string; label: string }[];
	export let modal: ModalSettings | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let required: boolean | undefined = undefined;

	export let value: number | string | undefined = undefined;
</script>

<label for={name} {...$$restProps}>
	{#if label}<span>{label}</span>{/if}
	{#if required}<span class="text-error-500">*</span>{/if}
	<div class="flex gap-2">
		<RadioGroup background="grow justify-around {errors ? 'input-error' : ''}">
			{#each items as item}
				<RadioItem class="underline" bind:group={value} {name} value={item.value} required={false}>
					{item.label}
				</RadioItem>
			{/each}
		</RadioGroup>
		{#if modal}
			<InfoButton {modal} />
		{/if}
	</div>
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}
</label>
