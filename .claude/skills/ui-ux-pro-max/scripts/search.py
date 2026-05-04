#!/usr/bin/env python3
import sys
import json
import os
from pathlib import Path
from typing import List, Dict, Optional
import difflib

class DesignSystemSearch:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.data_dir = self.base_path / "data"
        self.data = self._load_data()

    def _load_data(self) -> Dict:
        """Load all CSV data files."""
        data = {}
        data_files = {
            'product': 'product-types.csv',
            'style': 'styles.csv',
            'color': 'colors.csv',
            'typography': 'typography.csv',
            'chart': 'charts.csv',
            'ux': 'ux-guidelines.csv',
            'landing': 'landing-patterns.csv',
            'react': 'react-best-practices.csv',
            'google-fonts': 'google-fonts.csv',
            'web': 'web-guidelines.csv',
            'prompt': 'prompt-keywords.csv',
        }

        for domain, filename in data_files.items():
            filepath = self.data_dir / filename
            if filepath.exists():
                data[domain] = self._parse_csv(filepath)
            else:
                data[domain] = []

        return data

    def _parse_csv(self, filepath: Path) -> List[Dict]:
        """Parse CSV file into list of dicts."""
        records = []
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                if len(lines) < 2:
                    return records

                headers = [h.strip() for h in lines[0].split('|') if h.strip()]
                for line in lines[1:]:
                    if line.strip().startswith('|'):
                        values = [v.strip() for v in line.split('|')[1:-1]]
                        if len(values) == len(headers):
                            record = dict(zip(headers, values))
                            records.append(record)
        except Exception as e:
            print(f"Error parsing {filepath}: {e}", file=sys.stderr)

        return records

    def _score_match(self, record: Dict, keywords: List[str]) -> float:
        """Score how well a record matches keywords."""
        score = 0.0
        record_text = ' '.join(str(v).lower() for v in record.values())

        for keyword in keywords:
            keyword_lower = keyword.lower()
            if keyword_lower in record_text:
                score += 2.0
            else:
                # Fuzzy match
                ratio = difflib.SequenceMatcher(None, keyword_lower, record_text).ratio()
                score += ratio

        return score

    def search(self, query: str, domain: Optional[str] = None,
               max_results: int = 5, design_system: bool = False) -> Dict:
        """Search design system data."""
        keywords = query.lower().split()
        results = {}

        # Determine which domains to search
        domains_to_search = [domain] if domain else list(self.data.keys())

        for d in domains_to_search:
            if d not in self.data:
                continue

            records = self.data[d]
            scored = [(self._score_match(r, keywords), r) for r in records]
            scored = [(s, r) for s, r in scored if s > 0.0]
            scored.sort(reverse=True, key=lambda x: x[0])

            results[d] = [r for _, r in scored[:max_results]]

        return results

    def generate_design_system(self, query: str, project_name: str = "Project") -> str:
        """Generate a complete design system recommendation."""
        keywords = query.lower().split()

        # Search multiple domains
        product_results = self.search(query, domain='product', max_results=3)
        style_results = self.search(query, domain='style', max_results=3)
        color_results = self.search(query, domain='color', max_results=1)
        typography_results = self.search(query, domain='typography', max_results=1)
        ux_results = self.search(query, domain='ux', max_results=3)

        output = []
        output.append(f"┌─ UI/UX Design System: {project_name} ─┐")
        output.append("")

        # Product Type
        if product_results['product']:
            output.append("📦 PRODUCT TYPE")
            for item in product_results['product'][:1]:
                output.append(f"  • {item.get('name', 'N/A')}")
                if 'characteristics' in item:
                    output.append(f"    Characteristics: {item['characteristics']}")
            output.append("")

        # Style
        if style_results['style']:
            output.append("🎨 STYLE")
            for item in style_results['style'][:1]:
                output.append(f"  • {item.get('name', 'N/A')}")
                if 'characteristics' in item:
                    output.append(f"    {item['characteristics']}")
            output.append("")

        # Colors
        if color_results['color']:
            output.append("🌈 COLOR PALETTE")
            for item in color_results['color'][:1]:
                output.append(f"  • {item.get('name', 'N/A')}")
                if 'palette' in item:
                    output.append(f"    {item['palette']}")
            output.append("")

        # Typography
        if typography_results['typography']:
            output.append("✍️ TYPOGRAPHY")
            for item in typography_results['typography'][:1]:
                output.append(f"  • {item.get('pairing', 'N/A')}")
                if 'body_font' in item:
                    output.append(f"    Body: {item['body_font']}")
                if 'heading_font' in item:
                    output.append(f"    Heading: {item['heading_font']}")
            output.append("")

        # UX Guidelines
        if ux_results['ux']:
            output.append("✓ KEY UX GUIDELINES")
            for item in ux_results['ux'][:3]:
                guideline = item.get('guideline', 'N/A')
                output.append(f"  • {guideline}")
            output.append("")

        output.append("└" + "─" * 50 + "┘")

        return "\n".join(output)

    def format_output(self, results: Dict, format_type: str = "text") -> str:
        """Format search results."""
        if format_type == "json":
            return json.dumps(results, indent=2)

        lines = []
        for domain, items in results.items():
            if items:
                lines.append(f"\n{'=' * 50}")
                lines.append(f"Domain: {domain.upper()}")
                lines.append(f"{'=' * 50}")
                for i, item in enumerate(items, 1):
                    lines.append(f"\n{i}. {json.dumps(item, indent=2)}")

        return "\n".join(lines)

def main():
    if len(sys.argv) < 2:
        print("Usage: python search.py <query> [--domain <domain>] [--design-system] [--persist] [-n <max_results>] [-p <project_name>]")
        sys.exit(1)

    # Parse arguments
    query = sys.argv[1]
    domain = None
    max_results = 5
    design_system = False
    persist = False
    project_name = "Project"
    format_type = "text"

    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--domain' and i + 1 < len(sys.argv):
            domain = sys.argv[i + 1]
            i += 2
        elif sys.argv[i] == '--design-system':
            design_system = True
            i += 1
        elif sys.argv[i] == '--persist':
            persist = True
            i += 1
        elif sys.argv[i] == '-n' and i + 1 < len(sys.argv):
            max_results = int(sys.argv[i + 1])
            i += 2
        elif sys.argv[i] == '-p' and i + 1 < len(sys.argv):
            project_name = sys.argv[i + 1]
            i += 2
        elif sys.argv[i] == '-f' and i + 1 < len(sys.argv):
            format_type = sys.argv[i + 1]
            i += 2
        else:
            i += 1

    # Initialize search engine
    script_dir = Path(__file__).parent
    search = DesignSystemSearch(script_dir.parent)

    # Execute search
    if design_system:
        output = search.generate_design_system(query, project_name)
        print(output)
    else:
        results = search.search(query, domain=domain, max_results=max_results)
        formatted = search.format_output(results, format_type=format_type)
        print(formatted)

if __name__ == "__main__":
    main()
