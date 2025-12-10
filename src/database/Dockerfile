FROM postgres:18-alpine3.23

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=homelibrarydb

RUN set -eux; \
    addgroup -g 999 -S postgres; \
    adduser -u 999 -S -D -G postgres postgres

USER postgres

COPY ./database/init-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 5432

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD pg_isready -U postgres -d homelibrarydb || exit 1

CMD ["docker-entrypoint.sh", "postgres"]