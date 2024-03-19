# Agile Ticket Description Generator

An application that leverages Generative AI to write description for Agile tickets.

## Usage

### Prerequisites

In order to package your dependencies locally with `serverless-python-requirements`, you need to have `Python3.9` installed locally. You can create and activate a dedicated virtual environment with the following command:

```bash
python3.9 -m venv ./venv
source ./venv/bin/activate
```

Alternatively, you can also use `dockerizePip` configuration from `serverless-python-requirements`. For details on that, please refer to corresponding [GitHub repository](https://github.com/UnitedIncome/serverless-python-requirements).

### Deployment

This example is made to work with the Serverless Framework dashboard, which includes advanced features such as CI/CD, monitoring, metrics, etc.

In order to deploy with dashboard, you need to first login with:

```
serverless login
```

install dependencies with:

```
npm install
```

and

```
pip install -r requirements.txt
```

and then perform deployment with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-python-flask-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-python-flask-api-project-dev (182s)

endpoint: ANY - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-python-flask-api-project-dev-api (1.5 MB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

### Local development

Thanks to capabilities of `serverless-wsgi`, it is also possible to run your application locally, however, in order to do that, you will need to first install `werkzeug` dependency, as well as all other dependencies listed in `requirements.txt`. It is recommended to use a dedicated virtual environment for that purpose. You can install all needed dependencies with the following commands:

```bash
pip install werkzeug
pip install -r requirements.txt
```

At this point, you can run your application locally with the following command:

```bash
serverless wsgi serve
```

For additional local development capabilities of `serverless-wsgi` plugin, please refer to corresponding [GitHub repository](https://github.com/logandk/serverless-wsgi).

### Local Development for UI

The user interface (UI) code is located within the `ui/` directory and has been implemented using React.

```bash
cd ui
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file with the format provided in `ui/.env.local.example` and provide the necessary details

Start application

```bash
npm run dev
```

### Deployment for UI

Build the application in `ui/` directory

```bash
npm run build
```

Navigate to root directory and deploy

```bash
sls client deploy -c serverless_ui.yml
```
