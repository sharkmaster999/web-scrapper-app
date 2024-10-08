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

2. Install Docker and run this command:
   ```bash
   docker compose up

3. You can now use the web scrapper app via https://localhost:3000/jobs to create new web scrapping job.


## API Reference

#### Create new job

```http
  POST /jobs
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url`     | `string` | **Required**. Web page URL |

Returns the job queue information.

#### Get job status

```http
  GET /jobs
```

Gets all the jobs queued status.

## Database Connection Management

The app uses two primary functions to manage database connections namely `openConnection()` and `closeConnection()`

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
