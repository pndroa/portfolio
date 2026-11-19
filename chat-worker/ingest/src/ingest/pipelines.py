from dataclasses import dataclass

from .chunking import chunk_documents
from .config import PDF_DIR
from .embeddings import embed_nodes
from .loaders import load_documents
from .vectorize import delete_ids, list_ids, upsert_nodes, wait_for_mutation


@dataclass
class IngestResult:
    documents: int
    upserted: int
    deleted: int
    vector_count: int


def run_ingestion() -> IngestResult:
    documents = load_documents(PDF_DIR)
    nodes = embed_nodes(chunk_documents(documents))

    if not nodes:
        raise ValueError("No nodes produced, refusing to sync an empty knowledge base")

    existing_ids = list_ids()
    stale_ids = existing_ids - {node.id_ for node in nodes}
    mutation_id = upsert_nodes(nodes)

    if stale_ids:
        mutation_id = delete_ids(stale_ids)

    info = wait_for_mutation(mutation_id)

    return IngestResult(
        documents=len(documents),
        upserted=len(nodes),
        deleted=len(stale_ids),
        vector_count=info["vectorCount"],
    )
