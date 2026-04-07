from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    logo = models.URLField()

    def __str__(self):
        return self.name

class IPO(models.Model):
    STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Open', 'Open'),
        ('Closed', 'Closed'),
        ('Listed', 'Listed')
    ]
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    price_band = models.CharField(max_length=50)
    open_date = models.DateField()
    close_date = models.DateField()
    issue_size = models.CharField(max_length=100)
    issue_type = models.CharField(max_length=50)
    listing_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    ipo_price = models.DecimalField(max_digits=10, decimal_places=2)
    listing_price = models.DecimalField(max_digits=10, decimal_places=2)
    listing_gain = models.DecimalField(max_digits=5, decimal_places=2)
    current_market_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_return = models.DecimalField(max_digits=5, decimal_places=2)

class Document(models.Model):
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE)
    rhp_pdf = models.URLField()
    drhp_pdf = models.URLField()

# Create your models here.
