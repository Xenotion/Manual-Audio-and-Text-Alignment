# backend

### activate virtual environment (must be done for every terminal opened)

# windows
```
api-project/Scripts/activate
```
# mac
```
source api-project/bin/activate
```
-----
# create a new app
```
python3 manage.py startapp {app name}
```

# migration to database
```
python3 manage.py makemigrations tasks
python3 manage.py migrate
```

# run server
```
python3 manage.py runserver
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

