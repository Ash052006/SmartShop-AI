def infer_persona(features: dict[str, object]) -> str:
    if features.get("loyalty_points", 0):
        return "loyal"
    if features.get("discount_applied"):
        return "discount_seeker"
    if features.get("cart_value", 0) and features.get("items_count", 0):
        return "comparer"
    return "new"
