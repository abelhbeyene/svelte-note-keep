import seed from './seed.js'
import {v4 as uuidv4} from 'uuid'
let lists = seed;



export async function get({ params }) {
    return {
        body: {
            error: null,
            lists
        }
    };
}

// TODO: concurrency?
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