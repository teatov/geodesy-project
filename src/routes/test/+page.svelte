<script lang="ts">
    import TextInput from '$lib/components/TextInput.svelte';
    import { Autocomplete } from '@skeletonlabs/skeleton';
import type { AutocompleteOption } from '@skeletonlabs/skeleton';

let inputDemo = '';

const flavorOptions: AutocompleteOption[] = [
	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Якутия', value: '1', keywords: '1', meta: { healthy: true } },
	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
];
				
function onDemoSelection(event: any): void {
	inputDemo = event.detail.label;
}
				
</script>


<div class="flex flex-col items-center">
    <div class="w-64">
        <TextInput type="text" name="title" label="Заголовок" />
    <TextInput type="text" name="title" label="Заголовок" />
    <TextInput type="text" name="title" label="Заголовок" />

    <input class="input" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." />
    
<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto">
	<Autocomplete bind:input={inputDemo} options={flavorOptions} on:selection={onDemoSelection} />
</div>

    
<label class="label">
	<span>Select</span>
	<select class="select">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		<option value="4">Option 4</option>
		<option value="5">Option 5</option>
	</select>
</label>
				
    </div>
</div>