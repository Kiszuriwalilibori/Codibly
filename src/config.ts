import { fieldTolabel } from "./helpers";

export const BASE_URL = "https://reqres.in/api/products";

export const PRODUCTS_PER_PAGE = 5;

export const TABLE_FIELDS = ["id", "name", "year"];

export const TABLE_HEADERS = TABLE_FIELDS.map(field => fieldTolabel(field));

export const PRODUCTS_TOTAL = 12;
