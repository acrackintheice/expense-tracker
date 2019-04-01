from rest_framework import authentication
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from google.oauth2 import id_token
from google.auth.transport import requests

User = get_user_model()

class GoogleIdTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = self.get_token(request)

        if token is None:
            return None

        googleInfo = self.validate(token)
        try: 
            user = User.objects.get(googleId=googleInfo['sub'])
        except User.DoesNotExist:
            # difference between an existing and a nonexistent user (#20760).
            user = User.objects.create_user(
                username=googleInfo['name'], 
                email = googleInfo['email'], 
                password='')
            user.googleId = googleInfo['sub']
            user.save()

        return (user, None)

    def get_token(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if auth_header is not None:
            auth_split = auth_header.split()
            if len(auth_split) != 2:
                exceptions.AuthenticationFailed('Invalid authorization token: ' + request.META.get('HTTP_AUTHORIZATION'))
            else:
                if auth_split[0] == 'Bearer':
                    return auth_split[1]
                else: 
                    return None 
        else:
            return None

    def validate(self, token):
        try:
            id_info = id_token.verify_oauth2_token(token, requests.Request(), 
                '707870445329-iu74qui75vgsh1kthhnit54unadb9tva.apps.googleusercontent.com')

            if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
        except ValueError:
            raise exceptions.AuthenticationFailed('Failed to verify the id token: ' + token)
        else:
            return id_info
