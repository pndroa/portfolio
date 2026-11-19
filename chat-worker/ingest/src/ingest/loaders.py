from pathlib import Path

from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.document_converter import DocumentConverter, PdfFormatOption
from llama_index.core import Document, SimpleDirectoryReader
from llama_index.readers.docling import DoclingReader


def _file_metadata(path: str) -> dict:
    return {"source": Path(path).stem}


def _pdf_reader() -> DoclingReader:
    converter = DocumentConverter(
        format_options={
            InputFormat.PDF: PdfFormatOption(
                pipeline_options=PdfPipelineOptions(do_ocr=False)
            )
        }
    )
    return DoclingReader(
        doc_converter=converter,
        md_export_kwargs={"image_placeholder": "", "escape_html": False},
    )


def load_documents(data_dir: Path) -> list[Document]:
    reader = SimpleDirectoryReader(
        input_dir=data_dir,
        required_exts=[".pdf"],
        file_extractor={".pdf": _pdf_reader()},
        file_metadata=_file_metadata,
        raise_on_error=True,
    )
    documents = reader.load_data()

    for doc in documents:
        doc.id_ = doc.metadata.pop("source")

    return documents
