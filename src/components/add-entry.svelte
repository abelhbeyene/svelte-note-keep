<script context="module">
	export const prerender = true;
</script>

<script>
	let showTextArea = false;
	let title = '';
	let desc = '';
	export let onFormSubmit = () => {};
	const _onFormSubmit = (e) => {
		e.preventDefault()
		showTextArea = false;
		onFormSubmit(title, desc)
	}
</script>

<form class="take-note" on:submit={_onFormSubmit}>
	<input
		type="text"
		class="take-note__input"
		name="take-note__input"
		id="take-note__input"
		placeholder="Take a note..."
		bind:value={title}
		on:focus={() => (showTextArea = true)}
		on:blur={() => (showTextArea = false)}
	/>
	{#if showTextArea}
		<br />
		<textarea class="take-note__desc" name="take-note__desc" bind:value={desc} />
		<button type="submit">Save</button>
	{/if}
</form>

<style>
	.take-note__desc {
		/* display: none; */
	}
</style>
