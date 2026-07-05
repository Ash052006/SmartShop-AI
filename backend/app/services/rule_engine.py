import json
from pathlib import Path


RULES_DIR = Path("app/rules")


class RuleEngine:

    @staticmethod
    def load_rules():

        rules = []

        for file in RULES_DIR.glob("*.json"):

            with open(file, "r") as f:
                rules.append(json.load(f))

        return rules
    @staticmethod
    def check_mandatory(features, mandatory):

        for key, value in mandatory.items():

            feature = features.get(key)

            if isinstance(value, dict):

                if "min" in value:

                    if feature < value["min"]:
                        return False

                if "max" in value:

                    if feature > value["max"]:
                        return False

            else:

                if feature != value:
                    return False

        return True
    @staticmethod
    def count_optional(features, optional):

        matched = 0

        total = len(optional)

        for key, value in optional.items():

            feature = features.get(key)

            if isinstance(value, dict):

                if "min" in value:

                    if feature >= value["min"]:
                        matched += 1

                elif "max" in value:

                    if feature <= value["max"]:
                        matched += 1

            else:

                if feature == value:
                    matched += 1

        return matched, total
    @staticmethod
    def evaluate(features):

        matched_rules = []

        rules = RuleEngine.load_rules()

        for rule in rules:

            mandatory = rule["conditions"]["mandatory"]

            if not RuleEngine.check_mandatory(features, mandatory):
                continue

            optional = rule["conditions"]["optional"]

            matched, total = RuleEngine.count_optional(
                features,
                optional
            )

            matched_rules.append({

                "rule_name": rule["name"],

                "shopper_state": rule["shopper_state"],

                "persona": rule["persona"],

                "priority": rule["priority"],

                "base_score": rule["base_score"],

                "optional_matches": matched,

                "optional_total": total,

                "description": rule["description"],

                "recommendations": rule["recommendations"],

                "evidence": rule["evidence"]

            })

        return matched_rules