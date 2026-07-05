"""
Central definition of all supported ecommerce events.

Every module (validator, feature extractor, simulator, rule engine)
will use this file as the single source of truth.
"""

VALID_EVENTS = {
    "search",
    "view_product",
    "compare_products",
    "read_reviews",
    "add_to_cart",
    "remove_from_cart",
    "apply_coupon",
    "checkout",
    "purchase",
    "leave_site",
}

EVENT_WEIGHTS = {
    "search": 1,
    "view_product": 2,
    "compare_products": 4,
    "read_reviews": 2,
    "add_to_cart": 5,
    "remove_from_cart": 2,
    "apply_coupon": 4,
    "checkout": 7,
    "purchase": 10,
    "leave_site": 1,
}