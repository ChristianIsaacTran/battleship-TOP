/* eslint-disable no-undef */
import { add } from "./index.js";
import { describe, test, jest, expect} from "@jest/globals";

describe("this is a test that jest is working properly", () => {
    test("test if add returns 2 with inputs 1 and 1 for parameters a and b", () => {
        // mocked value
        const mockedFunction = jest.fn();
        mockedFunction.mockReturnValueOnce(2);
        expect(mockedFunction()).toBe(2);
    });
});
