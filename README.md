## VIT BFHL – Node.js (Express) Implementation

This project implements the Bajaj Finserv Health Ltd (BFHL) API assignment using Node.js (Express) and deployed on Vercel.
It processes input arrays to classify numbers, alphabets, and special characters, while also computing sums and concatenated strings.

## Live API

Base URL:

https://bajaj-full-stack-hy07ascct-dileesha8s-projects.vercel.app

Endpoint:

POST /bfhl

## How to Run Locally

Clone Repo

git clone <your-repo-url>
cd bfhl-api


## Setup Environment Variables

Create a .env file:

FULL_NAME=dileeshaa
DOB_DDMMYYYY=03122004
EMAIL=dileesha.a2022@vitstudent.ac.in
ROLL_NUMBER=22BCI0131

Run Server

npm run dev

## API will be available at:

http://localhost:3000/bfhl

## Deployment (Vercel)

Push repo to GitHub.
On Vercel:
Import project from GitHub.

Add Environment Variables:
FULL_NAME
DOB_DDMMYYYY
EMAIL
ROLL_NUMBER
## Example Request

POST /bfhl

{
  "data": ["a","1","334","4","R","$"]
}


## Response:

{
  "is_success": true,
  "user_id": "dileeshaa_03122004",
  "email": "dileesha.a2022@vitstudent.ac.in",
  "roll_number": "22BCI0131",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}

 ## Testing Screenshots
<img width="1913" height="127" alt="image" src="https://github.com/user-attachments/assets/175f01d6-28e8-4a84-9846-31cdd66e315b" />
<img width="1705" height="661" alt="image" src="https://github.com/user-attachments/assets/cc18223a-a0ba-42cf-9b34-544fa3f327d2" />
<img width="789" height="380" alt="image" src="https://github.com/user-attachments/assets/f0aac845-e980-41de-b469-6cf70a67f16a" />


## Tech Stack

Node.js (Express)
Vercel (Deployment)
