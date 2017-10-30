### Sample API Call:
Before URI Encoding:  
`curl --get "https://data.ny.gov/resource/hvwh-qtfg.json?$where=within_circle(station_location,40.758853,-73.929046,1000)"`  
After URI Encoding:  
`curl --get "https://data.ny.gov/resource/hvwh-qtfg.json?%24where=within_circle(entrance_location%2C40.758853%2C-73.929046%2C1000)"`

### Sample API info returned:
```
[{
    "ada": "FALSE",
    "corner": "SW",
    "division": "BMT",
    "east_west_street": "36th Ave",
    "entrance_latitude": "40.756478",
    "entrance_location": {
        "type": "Point",
        "coordinates": [-73.929993, 40.756478]
        },
    "entrance_longitude": "-73.929993",
    "entrance_type": "Stair",
    "entry": "YES",
    "free_crossover": "TRUE",
    "line": "Astoria",
    "north_south_street": "31st St",
    "route1": "N",
    "route2": "Q",
    "staffing": "FULL",
    "station_latitude": "40.756804",
    "station_location": {
        "type": "Point",
        "coordinates": [-73.929575, 40.756804]
        },
    "station_longitude": "-73.929575",
    "station_name": "36 Av-Washington Av",
    "vending": "YES"
},
...more records ...
]
```
