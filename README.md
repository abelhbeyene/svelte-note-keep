Version number: 5b8d0fd276b6d288905ed2f63a934e057e8feca2 

# Svelte

This app is powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).


## Running the project

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# To run tests
npm run test
```

## Using the app
- There are pre-defined lists to for demo purposes (./src/api/seed.js)
- The app allows you to:
    - add multiple shopping lists
    - with multiple items in the list
    - Delete a list
    - Update item value
    - Update item status
- To add a new list give it a title and add an item(s) (optional)
- FE code starts in ./src/routes/index.svelte
- BE code starts in ./src/routes/api/lists.js

## TODOs
- Tests for APIs
- Backend assumes there will only be one user
- Error handling on both FE & BE
- Responsive
