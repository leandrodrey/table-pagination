# Rick and Morty Characters

App to show the characters of Rick and Morty using the API: https://rickandmortyapi.com

## About the project

The principal components are the TableContainer component, which is responsible for fetching the 
data from the API and the Table component, which is responsible for rendering the table.

**The TableContainer component**:
- Uses the useSWR hook to call the service and fetch the data.
- Uses the characterAdapter to convert the data from the API to the ICharacterTable interface.
- Uses the useState hook to manage the state of the currentPage variable and render the Pagination component.
- Configures the columns of the table and defines a render component for each column if necessary.

**The Table component**:
- Renders the table with the configured columns and the sorted items.
- Uses the useSortTable custom hook to sort the items of the current page.

## Dependencies

### Production dependencies
- SWR to provide data fetching, caching, revalidation and error handling.
- Zustand to manage the state of the filters.

### Development dependencies
- ESLint.
- Tailwind CSS.
- TypeScript.
- Vite.

## How to run the project

1. Clone the repository: `git clone https://github.com/leandrodrey/table-pagination`.
2. Install the dependencies by running `yarn install`.
3. Start the development server by running `yarn dev`.
