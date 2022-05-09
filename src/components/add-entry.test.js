
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/svelte";
import AddEntry from "./add-entry";


test("Shows textarea on input focus", async () => {
    const { container } = render(AddEntry);
    const input = container.querySelector('.take-note__input')
    await fireEvent.focus(input)

    const textarea = container.querySelector('.take-note__desc')

    expect(textarea).toBeTruthy();
});


test("on form submit", async () => {
    const onSubmitMock = jest.fn((title, desc) => {
        console.log('title', title)
        console.log('desc', desc)
    });
    const { container } = render(AddEntry, { onFormSubmit: onSubmitMock })
    const form = container.querySelector('form');
    const input = container.querySelector('.take-note__input')

    await fireEvent.focus(input)
    await fireEvent.submit(form)

    const textarea = container.querySelector('.take-note__desc')

    expect(textarea).toBeFalsy();
    expect(onSubmitMock).toHaveBeenCalled();
})

test("hides textarea onblur", async () => {
    const { container } = render(AddEntry)
    const input = container.querySelector('.take-note__input');

    await fireEvent.focus(input)
    await fireEvent.blur(input)
    
    const textarea = container.querySelector('.take-note__desc');
    expect(textarea).toBeFalsy();
})

// test("Hides description on save")



