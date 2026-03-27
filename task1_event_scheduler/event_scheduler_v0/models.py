from django.db import models
from django.core.validators import ValidationError
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse


# Create your models here.


# "Validate that date is not in the past"
def validate_date(value):
    if value < timezone.now().date():
        raise ValidationError("Event date cannot be in the past.")


class Events(models.Model):
    EVENT_CATEGORIES = [
        ("MEETING", "Meeting"),
        ("WORKSHOP", "Workshop"),
        ("CONFERENCE", "Conference"),
        ("SOCIAL", "Social Gathering"),
        ("OTHER", "Other"),
    ]

    id = models.AutoField(primary_key=True)  # id feld is auto gen by dj
    title = models.CharField(max_length=200)
    date = models.DateField(validators=[validate_date])
    description = models.TextField(blank=True)
    category = models.CharField(
        max_length=20, choices=EVENT_CATEGORIES, default="OTHER"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")

    # Timestamps4future reference
    # created = models.DateTimeField(auto_now_add=True)
    # updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Event"
        verbose_name_plural = "Events"
        ordering = ["date"]
        indexes = [
            models.Index(fields=["date"]),
            models.Index(fields=["user", "date"]),
        ]

    def __str__(self):
        return f"{self.title} - {self.date}"

    # "Returns the URL to access a particular event instance ve return."
    def get_absolute_url(self):
        return reverse("event-detail", args=[str(self.id)])

    # "Check if event is in the future"
    @property
    def is_upcoming(self):
        return self.date >= timezone.now().date()

    # "Calculate days until the event"
    @property
    def days_until(self):
        if self.is_upcoming:
            return (self.date - timezone.now().date()).days
        return 0
