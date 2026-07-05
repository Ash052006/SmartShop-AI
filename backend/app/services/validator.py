from app.core.event_types import VALID_EVENTS


class EventValidator:

    @staticmethod
    def validate(events):

        invalid_events = []

        for event in events:

            if event.event not in VALID_EVENTS:
                invalid_events.append(event.event)

        if invalid_events:
            return False, invalid_events

        return True, []