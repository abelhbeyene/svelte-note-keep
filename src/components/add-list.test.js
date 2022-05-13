
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/svelte";
import AddList from "./add-list";


test("Shows item entry on input focus", async () => {
    const { container } = render(AddList);
    const input = container.querySelector('.add-list__add-items-title')
    await fireEvent.focus(input)

    const itemsList = container.querySelector('.add-list__add-items-container')
    expect(itemsList).toBeTruthy();
});


test("Hides container on form submit", async () => {
    const onAddList = jest.fn();
    const { container } = render(AddList, { onAddList })
    const form = container.querySelector('form');
    const input = container.querySelector('.add-list__add-items-title')

    await fireEvent.focus(input)
    await fireEvent.submit(form)

    const textarea = container.querySelector('.add-list__add-items-container')

    expect(textarea).toBeFalsy();
    expect(onAddList).toHaveBeenCalled();
})

// test("hides textarea onblur", async () => {
//     const { container } = render(AddList)
//     const input = container.querySelector('.add-list__add-items-title');

//     await fireEvent.focus(input)
//     await fireEvent.blur(input)
    
//     const textarea = container.querySelector('.add-list__add-items-container');
//     expect(textarea).toBeFalsy();
// })

// test("Hides itemsription on save")



