import json
from pathlib import Path

CONFIG_PATH = Path("app/config/engine_config.json")


class ConfigLoader:

    _config = None

    @staticmethod
    def get():

        if ConfigLoader._config is None:
            with open(CONFIG_PATH, "r") as file:
                ConfigLoader._config = json.load(file)

        return ConfigLoader._config