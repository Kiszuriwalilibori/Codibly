import { PAGE_PREFIX } from "config";
import { PathKeys } from "../types";

export const Paths: { [key in PathKeys]: any } = {
    main: "/",
    nopage: "*",
    first: `/products/${PAGE_PREFIX}1`,
    previous: -1,
};
