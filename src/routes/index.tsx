import { DOMAIN_NAME, PAGE_PREFIX } from "config/config";
import { PathKeys } from "../types";

export const Paths: { [key in PathKeys]: any } = {
    main: "/",
    nopage: "*",
    first: `/${DOMAIN_NAME}/${PAGE_PREFIX}1`,
    previous: -1,
};
