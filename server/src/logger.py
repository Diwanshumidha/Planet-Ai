import logging
import sys

logger = logging.getLogger()

formatter = logging.Formatter(fmt="%(asctime)s - %(levelname)s - %(message)s")

# Handlers
stream_handler = logging.StreamHandler(sys.stdout)

# Set Formatter
stream_handler.setFormatter(formatter)
# add handlers to logger
logger.handlers = [stream_handler]

logger.setLevel(logging.INFO)


