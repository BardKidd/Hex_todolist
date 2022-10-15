import configureMockStore from "redux-mock-store";
import epicMiddleware from "@/middleware";

export const mockStore = configureMockStore([epicMiddleware]);
