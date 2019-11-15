FROM pypy:3

COPY . /app
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
ENTRYPOINT ["pypy3"]
CMD ["app.py"]
