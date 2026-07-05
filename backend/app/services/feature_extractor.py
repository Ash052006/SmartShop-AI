from app.core.event_types import EVENT_WEIGHTS


class FeatureExtractor:

    @staticmethod
    def extract(events):

        features = {
            "search_count": 0,
            "product_views": 0,
            "comparison_count": 0,
            "review_reads": 0,
            "cart_additions": 0,
            "cart_removals": 0,
            "coupon_used": False,
            "checkout_started": False,
            "purchase_completed": False,
            "total_events": len(events),
            "engagement_score": 0
        }

        for event in events:

            event_name = event.event

            features["engagement_score"] += EVENT_WEIGHTS.get(event_name, 0)

            if event_name == "search":
                features["search_count"] += 1

            elif event_name == "view_product":
                features["product_views"] += 1

            elif event_name == "compare_products":
                features["comparison_count"] += 1

            elif event_name == "read_reviews":
                features["review_reads"] += 1

            elif event_name == "add_to_cart":
                features["cart_additions"] += 1

            elif event_name == "remove_from_cart":
                features["cart_removals"] += 1

            elif event_name == "apply_coupon":
                features["coupon_used"] = True

            elif event_name == "checkout":
                features["checkout_started"] = True

            elif event_name == "purchase":
                features["purchase_completed"] = True

        return features