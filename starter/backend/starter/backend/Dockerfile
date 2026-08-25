FROM python:3.10-slim
ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /
RUN useradd -u 1000 -m app

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  build-essential \
  libpq-dev \
  libffi-dev \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/www/app && chown -R app:app /var/www/app

RUN pip install --no-cache-dir pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --deploy

COPY . /app

USER app

CMD ["flask", "--app", "app:app", "run", "--host=0.0.0.0", "--port=5000"]