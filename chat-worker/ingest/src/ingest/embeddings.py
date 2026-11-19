from llama_index.core.schema import BaseNode
from llama_index.embeddings.cloudflare_workersai import CloudflareEmbedding

from .config import (
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_API_TOKEN,
    EMBED_DIMENSIONS,
    EMBED_MODEL,
)


def get_embed_model() -> CloudflareEmbedding:
    return CloudflareEmbedding(
        account_id=CLOUDFLARE_ACCOUNT_ID,
        auth_token=CLOUDFLARE_API_TOKEN,
        model=EMBED_MODEL,
    )


def embed_nodes(nodes: list[BaseNode]) -> list[BaseNode]:
    embed_model = get_embed_model()
    embed_model(nodes)

    for node in nodes:
        if node.embedding is None or len(node.embedding) != EMBED_DIMENSIONS:
            raise ValueError(
                f"Node {node.id_} has no Valid {EMBED_DIMENSIONS}-dim embedding"
            )

    return nodes
