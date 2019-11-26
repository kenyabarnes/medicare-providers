import re
from vizApp.models import Provider
csv = open('static/nodes/provider_type_year.txt')
i = 1
for line in csv:
    state, name, type, date, year = re.split(r'\t+', line)
    new_provider = Provider(i, state, name, type, year)
    print(new_provider)
    new_provider.save()
    i = i + 1
