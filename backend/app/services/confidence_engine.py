from app.utils.config_loader import ConfigLoader


class ConfidenceEngine:

    @staticmethod
    def calculate(winner):

        if winner is None:
            return 0

        config = ConfigLoader.get()

        max_confidence = config["max_confidence"]

        final_score = winner["score_breakdown"]["final_score"]

        return min(final_score, max_confidence)