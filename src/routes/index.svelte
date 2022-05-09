<script context="module">
	export const prerender = true;
</script>

<script>
    import AddEntry from '../components/add-entry.svelte'
	const onFormSubmit = async (title, desc) => {
		const res = await fetch('/api/add', {
			method: 'POST',
			headers: {
				Accept: 'application/json'
			},
			body: {
				title,
				desc
			}
		});
		if (!res.ok) {
			// handle error
			return;
		}

		notes = await res.json();
	};
</script>

<svelte:head>
	<title>Note keep</title>
	<meta name="description" content="Note keep demo" />
</svelte:head>

<section>
	<h1>Welcome to Note Keep</h1>

	<AddEntry onFormSubmit={onFormSubmit} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
