<script>
	export let title = '';
	export let listId = '';
	export let items = [];
	export let onDeleteList = () => {};
	export let onItemEdit = () => {};
</script>

<li class="shadow-sm border-2 mx-4 p-3 relative">
	<h3 class="w-full font-bold mb-2 p-2 border-b-2 border-blue-500">{title}</h3>
	{#each items as item, idx}
		<ul>
			<li class="block">
				<input
					type="checkbox"
					checked={item.done}
					on:click={() =>
						onItemEdit({
							listIdToUpdate: listId,
							itemIdToUpdate: item.itemId,
							itemValue: item.value,
							done: !item.done
						})}
				/>
				<input
					type="text"
					class="list__item"
					class:line-through={item.done}
					id={`list__item${listId}_${idx}`}
					value={item.value}
					on:blur={(e) =>
						onItemEdit({
							listIdToUpdate: listId,
							itemIdToUpdate: item.itemId,
							itemValue: e.target.value,
							done: item.done
						})}
				/>
			</li>
		</ul>
	{/each}
	<button
		on:click|preventDefault={() => onDeleteList(listId)}
		class="bg-yellow-200 border-2 border-yellow-300 shadow-yellow-600 absolute top-0 right-0 text-sm list__delete"
		>Delete</button
	>
</li>

<style>
</style>
