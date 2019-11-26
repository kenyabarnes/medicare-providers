from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.shortcuts import render
from vizApp.models import Provider
# Create your views here.

def index(request):
    template = loader.get_template('slash/index.html')
    context = {'message': 'kenya'}
    return render(request, 'slash/index.html', context)

def data_by_state_and_year(request):
    stateParam = request.GET['state']
    yearParam = request.GET['year']
    yearRange = findRange(yearParam)
    governmentCount = Provider.objects.filter(
        type="Government", 
        state=stateParam, 
        year__gte=yearRange[0], 
        year__lte=yearRange[1]).count()
    proprietaryCount = Provider.objects.filter(
        type="Proprietary", 
        state=stateParam, 
        year__gte=yearRange[0], 
        year__lte=yearRange[1]).count()
    nonprofitCount = Provider.objects.filter(
        type="Non-Profit", 
        state=stateParam, 
        year__gte=yearRange[0], 
        year__lte=yearRange[1]).count()

    json = {"nodes": [
                { "id" : 0,"name" : "GOVERNMENT", "value":governmentCount, "group": 0},
                { "id" : 1,"name" : "PROPRIETARY", "value":proprietaryCount, "group": 0},
                { "id" : 2,"name" : "NON-PROFIT", "value":nonprofitCount, "group": 0}
                    ],
            "links" : [
                {"source": 0, "target": 1},
                {"source": 1, "target": 2},
                {"source": 2, "target": 0}
                    ]
    }
    return JsonResponse(json)

def data_by_state(request):
    stateParam = request.GET['state']

    governmentCount = Provider.objects.filter(
        type="Government", 
        state=stateParam).count()
    proprietaryCount = Provider.objects.filter(
        type="Proprietary", 
        state=stateParam).count()
    nonprofitCount = Provider.objects.filter(
        type="Non-Profit", 
        state=stateParam).count()

    json = {"nodes": [
                { "id" : 0,"name" : "GOVERNMENT", "value":governmentCount, "group": 0},
                { "id" : 1,"name" : "PROPRIETARY", "value":proprietaryCount, "group": 0},
                { "id" : 2,"name" : "NON-PROFIT", "value":nonprofitCount, "group": 0}
                    ],
            "links" : [
                {"source": 0, "target": 1},
                {"source": 1, "target": 2},
                {"source": 2, "target": 0}
                    ]
    }
    return JsonResponse(json)

def data_by_year(request):
    yearParam = request.GET['year']
    yearRange = findRange(yearParam)
    governmentCount = Provider.objects.filter(
        type="Government", 
        year__gte=yearRange[0], 
        year__lte=yearRange[1]).count()
    proprietaryCount = Provider.objects.filter(
        type="Proprietary", 
        year__gte=yearRange[0], 
        year__lte=yearRange[1]).count()
    nonprofitCount = Provider.objects.filter(
        type="Non-Profit", 
        year__gte=yearRange[0], 
        year__lte=yearRange[1]).count()

    json = {"nodes": [
                { "id" : 0,"name" : "GOVERNMENT", "value":governmentCount, "group": 0},
                { "id" : 1,"name" : "PROPRIETARY", "value":proprietaryCount, "group": 0},
                { "id" : 2,"name" : "NON-PROFIT", "value":nonprofitCount, "group": 0}
                    ],
            "links" : [
                {"source": 0, "target": 1},
                {"source": 1, "target": 2},
                {"source": 2, "target": 0}
                    ]
    }
    return JsonResponse(json)

def data_all(request):
    governmentCount = Provider.objects.filter(
        type="Government").count()
    proprietaryCount = Provider.objects.filter(
        type="Proprietary").count()
    nonprofitCount = Provider.objects.filter(
        type="Non-Profit").count()

    json = {"nodes": [
                { "id" : 0,"name" : "GOVERNMENT", "value":governmentCount, "group": 0},
                { "id" : 1,"name" : "PROPRIETARY", "value":proprietaryCount, "group": 0},
                { "id" : 2,"name" : "NON-PROFIT", "value":nonprofitCount, "group": 0}
                    ],
            "links" : [
                {"source": 0, "target": 1},
                {"source": 1, "target": 2},
                {"source": 2, "target": 0}
                    ]
    }
    return JsonResponse(json)

