<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from 'svelte';

	import AddList from '../components/add-list.svelte';
	import List from '../components/list.svelte';
	let lists = [];
	export const onAddList = async (title, items) => {
		const body = new FormData();
		body.append('title', title);
		body.append('items', JSON.stringify(items));
		const res = await fetch('/api/lists', {
			method: 'POST',
			headers: {
				Accept: 'multipart/form-data'
			},
			body
		});
		const { error, lists: fetchedLists } = await res.json();

		if (!res.ok || error) {
			// handle error
			return;
		}
		lists = fetchedLists;
	};

	export const onDeleteList = async (listIdToDelete) => {
		const body = new FormData();
		body.append('listIdToDelete', listIdToDelete);
		lists = lists.filter(({ listId }) => listId !== listIdToDelete);
		const res = await fetch('/api/lists', {
			method: 'DELETE',
			headers: {
				Accept: 'multipart/form-data'
			},
			body
		});

		const { error, lists: fetchedLists } = await res.json();

		if (!res.ok || error) {
			// handle error
			return;
		}
		lists = fetchedLists;
	};

	const onItemEdit = async ({listIdToUpdate, itemIdToUpdate, itemValue, done}) => {
		const body = new FormData();
		body.append('listIdToUpdate', listIdToUpdate);
		body.append('itemIdToUpdate', itemIdToUpdate);
		body.append('itemValue', itemValue);
		body.append('done', done);
		const res = await fetch('/api/lists', {
			method: 'PATCH',
			headers: {
				Accept: 'multipart/form-data'
			},
			body
		});

		const {lists: newLists} = await res.json()
		lists = [...newLists];
	};


	onMount(async () => {
		try {
			const res = await fetch('/api/lists');
			const { error, lists: fetchedLists } = await res.json();
			if (error) throw error;
			lists = fetchedLists;
		} catch (e) {
			// TODO: handle error
			console.error('Failed to fetch lists', e);
		}
	});
</script>

<svelte:head>
	<title>Note keep</title>
	<meta name="description" content="Note keep demo" />
</svelte:head>

<header>
	<div class="p-5 text-center bg-blue-500">
		<img
			src="https://www.equalexperts.com/wp-content/themes/equalexperts/assets/logo.svg"
			alt=""
			srcset=""
			width="200"
		/>
	</div>
</header>
<section>
	<h1 class="text-2xl mt-6">Create multiple grocery lists</h1>

	<AddList {onAddList} />

	{#if lists.length > 0}
		<ul class="flex flex-row flex-wrap">
			{#each lists as list, index}
				<List {...list} {onDeleteList} {onItemEdit} />
			{/each}
		</ul>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
