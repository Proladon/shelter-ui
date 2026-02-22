#!/usr/bin/env python3
"""
Quick validation for a skill directory. Checks SKILL.md frontmatter for required fields.

Usage:
    python quick_validate.py <skill_directory>
"""
import sys
import re
from pathlib import Path
import yaml


ALLOWED_PROPERTIES = {'name', 'description', 'license', 'allowed-tools', 'metadata', 'compatibility'}


def validate_skill(skill_path: str) -> tuple[bool, str]:
    p = Path(skill_path)
    skill_md = p / 'SKILL.md'
    if not skill_md.exists():
        return False, 'SKILL.md not found'

    content = skill_md.read_text(encoding='utf-8')
    if not content.startswith('---'):
        return False, 'No YAML frontmatter found'

    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not m:
        return False, 'Invalid frontmatter format'

    frontmatter_text = m.group(1)
    try:
        front = yaml.safe_load(frontmatter_text)
        if not isinstance(front, dict):
            return False, 'Frontmatter must be a YAML dictionary'
    except Exception as e:
        return False, f'Invalid YAML in frontmatter: {e}'

    unexpected = set(front.keys()) - ALLOWED_PROPERTIES
    if unexpected:
        return False, f"Unexpected key(s) in frontmatter: {', '.join(sorted(unexpected))}"

    if 'name' not in front:
        return False, "Missing 'name' in frontmatter"
    if 'description' not in front:
        return False, "Missing 'description' in frontmatter"

    name = front.get('name', '')
    if not isinstance(name, str):
        return False, 'Name must be a string'
    if not re.match(r'^[a-z0-9-]+$', name):
        return False, f"Name '{name}' should be kebab-case (lowercase, digits, hyphens)"
    if name.startswith('-') or name.endswith('-') or '--' in name:
        return False, "Name cannot start/end with hyphen or contain consecutive hyphens"
    if len(name) > 64:
        return False, 'Name is too long (max 64 chars)'

    desc = front.get('description', '')
    if not isinstance(desc, str):
        return False, 'Description must be a string'
    if '<' in desc or '>' in desc:
        return False, 'Description cannot contain < or >'
    if len(desc) > 1024:
        return False, 'Description is too long (max 1024 chars)'

    return True, 'Skill is valid!'


def main() -> None:
    if len(sys.argv) != 2:
        print('Usage: python quick_validate.py <skill_directory>')
        sys.exit(1)

    valid, msg = validate_skill(sys.argv[1])
    print(msg)
    sys.exit(0 if valid else 1)


if __name__ == '__main__':
    main()
