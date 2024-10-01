import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

import '@testing-library/jest-dom';

test('Pepperoni checkbox is initially unchecked', () => {
    render(<App />);
    const pepperoniCheckbox = screen.getByRole('checkbox', { name: /pepperoni/i });
    expect(pepperoniCheckbox).not.toBeChecked();
});

test('Cheese is the only item in the list when the page loads', () => {
    render(<App />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('Cheese');
    expect(items).not.toContain('Pepperoni');
});

test('Checkbox is checked when the user clicks on it', () => {
    render(<App />);
    const addPepperoni = screen.getByRole('checkbox', { name: /Add pepperoni/i });
    userEvent.click(addPepperoni);
    expect(addPepperoni).toBeChecked();
});

test('The topping associated with a checkbox appears in the list when the user clicks it', () => {
    render(<App />);

    const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

    userEvent.click(addPepperoni);

    expect(addPepperoni).toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.getByText("Pepperoni")).toBeInTheDocument();

    userEvent.click(addPepperoni);

    expect(addPepperoni).not.toBeChecked();
    expect(screen.getByText("Cheese")).toBeInTheDocument();
    expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

