# Axios Interceptor

## Branch Guide
- `main` : Project starter. Consist of necessary files to run the project without FE BE integration.
- `solution` : Solution of the project. Consist of integrated FE BE project.

## Installation Guide
- **FE** : Please run `npm i` then `npm run dev`
- **BE** :
    - Run `npm i`
    - Copy `.env.development` and rename it to `.env`. Fill with your own config
    - Mine is using **docker** to deploy the entire environment, including the MongoDB. To run the environment using docker please run `docker compose up -d`.