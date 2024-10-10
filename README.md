# Web Scraper App

This is a simple **Web Scraper Application** built using **Node.js** and **Sequelize** ORM for database interaction. The app is designed to handle scraping tasks, track them in a database, and update their status as they are processed.

## Features

- **Web Scrapping**: Summarize the text content from the given URL using either OpenAI, Claude or Hugging Face LLM's.
- **Job Queueing**: Queue jobs process text content scraping and summarize it to text every 1 minute.
- **Job Creation**: Create new scraping jobs with URLs to be scraped.
- **Job Updating**: Update job status after scraping (success or failure) with optional error messages.
- **Database Integration**: Uses Sequelize ORM to interact with a SQL-based database.
- **Error Handling**: Includes basic error handling to ensure graceful failure and proper database connection management.

## Technologies

- **Node.js**: Server-side JavaScript runtime.
- **PostgreSQL / MySQL / SQLite**: You can configure Sequelize to use your preferred SQL database.
- **Docker** : You can containerize the app using Docker.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sharkmaster999/web-scraper-app.git
   cd web-scraper-app

2. Create new environment setup file:
   ```bash
   cp .env.sample .env

3. Setup your Docker Desktop and run this command:
   ```bash
   docker compose up -d

4. (Optional) Alternatively you can setup Red Hat Podman Desktop and run the command below:
   ```bash
   podman compose up -d

![podman compose up](https://github.com/sharkmaster999/web-scrapper-app/blob/master/images/podman-compose-up.png?raw=true)


5. Make sure that every containers are running.

![containers](https://github.com/sharkmaster999/web-scrapper-app/blob/master/images/containers.png?raw=true)


6. Test the web scrapper app to see if the project is fully setup via http://localhost:3000.

7. To run the LLM, provide the API key in the `.env` file. For this project I use OpenAI but you can provide API keys as well with Claude or Hugging Face LLM's.

## API Reference

### Create new job

![create job](https://github.com/sharkmaster999/web-scrapper-app/blob/master/images/create-job.png?raw=true)

#### Request:

```http
  POST /jobs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url`     | `string` | **Required**. Web page URL |

Using cURL:
```bash
curl --location 'localhost:3000/jobs' \
--header 'Content-Type: application/json' \
--data '{
    "url": "https://text.npr.org/nx-s1-5141959"
}'
```

### Get all the processed jobs

![get all job](https://github.com/sharkmaster999/web-scrapper-app/blob/master/images/get-all-jobs.png?raw=true)

#### Request:

```http
  GET /jobs
```

Using cURL:
```bash
curl --location 'localhost:3000/jobs'
```

## Libraries Used

- **ExpressJS**: Fast, unopinionated, minimalist web framework for Node.js.
- **Sequelize**: ORM for managing database connections and models.
- **Cheerio**: The fast, flexible, and elegant library for parsing and manipulating HTML and XML.
- **OpenAI LLM**: A new series of AI models designed to spend more time thinking before they respond.
- **Claude LLM**: Is powerful and extensible, it’s also the most trustworthy and reliable AI available.
- **Hugging Face**
- **Nodemon**: Is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Support

For support, email remultasimpatiko@gmail.com.
