from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class RegisterSerializer(serializers.ModelSerializer): # Serializer for registration
    password2 = serializers.CharField(write_only=True)  # Password confirmation

    class Meta: 
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}} # Hide password in responses

    def validate(self, data): # Validation logic
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)  # Hashes password automatically
        return user


class LoginSerializer(serializers.Serializer): # Handles user login
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data): # Validates credentials using auth function
        user = authenticate(username=data['username'], password=data['password'])
        if user and user.is_active:
            data['user'] = user
            return data
        raise serializers.ValidationError("Invalid credentials.")
