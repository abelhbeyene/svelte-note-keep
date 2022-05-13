<script>
	export let title = '';
	export let listId = '';
	export let items = [];
	export let onDeleteList = () => {};
	export let onItemStatusChange = () => {};
	export let onItemEdit = () => {};
</script>

<li class="shadow-sm border-2 mx-4 p-3">
	<h3 class="w-full font-bold mb-2 p-2 border-b-2 border-blue-500">{title}</h3>
	{#each items as item, idx}
		<ul>
			<li class="block">
				<input
					type="checkbox"
					checked={item.done}
					on:change={() => onItemStatusChange(listId, item.itemId)}
				/>
				<!-- <label
					for={`list__item${listId}_${idx}`}
					on:click={(e) => (e.target.style.display = 'none')}>{item.value}</label
				> -->
				<input
					type="text"
					class="list__item"
					class:list__item--done={item.done}
					id={`list__item${listId}_${idx}`}
					value={item.value}
					on:blur={(e) => onItemEdit(listId, item.itemId, e.target.value)}
				/>
			</li>
		</ul>
	{/each}
	<button
		on:click|preventDefault={() => onDeleteList(listId)}
		class="bg-yellow-200 border-2 border-yellow-300 shadow-yellow-600 list__delete">Delete {listId}</button
	>
</li>

<style>
	.list__item--done {
		text-decoration: line-through;
	}
</style>
