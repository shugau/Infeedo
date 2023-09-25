# Setup

unzip the file and run the command npm install

Create the .env file and add the below variables

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=task

Intall postgres and create a table named Task
# Query to create the table

CREATE TABLE IF NOT EXISTS task (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
    task_type VARCHAR(255) NOT NULL,
	task_date VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP
)  

# Create Task request
--- POST request localhost:8080/task
--- body {
    "taskType": "open_tasks",
    "taskDate": "July 2023"
}

# To run the Project open it in VsCode go to the folder directory and run the command
npm run start

# Get Task request
--- GET request localhost:8080/task
--- body {
    "pageNo": "1",
    "limit": "1"
}
Here pageNo starts from 0

# update Task request
--- PUT request localhost:8080/task
--- body {
    "taskType": "open_tasks",
    "taskDate": "July 2023",
    "id": "934e58c8-ca07-455c-8268-a7fbb15cab57"
}

# metrics Task request
--- GET request to get count of individual taskType
localhost:8080/task/metrics

-- GET request to get count of individual taskType on a given date
localhost:8080/task/metrics
--- body {
    "taskDate": "July 2023"
}