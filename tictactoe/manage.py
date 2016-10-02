#!/usr/bin/env python

import os, sys


# sys.path.insert(0, os.path.join(settings.PROJECT_ROOT, "apps"))
# from tictactoe import settings

if __name__ == "__main__":
    # execute_manager(settings)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
