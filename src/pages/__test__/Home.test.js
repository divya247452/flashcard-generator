import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../Home";

// Mock components
jest.mock("../../components/createFlashCard/GroupTitleInput", () => () => <input data-testid="group-title-input" />);
jest.mock("../../components/createFlashCard/GroupDescriptionInput", () => () => <textarea data-testid="group-description-input" />);
jest.mock("../../components/createFlashCard/DisplayPicInput", () => ({ setFieldValue, displayPic, error }) => (
  <input type="file" data-testid="display-pic-input" />
));
jest.mock("../../components/createFlashCard/CardItemList", () => ({ cardItems, arrayHelpers, errors, touched }) => (
  <div data-testid="card-item-list">
    {cardItems.map((_, index) => (
      <div key={index} data-testid="card-item">
        <input data-testid={`term-input-${index}`} />
        <input data-testid={`definition-input-${index}`} />
        <input type="file" data-testid={`image-input-${index}`} />
      </div>
    ))}
  </div>
));

const mockStore = configureStore([]);

describe("Home Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test("renders the form elements", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByTestId("group-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("group-description-input")).toBeInTheDocument();
    expect(screen.getByTestId("display-pic-input")).toBeInTheDocument();
    expect(screen.getByTestId("card-item-list")).toBeInTheDocument();
  });
});
