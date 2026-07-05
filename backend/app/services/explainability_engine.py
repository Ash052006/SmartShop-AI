class ExplainabilityEngine:

    @staticmethod
    def explain(winner):

        if winner is None:
            return []

        return winner["evidence"]