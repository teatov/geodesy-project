<script lang="ts">
	let i = 0;

	function increment(by: number) {
		i += by;
	}

    let incBy = 1;
</script>



<div class="flex flex-col items-center justify-center">
    <div class="flex flex-col w-64 bg-red">
        <h1>{i}</h1>
        <button class="p-4" on:click={() => increment(incBy)}>+{incBy}</button>
        <input type="number" bind:value={incBy}>
    </div>
</div>