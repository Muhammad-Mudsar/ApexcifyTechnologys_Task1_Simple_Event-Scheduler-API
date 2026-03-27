from django.contrib import admin
from .models import Events

# Register your models here.

# admin.site.register(Events)


@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "date", "description", "user", "category"]
    list_filter = ["id", "title", "user"]
