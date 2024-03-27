import { fieldTolabel } from "../helpers";

export const BASE_URL = "https://reqres.in/api/products";

export const PRODUCTS_PER_PAGE = 5;

export const TABLE_FIELDS = ["id", "name", "year"];

export const TABLE_HEADERS = TABLE_FIELDS.map(field => fieldTolabel(field));

export const PRODUCTS_TOTAL = 12;

export const PAGE_PREFIX = "&page=";

export const PRODUCT_PREFIX = "&id=";

export const DEBOUNCE_TIME_MS = 300;

export const DOMAIN_NAME = "products";
