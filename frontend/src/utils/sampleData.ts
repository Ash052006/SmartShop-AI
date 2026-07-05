import type { ClassifyRequest } from "../types/api";

export const SAMPLE_REQUEST: ClassifyRequest = {
  session_id: "S001",
  events: [
    {
      event: "search",
      metadata: {
        query: "iphone",
      },
    },
    {
      event: "view_product",
      metadata: {
        product_id: "P101",
      },
    },
    {
      event: "compare_products",
      metadata: {
        product_ids: ["P101", "P102"],
      },
    },
    {
      event: "read_reviews",
      metadata: {
        product_id: "P101",
      },
    },
    {
      event: "add_to_cart",
      metadata: {
        product_id: "P101",
      },
    },
    {
      event: "apply_coupon",
      metadata: {
        coupon_code: "SAVE10",
      },
    },
    {
      event: "checkout",
      metadata: {},
    },
  ],
};

export const SAMPLE_JSON_STRING = JSON.stringify(SAMPLE_REQUEST, null, 2);
