import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentTest from './index';


test('render test of the component', () => {
    render(<ComponentTest />);
    const testElm = screen.getByText('abstract class element');
});
