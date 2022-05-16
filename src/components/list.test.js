
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/svelte";
import List from "./list";
// TODO: no need to render for every test
const list = {
    listId: '111',
    title: 'Shopping list 1',
    items: [
        {
            itemId: '1',
            value: 'milk',
            done: false
        },
        {
            itemId: '2',
            value: 'butter',
            done: false
        }
    ]
}
test("Deletes list with correct ID", async () => {
    const onDeleteList = jest.fn()
    const { container } = render(List, {
        onDeleteList,
        ...list
    });
    const deleteBtn = container.querySelector('.list__delete')
    await fireEvent.click(deleteBtn)

    expect(onDeleteList).toHaveBeenCalledWith(list.listId)
})
test("Updates correct item", async () => {
    const onItemEdit = jest.fn()
    const { container } = render(List, {
        onItemEdit,
        ...list
    });
    const idxToTest = 0;
    const firstItemInput = container.querySelectorAll(`.list__item`)[idxToTest]
    const newValue = 'Hello'
    await fireEvent.blur(firstItemInput, {
        target: {
            value: newValue
        }
    })

    expect(onItemEdit).toHaveBeenCalledWith({
        listIdToUpdate: list.listId,
        itemIdToUpdate: list.items[idxToTest].itemId,
        itemValue: newValue,
        done: list.items[idxToTest].done
    })
})