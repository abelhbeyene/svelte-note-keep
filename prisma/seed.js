import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const seed = [
    {
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
    },
    {
        title: 'Shopping list 2',
        items: {
            create: [
                {
                    value: 'Car',
                    done: false
                },
            ]
        }
    }
]

seed.forEach(async (s) => {
    await prisma.list.create({
        data: s
    })
})