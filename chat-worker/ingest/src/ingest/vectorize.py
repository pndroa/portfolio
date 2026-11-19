import json
import logging
import time

import httpx
from llama_index.core.schema import BaseNode

from .config import CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, VECTORIZE_INDEX

BASE_URL = (
    f"https://api.cloudflare.com/client/v4/accounts/{CLOUDFLARE_ACCOUNT_ID}"
    f"/vectorize/v2/indexes/{VECTORIZE_INDEX}"
)

HEADERS = {"Authorization": f"Bearer {CLOUDFLARE_API_TOKEN}"}
TIMEOUT = 30


def _check(response: httpx.Response) -> dict:
    if response.is_error:
        raise RuntimeError(f"Vectorize {response.status_code}: {response.text}")

    return response.json()["result"]


def _to_ndjson(nodes: list[BaseNode]) -> bytes:
    lines = []

    for node in nodes:
        assert node.embedding is not None
        record = {
            "id": node.id_,
            "values": node.embedding,
            "metadata": {"text": node.get_content()},
        }
        lines.append(json.dumps(record, ensure_ascii=False))

    return "\n".join(lines).encode()


def list_ids() -> set[str]:
    ids: set[str] = set()
    params: dict[str, str | int] = {"count": 1000}

    while True:
        response = httpx.get(
            f"{BASE_URL}/list", headers=HEADERS, params=params, timeout=TIMEOUT
        )
        result = _check(response=response)
        ids.update(vector["id"] for vector in result["vectors"])

        if not result["isTruncated"]:
            return ids

        params["cursor"] = result["nextCursor"]


def upsert_nodes(nodes: list[BaseNode]) -> str:
    response = httpx.post(
        f"{BASE_URL}/upsert",
        headers={**HEADERS, "Content-Type": "application/x-ndjson"},
        content=_to_ndjson(nodes=nodes),
        timeout=TIMEOUT,
    )

    return _check(response=response)["mutationId"]


def delete_ids(ids: set[str]) -> str:
    response = httpx.post(
        f"{BASE_URL}/delete_by_ids",
        headers=HEADERS,
        json={"ids": sorted(ids)},
        timeout=TIMEOUT,
    )

    return _check(response)["mutationId"]


def wait_for_mutation(
    mutation_id: str, timeout: float = 300, interval: float = 5
) -> dict:
    deadline = time.monotonic() + timeout
    logger = logging.getLogger(__name__)
    logger.info("Waiting for Vectorize to process mutation %s", mutation_id)

    while True:
        response = httpx.get(f"{BASE_URL}/info", headers=HEADERS, timeout=TIMEOUT)
        info = _check(response=response)

        if info.get("processedUpToMutation") == mutation_id:
            return info
        if time.monotonic() > deadline:
            raise TimeoutError(f"Mutation {mutation_id} not processed after {timeout}s")

        time.sleep(interval)
