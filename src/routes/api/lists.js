import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function get() {
    const lists = await prisma.list.findMany({
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })
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
        done: false
    }));

    const lists = await prisma.list.create({
        data: {
            title,
            items: {
                create: _items
            }
        }
    })
    
    return {
        body: {
            error: null,
            lists
        }
    };
}


export async function del({ request }) {
    const formData = await request.formData()
    const id = formData.get('listIdToDelete');

    const list = await prisma.list.delete({
        where: {
            id
        }
    });

    return {
        body: {
            error: null,
            list
        }
    };
}

export async function patch({ request }) {
    const formData = await request.formData()
    const id = formData.get('itemIdToUpdate');
    const value = formData.get('itemValue');
    const done = formData.get('done') === 'true';

    const res = await prisma.items.update({
        where: {
            id
        },
        data: {
            value,
            done,
            id
        }
    })

    return {
        body: {
            error: null,
            res
        }
    };
}