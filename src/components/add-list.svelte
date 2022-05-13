<script context="module">
	export const prerender = true;
</script>

<script>
	export let onAddList = () => {};

	let items = [];
	let newItemEntryVal = '';
	let showTextArea = false;
	let title = '';

	const reset = () => {
		newItemEntryVal = '';
		showTextArea = false;
		title = '';
		items = [];
	};

	const _onAddList = () => {
		if (newItemEntryVal) {
			items = [...items, newItemEntryVal];
		}
		onAddList(title, items);
		reset()
		// TODO: what happens if it fails?
	};

	const addItem = () => {
		items = [...items, newItemEntryVal];
		newItemEntryVal = '';
	};
	const updateItem = (e, idx) => {
		const newItems = [...items];
		newItems[idx] = e.target.value;
		// reset items or no re-render
		items = newItems;
	};
</script>

<form class="add-list my-8 block border-b-2 w-48 border-blue-100" on:submit|preventDefault={_onAddList}>
	<input
		type="text"
		class="add-list__add-items-title"
		name="add-list__add-items-title"
		id="add-list__add-items-title"
		placeholder="Take a note..."
		bind:value={title}
		on:focus={() => (showTextArea = true)}
	/>
	{#if showTextArea}
		<ul class="add-list__add-items-container">
			{#each items as item, idx}
				<li>
					<input
						type="text"
						class="add-list__add-item"
						value={item}
						on:keyup={(e) => updateItem(e, idx)}
					/>
				</li>
			{/each}

			<li>
				<input type="text" class="add-list__add-item" bind:value={newItemEntryVal} />
				<button class="add-list__add-another-item" on:click|preventDefault={addItem}>+</button>
			</li>
		</ul>
		<button type="submit">Save</button>
	{/if}
</form>

<style>
	.add-list__add-items-container {
		/* display: none; */
	}
</style>
