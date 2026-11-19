from llama_index.core import Document
from llama_index.core.node_parser import MarkdownNodeParser
from llama_index.core.schema import BaseNode


def _has_body(node: BaseNode) -> bool:
    lines = node.get_content().strip().splitlines()

    return len(lines) > 1


def chunk_documents(documents: list[Document]) -> list[BaseNode]:
    parser = MarkdownNodeParser(include_metadata=False, include_prev_next_rel=False)
    nodes: list[BaseNode] = []

    for doc in documents:
        doc_nodes = parser.get_nodes_from_documents([doc])
        doc_nodes = [n for n in doc_nodes if _has_body(n)]

        for i, node in enumerate(doc_nodes):
            node.id_ = f"{doc.id_}-{i}"

        nodes.extend(doc_nodes)

    return nodes
