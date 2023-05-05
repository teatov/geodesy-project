<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	export let modal: ModalSettings;
</script>

<button class="btn-icon variant-filled-secondary" on:click={() => modalStore.trigger(modal)}>
    ?
</button>