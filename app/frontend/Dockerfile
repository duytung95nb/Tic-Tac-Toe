FROM nginx
RUN echo ${PWD} && ls -lR
RUN sleep infinite
RUN exit 1
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]