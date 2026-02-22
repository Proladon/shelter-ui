#!/usr/bin/env python3
"""
Simple skill initializer: creates a skill folder with a templated SKILL.md

Usage:
    python init_skill.py <skill-name> --path <output-directory>

Example:
    python init_skill.py my-skill --path ./.github/skills
"""
import sys
from pathlib import Path

SKILL_TEMPLATE = """---
name: {skill_name}
description: [TODO: Complete and informative explanation of what the skill does and when to use it.]
license: Apache-2.0
---

# {skill_title}

## Overview

[TODO: 1-2 sentences explaining what this skill enables]

## Resources

- scripts/
- references/
- assets/
"""

EXAMPLE_SCRIPT = '''#!/usr/bin/env python3
"""
Example helper script for {skill_name}
"""
def main():
    print("This is an example script for {skill_name}")

if __name__ == '__main__':
    main()
'''


def title_case_skill_name(skill_name: str) -> str:
    return ' '.join(word.capitalize() for word in skill_name.split('-'))


def init_skill(skill_name: str, output_path: str) -> Path | None:
    skill_dir = Path(output_path).resolve() / skill_name
    if skill_dir.exists():
        print(f"❌ Error: Skill directory already exists: {skill_dir}")
        return None

    try:
        skill_dir.mkdir(parents=True, exist_ok=False)
        print(f"✅ Created skill directory: {skill_dir}")
    except Exception as e:
        print(f"❌ Error creating directory: {e}")
        return None

    skill_title = title_case_skill_name(skill_name)
    try:
        (skill_dir / 'SKILL.md').write_text(SKILL_TEMPLATE.format(skill_name=skill_name, skill_title=skill_title))
        print("✅ Created SKILL.md")

        scripts_dir = skill_dir / 'scripts'
        scripts_dir.mkdir(exist_ok=True)
        (scripts_dir / 'example.py').write_text(EXAMPLE_SCRIPT.format(skill_name=skill_name))
        print("✅ Created scripts/example.py")

        references_dir = skill_dir / 'references'
        references_dir.mkdir(exist_ok=True)
        (references_dir / 'README.md').write_text(f"# References for {skill_title}\n\nReplace with detailed docs.")
        print("✅ Created references/README.md")

        assets_dir = skill_dir / 'assets'
        assets_dir.mkdir(exist_ok=True)
        (assets_dir / 'example_asset.txt').write_text("Example asset placeholder")
        print("✅ Created assets/example_asset.txt")

    except Exception as e:
        print(f"❌ Error creating skill files: {e}")
        return None

    print(f"\n✅ Skill '{skill_name}' initialized at {skill_dir}")
    return skill_dir


def main() -> None:
    if len(sys.argv) < 4 or sys.argv[2] != '--path':
        print("Usage: init_skill.py <skill-name> --path <path>")
        sys.exit(1)

    skill_name = sys.argv[1]
    out_path = sys.argv[3]
    init_skill(skill_name, out_path)


if __name__ == '__main__':
    main()