def stateById(request):
    stateId = request.GET['stateId']
    
    json = {
        "result": searchState(stateId)
    }
    return JsonResponse(json)

def findRange(year):
    bins = [
        1965, 1970, 1975, 1980,
        1985, 1990, 1995, 2000,
        2005, 2010, 2015, 2020
    ]
    for index, value in enumerate(bins):
        if int(year) >= value and int(year) < bins[index + 1]:
            return [value, bins[index+1]]
    return[year, year]

def searchState(id):
    json = {
        "1" : {"stateName" : "Alabama", "abbr" : "AL"},
        "2" : {"stateName" : "Alaska", "abbr" : "AK"},
        "4" : {"stateName" : "Arizona", "abbr" : "AZ"},
        "5" : {"stateName" : "Arkansas", "abbr" : "AR"},
        "6" : {"stateName" : "California", "abbr" : "CA"},
        "8" : {"stateName" : "Colorado", "abbr" : "CO"},
        "9" : {"stateName" : "Conneticut", "abbr" : "CT"},
        "10" : {"stateName" : "Delaware", "abbr" : "DE"},
        "12" : {"stateName" : "Florida", "abbr" : "FL"},
        "13" : {"stateName" : "Georgia", "abbr" : "GA"},
        "15" : {"stateName" : "Hawaii", "abbr" : "HI"},
        "16" : {"stateName" : "Idaho", "abbr" : "ID"},
        "17" : {"stateName" : "Illinois", "abbr" : "IL"},
        "18" : {"stateName" : "Indiana", "abbr" : "IN"},
        "19" : {"stateName" : "Iowa", "abbr" : "IA"},
        "20" : {"stateName" : "Kansas", "abbr" : "KS"},
        "21" : {"stateName" : "Kentucky", "abbr" : "KY"},
        "22" : {"stateName" : "Louisiana", "abbr" : "LA"},
        "23" : {"stateName" : "Maine", "abbr" : "ME"},
        "24" : {"stateName" : "Mayland", "abbr" : "MD"},
        "25" : {"stateName" : "Massachusetts", "abbr" : "MA"},
        "26" : {"stateName" : "Michigan", "abbr" : "MI"},
        "27" : {"stateName" : "Minnesota", "abbr" : "MN"},
        "28" : {"stateName" : "Mississippi", "abbr" : "MS"},
        "29" : {"stateName" : "Missouri", "abbr" : "MO"},
        "30" : {"stateName" : "Montana", "abbr" : "MT"},
        "31" : {"stateName" : "Nebraska", "abbr" : "NE"},
        "32" : {"stateName" : "Nevada", "abbr" : "NV"},
        "33" : {"stateName" : "New Hampshire", "abbr" : "NH"},
        "34" : {"stateName" : "New Jersey", "abbr" : "NJ"},
        "35" : {"stateName" : "New Mexico", "abbr" : "NM"},
        "36" : {"stateName" : "New York", "abbr" : "NY"},
        "37" : {"stateName" : "North Carolina", "abbr" : "NC"},
        "38" : {"stateName" : "North Dakota", "abbr" : "ND"},
        "39" : {"stateName" : "Ohio", "abbr" : "OH"},
        "40" : {"stateName" : "Oklahoma", "abbr" : "OK"},
        "41" : {"stateName" : "Oregon", "abbr" : "OR"},
        "42" : {"stateName" : "Pennsylvania", "abbr" : "PA"},
        "44" : {"stateName" : "Rhode Island", "abbr" : "RI"},
        "48" : {"stateName" : "South Carolina", "abbr" : "SC"},
        "46" : {"stateName" : "South Dakota", "abbr" : "SD"},
        "47" : {"stateName" : "Tennessee", "abbr" : "TN"},
        "48" : {"stateName" : "Texas", "abbr" : "TX"},
        "49" : {"stateName" : "Utah", "abbr" : "UT"},
        "50" : {"stateName" : "Vermont", "abbr" : "VT"},
        "51" : {"stateName" : "Virginia", "abbr" : "VA"},
        "53" : {"stateName" : "Washington", "abbr": "WA"},
        "54" : {"stateName" : "West Virginia", "abbr" : "WV"},
        "55" : {"stateName" : "Wisconsin", "abbr" : "WI"},
        "56" : {"stateName" : "Wyoming", "abbr" : "WY"}
    }

    return json[id]