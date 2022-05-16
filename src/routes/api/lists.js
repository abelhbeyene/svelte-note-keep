import seed from './seed.js'
import {v4 as uuidv4} from 'uuid'
let lists = seed;

// TODOs: 
//  - multiple users
//  - Validate inputs


export async function get() {
    return {
        body: {
            error: null,
            lists
        }
    };
}

export async function post({ request }) {
    const formData = await request.formData()
    const title = formData.get('title');
    const items = JSON.parse(formData.get('items'));

    const _items = items.map((v) => ({
        value: v,
        done: false,
        itemId: uuidv4() 
    }));

    lists = [
        ...lists, 
        { 
            listId: uuidv4(), 
            title, 
            items: _items 
        }
    ];
    return {
        body: {
            error: null,
            lists
        }
    };
}


export async function del({ request }) {
    const formData = await request.formData()
    const listIdToDelete = formData.get('listIdToDelete');

    lists = lists.filter(({ listId }) => listId !== listIdToDelete);
    return {
        body: {
            error: null,
            lists
        }
    };
}

export async function patch({ request }) {
    const formData = await request.formData()
    const listIdToUpdate = formData.get('listIdToUpdate');
    const itemIdToUpdate = formData.get('itemIdToUpdate');
    const itemValue = formData.get('itemValue');
    const done = formData.get('done');

    const listIdxToUpdate = lists.findIndex((list) => list.listId === listIdToUpdate);
    const itemIdx = lists[listIdxToUpdate].items.findIndex((item) => item.itemId === itemIdToUpdate);

    if (lists[listIdxToUpdate].items[itemIdx] === undefined) {
        return {
            error: true,
            errorMsg: "failed to update"
        }
    }

    lists[listIdxToUpdate].items[itemIdx].value = itemValue;
    lists[listIdxToUpdate].items[itemIdx].done = done === 'true';

    return {
        body: {
            error: null,
            lists
        }
    };
}