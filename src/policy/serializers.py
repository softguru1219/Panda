from rest_framework import serializers
import policy.models as models


class PolicySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Policy
        fields = '__all__'

