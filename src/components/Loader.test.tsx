import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';
import {afterEach} from "vitest";

describe('Loader', () => {
    afterEach(() => {
        cleanup();
    });

    beforeAll(() => {
        render(<Loader/>);
    });

    it('should render the Loader component with the class "animate-spin"', () => {
        const loader = document.querySelector('.animate-spin');
        expect(loader).toBeInTheDocument();
    });
});
