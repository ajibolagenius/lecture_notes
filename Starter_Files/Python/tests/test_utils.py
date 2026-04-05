# tests/test_utils.py
# ============================================================
# Deejoft Coding School | Python Course Starter
# Example test file — replace with your own tests
# ============================================================
# Run with:  uv run pytest -v
#            uv run pytest --cov=utils
# ============================================================
import pytest
from utils import format_naira, read_json, write_json
from pathlib import Path
import tempfile
import os


class TestFormatNaira:
    def test_whole_number(self):
        assert format_naira(79999) == '₦79,999.00'

    def test_decimal(self):
        assert format_naira(1234.5) == '₦1,234.50'

    def test_zero(self):
        assert format_naira(0) == '₦0.00'

    def test_large_number(self):
        assert format_naira(1_000_000) == '₦1,000,000.00'


class TestReadWriteJson:
    def test_roundtrip(self, tmp_path):
        """Data written then read back should be identical."""
        data = [{'name': 'Ada', 'score': 95}]
        path = tmp_path / 'test.json'
        write_json(path, data)
        result = read_json(path)
        assert result == data

    def test_missing_file_returns_default(self, tmp_path):
        result = read_json(tmp_path / 'nonexistent.json', default=[])
        assert result == []

    def test_creates_parent_directories(self, tmp_path):
        path = tmp_path / 'deep' / 'nested' / 'file.json'
        write_json(path, {'ok': True})
        assert path.exists()


# ── Add your own tests below ──────────────────────────────────
