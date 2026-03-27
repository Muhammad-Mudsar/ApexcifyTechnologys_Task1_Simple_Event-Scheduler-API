from django import forms
from django.contrib.auth.models import User
from django.utils.translation import gettext, gettext_lazy as _
from .models import Events
from django.utils import timezone

from django.utils.safestring import mark_safe
from django.contrib.auth.forms import UserCreationForm


class EventsForm(forms.ModelForm):
    class Meta:
        model = Events
        fields = ["title", "category", "date", "description"]

        widgets = {
            "title": forms.TextInput(
                attrs={
                    "class": "form-control form-label",
                    "label": "Event Title *",
                    "id": "eventTitle",
                    "placeholder": "e.g. Tech Conference 2026",
                    # "help_text": "Make it catchy and descriptive",
                }
            ),
            "category": forms.Select(
                attrs={
                    "class": "form-control",
                    "id": "eventCategory",
                    "label": "Category *",
                    # "help_text": "Select Category",
                }
            ),
            "date": forms.DateInput(
                attrs={
                    "class": "form-control",
                    "type": "date",
                    "label": "Date *",
                    "id": "eventDate",
                }
            ),
            "description": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "label": "Description *",
                    "placeholder": "Describe your event in detail...",
                    "rows": 4,
                    "id": "eventDescription",
                    # "help_text": "Help people understand what your event is about",
                }
            ),
        }

    def clean_date(self):
        date = self.cleaned_data["date"]
        if date < timezone.now().date():
            raise forms.ValidationError("Event date cannot be in the past.")
        return date

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class signupForm(UserCreationForm):  # FIX 1: 'class' not 'def'

    username = forms.CharField(
        label="Username",
        max_length=20,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "User Name",
            }
        ),
        required=True,
    )

    first_name = forms.CharField(
        label="First Name",
        max_length=20,
        widget=forms.TextInput(
            attrs={
                "class": "form-control",
                "placeholder": "First Name",  # Fixed typo: 'Frst' → 'First'
            }
        ),
        required=True,
    )
    last_name = forms.CharField(
        label="Last Name",
        max_length=20,
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "Last Name"}
        ),
        required=True,
    )
    email = forms.EmailField(
        label="Your Email",
        widget=forms.TextInput(
            attrs={"class": "form-control", "placeholder": "Your Email"}
        ),
        required=True,
    )

    password1 = forms.CharField(
        label="Password", widget=forms.PasswordInput(attrs={"class": "form-control"})
    )

    password2 = forms.CharField(
        label="Confirm Password",
        widget=forms.PasswordInput(attrs={"class": "form-control"}),
        required=True,
    )


class Meta:
    model = User
    fields = ("username", "first_name", "last_name", "email", "password1", "password2")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # for fieldname in ["username", "password1", "password2"]:
        #     self.fields[fieldname].help_text = None
        #     self.fields[fieldname].widget.attrs.update({"class": "form-control"})

        if "username" in self.fields:
            self.fields["username"].widget.attrs.update(
                {"class": "form-control", "placeholder": "User Name"}
            )
            self.fields["username"].label = ""
            self.fields["username"].help_text = None

        if "password1" in self.fields:
            self.fields["password1"].widget.attrs.update(
                {"class": "form-control", "placeholder": "Password"}
            )
            self.fields["password1"].label = ""
            self.fields["password1"].help_text = None

        if "password2" in self.fields:
            self.fields["password2"].widget.attrs.update(
                {"class": "form-control", "placeholder": "Confirm Password"}
            )
            self.fields["password2"].label = ""
            self.fields["password2"].help_text = None


# class CustomerProfileForm(forms.ModelForm):
#     class Meta:
#         model = Customer
#         fields = ['name','phone','locality','city','zipcode','province']
#         widgets = {'name':forms.TextInput( attrs={'class':'form-control'}),
#                  'phone':forms.TextInput(attrs={'class':'form-control'}),
#                  'locality':forms.TextInput(attrs={'class':'form-control'}),
#                  'city':forms.TextInput(attrs={'class':'form-control'}),
#                  'zipcode':forms.NumberInput(attrs={'class':'form-control'}),
#                  'province':forms.Select(attrs={'class':'form-control'})

#                  }
