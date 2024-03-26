import { PAGE_PREFIX } from "config";
import { PathKeys } from "../types";

export const Paths: { [key in PathKeys]: any } = {
    main: "/",
    nopage: "*",
    first: `/colors/${PAGE_PREFIX}1`,
    previous: -1,
};
