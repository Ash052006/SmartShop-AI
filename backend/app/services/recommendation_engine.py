class RecommendationEngine:

    @staticmethod
    def recommend(winner):

        if winner is None:
            return []

        return winner["recommendations"]