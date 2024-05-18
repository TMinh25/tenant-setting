###############
### STAGE 1: Build ###
###############
FROM public.ecr.aws/docker/library/node:18.18.2-slim as builder
# FROM registry.redhat.io/rhel8/nodejs-18-minimal:latest as builder
WORKDIR /usr/src/app
ARG BASE_HREF_ARG=${BASE_HREF}
COPY .npmrc .
COPY package.json .
RUN npm i
# RUN chmod u+x /usr/src/app
COPY . .
RUN npm run build:single-spa:tenant-setting

##############
## STAGE 2: Serve app with nginx ###
##############
FROM public.ecr.aws/nginx/nginx-unprivileged:latest as deployer
# FROM registry.access.redhat.com/ubi9/nginx-120:latest as deployer
COPY --from=builder /usr/src/app/dist/tenant-setting /usr/share/nginx/html
COPY --from=builder /usr/src/app/default.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "exec nginx -g 'daemon off;'"]