<script context="module">
	export const prerender = true;
</script>

<script>
	export let onAddList = () => {};

	let items = [];
	let newItemEntryVal = '';
	let showTextArea = true;
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
		reset();
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

<form class="add-list my-8 sm:px-8 py-3 w-6/12 flex flex-col" on:submit|preventDefault={_onAddList}>
	<input
		type="text"
		class="add-list__add-items-title border-b-blue-400 border-b-2 mb-2"
		name="add-list__add-items-title"
		id="add-list__add-items-title"
		placeholder="List title"
		bind:value={title}
		on:focus={() => (showTextArea = true)}
	/>
	{#if showTextArea}
		<ul class="add-list__add-items-container flex flex-col list-disc list-inside">
			{#each items as item, idx}
				<li class="">
					<input
						type="text"
						class="add-list__add-item border-b-blue-400 border-b-2 mb-2"
						placeholder="Add item"
						value={item}
						on:keyup={(e) => updateItem(e, idx)}
					/>
				</li>
			{/each}

			<li>
				<input
					type="text"
					placeholder="Add item"
					class="add-list__add-item border-b-blue-400 border-b-2 mb-2"
					bind:value={newItemEntryVal}
				/>
				<button class="add-list__add-another-item border-2 px-2 hover:bg-blue-300" on:click|preventDefault={addItem}
					>+</button
				>
			</li>
		</ul>
		<button type="submit" class="w-full bg-blue-500 text-white p-2">Save</button>
	{/if}
</form>
<hr class="border-1 border-blue-400 block w-full m-5" />

<style>
	.add-list__add-items-container {
		/* display: none; */
	}
</style>
