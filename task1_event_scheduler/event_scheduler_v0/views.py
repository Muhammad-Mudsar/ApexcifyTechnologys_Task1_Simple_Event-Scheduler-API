from django.shortcuts import render, redirect
from django.views import View
from .forms import EventsForm, signupForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import Events
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


# Create your views here.
#  POST /events – Add a new event

""""
# App Home Page
"""


def index(request):

    return render(request, "event_scheduler_v0/index.html")
    # dict key:value  ,above key=>'title'


""""
# GET /events – List all events
# if user authenticated then view user related events otherwise all events because we need to pass all events sorted by date
# ( @Requirement)

"""


def events(request):
    if request.user.is_authenticated:
        events = Events.objects.all().order_by("-date").filter(user=request.user)
        # (new 1st user specific Events)

        return render(request, "event_scheduler_v0/events.html", {"events": events})

    else:
        events = Events.objects.all().order_by("-date")  # (descending - new 1st)
    return render(request, "event_scheduler_v0/events.html", {"events": events})


@method_decorator(login_required, name="dispatch")
class create(View):
    def get(self, request):
        form = EventsForm()
        return render(
            request,
            "event_scheduler_v0/schedule-event.html",
            {"form": form},
        )

    def post(self, request):
        form = EventsForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.user = request.user
            event.save()
            messages.success(request, "New Event Scheduled Successfully!")
        else:
            return render(
                request, "event_scheduler_v0/schedule-event.html", {"form": form}
            )

        return render(request, "event_scheduler_v0/index.html", {"form": form})
        # pass blank form


# def login_user(request):
#     if request.method == "POST":
#         username = request.POST.get("username")
#         password = request.POST.get("password")
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             messages.success(request, "You Have Been Logged In Successfully")
#             return redirect("index")
#         else:
#             print(messages.error)
#             messages.error(request, "Invalid username or password")
#             return redirect("login")
#     else:
#         return render(request, "event_scheduler_v0/login.html")


# user  login
def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "").strip()

        if not username or not password:
            messages.error(request, "Both username and password are required.")
            return render(request, "event_scheduler_v0/login.html")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, "You have been logged in successfully.")
            return redirect("index")
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, "event_scheduler_v0/login.html")
    else:
        return render(request, "event_scheduler_v0/login.html")


def logout_user(request):
    logout(request)
    messages.success(request, "You Are Now LogedOut")
    return redirect("index")


def signup(request):
    if request.method == "POST":
        form = signupForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password1")
            user = authenticate(username=username, password=password)
            messages.success(request, "You Are Now Registered")
            login(request, user)
        # redirect('login')
    else:
        form = signupForm()
    return render(request, "event_scheduler_v0/register.html", {"form": form})
