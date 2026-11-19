import logging

from .pipelines import run_ingestion


def main() -> None:
    logging.getLogger("httpx").setLevel(logging.WARNING)
    result = run_ingestion()

    print(f"Documents: {result.documents}")
    print(f"Upserted:  {result.upserted}")
    print(f"Deleted:   {result.deleted}")
    print(f"In index:  {result.vector_count}")
