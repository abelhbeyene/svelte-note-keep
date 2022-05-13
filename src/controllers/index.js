export const onFormSubmit = (lists) => async (title, items) => {
    const _items = items.map((v) => ({ value: v, done: false }));
    lists = [...lists, { title, items: _items }];
    const res = await fetch('/api/add', {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: {
            title,
            items
        }
    });
    if (!res.ok) {
        // handle error
        return;
    }

    lists = await res.json();
};

export const onDeleteList = (lists) => async (idToDelete) => {
    lists = lists.filter(({ id }) => id !== idToDelete);
    // fetch('/delete', {
    // 	headers: {
    // 		Accept: 'application/json',
    // 	},
    // 	body: JSON.stringify({
    // 		id
    // 	})
    // })
}