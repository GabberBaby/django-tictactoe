from django import forms
from models import Game_Name


class UserForm(forms.Form):
    # gamename = forms.ChoiceField(choices=Game_Name, widget=forms.Select())
    username = forms.CharField(widget=forms.TextInput)
