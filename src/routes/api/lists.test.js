import '@testing-library/jest-dom';

import seed from '../../../prisma/seed'
import { get, post, patch, del } from './lists'

test('Gets lists', async () => {
    const { body: {
        lists
    } } = await get()

    expect(lists).toEqual(seed)
})


test('Adds a list', async () => {
    const formData = new FormData()
    const testTitle = 'Test List 1'
    formData.append('title', testTitle)
    const newItemToAdd = [{
        value: 'Value',
        done: false
    }]
    formData.append('items', JSON.stringify(newItemToAdd))

    const request = { formData: () => formData }
    const { body: {
        lists
    } } = await post({
        request
    })

    const result = lists.find(({title}) => title === testTitle)
    expect(result).toBeTruthy()
})