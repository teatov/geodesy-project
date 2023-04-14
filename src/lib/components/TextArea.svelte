<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';

	export let name: string;
	export let value: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<label for={name}>
	{#if label}<span>{label}</span><br />{/if}
	<textarea
		class="textarea {errors ? 'input-error' : ''}"
		rows={5}
		id={name}
		{name}
		{...$$restProps}
		bind:value
	/>
	{#if errors}
		<small class="text-error-500">{errors}</small>
	{/if}
</label>
