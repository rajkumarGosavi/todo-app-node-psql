# Todo app

## Setup
1. Extract the compressed file
2. Do `npm install`
3. Run `chmod +x wait-for.sh`
3. Do `docker compose up`
4. Run `docker container ls` to confirm if containers are running
5. If a simple Get tasks API is failing or log shows relation or db does not exists, then, we might need to login to the postgres container.
    - do `psql -d todo -U user`
    - run the SQL queries in `db/init.sql` manually and it will setup the relation.


## Create a Task
curl -X POST -H "Content-Type: application/json" \
-d '{"title": "Task 1", "description": "a new task"}' \
localhost:8090/tasks

## Update a Task

### Update title
curl -X PUT -H "Content-Type: application/json" \
-d '{"title": "Task 1.1"}' \
localhost:8090/tasks/1

### Update title and description
curl -X PUT -H "Content-Type: application/json" \
-d '{"title": "Task 1.2", "description": "a new task renewed"}' \
localhost:8090/tasks/1

### Update status
curl -X PUT -H "Content-Type: application/json" \
-d '{"status": "in_progress"}' \
localhost:8090/tasks/1

## Get Tasks

### Get all tasks (default pagination page_size = 10, page=1)
curl -X GET localhost:8090/tasks

### Get paginated tasks (default page_size = 10)
curl -XGET 'localhost:8090/tasks?page=1'

### Get paginated tasks
curl -XGET 'localhost:8090/tasks?page=1&page_size=20'

### Get paginated tasks (default page = 1)
curl -XGET 'localhost:8090/tasks?page_size=20'


## Get Metrics
curl -X GET localhost:8090/tasks/metric

### Get month specific metrics
curl -XGET 'localhost:8090/tasks/metric?month=1&year=2023'
