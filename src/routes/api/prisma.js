
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function get() {
    try {
        const lists = await prisma.list.findMany({
            include: {
                items: true
            }
        })
        
        return {
            body: {
                error: null,
                lists
            }
        };
    } catch (e) {
        throw e
    }
}

export async function post() {
    const lists = await prisma.list.create({
        data: {
            title: 'Shopping list 1',
            items: {
                create: [
                    {
                        value: 'milk',
                        done: false
                    },
                    {
                        value: 'butter',
                        done: true
                    }
                ]
            }
        }
    })
}