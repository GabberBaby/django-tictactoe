from django.contrib import admin

from models import Game
from models import GameInvite

class GameAdmin(admin.ModelAdmin):
    pass

class GameInviteAdmin(admin.ModelAdmin):
    pass

admin.site.register(Game, GameAdmin)
admin.site.register(GameInvite, GameInviteAdmin)

