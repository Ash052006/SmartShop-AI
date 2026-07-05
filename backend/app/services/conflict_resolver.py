class ConflictResolver:

    OPTIONAL_MATCH_BONUS = 5
    PRIORITY_MULTIPLIER = 2

    @staticmethod
    def resolve(matched_rules, engagement_score):

        if not matched_rules:
            return None

        best_rule = None
        highest_score = -1

        for rule in matched_rules:

            optional_bonus = (
                rule["optional_matches"]
                * ConflictResolver.OPTIONAL_MATCH_BONUS
            )

            engagement_bonus = min(
                engagement_score // 5,
                10
            )

            priority_bonus = (
                rule["priority"]["level"]
                * ConflictResolver.PRIORITY_MULTIPLIER
            )

            final_score = (
                rule["base_score"]
                + optional_bonus
                + engagement_bonus
                + priority_bonus
            )

            rule["score_breakdown"] = {

                "base_score": rule["base_score"],

                "optional_bonus": optional_bonus,

                "engagement_bonus": engagement_bonus,

                "priority_bonus": priority_bonus,

                "final_score": final_score
            }

            if final_score > highest_score:

                highest_score = final_score

                best_rule = rule

        return best_rule