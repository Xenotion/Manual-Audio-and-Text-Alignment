# Manual Audio/Text Alignment Project for C-LARA

# 2023 Semester 2 COMP30023
----
# Members
### John An
### Kevin Cui
### Sherry Sun
### Natasha Ngo
### Alex Lee
----
# How to start front end

## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## Compiles and minifies for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```
----
# How to start backend

## activate virtual environment (must be done for every terminal opened)

### windows
```
virtual_env/Scripts/activate
```
### mac
```
source virtual_env/bin/activate
```
## create a new app
```
python3 manage.py startapp {app name}
```

## migration to database
```
python3 manage.py makemigrations tasks
python3 manage.py migrate
```

## run server
```
python3 manage.py runserver
```

## run test
```
python3 manage.py test
```


