# Generated by Django 4.1.5 on 2023-01-28 17:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('notes', models.CharField(default='', max_length=500)),
                ('url', models.CharField(default='', max_length=150)),
                ('prep_time_minutes', models.IntegerField(default=0)),
                ('prep_time_hours', models.IntegerField(default=0)),
                ('cook_time_minutes', models.IntegerField(default=0)),
                ('cook_time_hours', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
