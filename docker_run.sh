docker run --rm -p 3000:3000 -e "CHOKIDAR_USEPOLLING=true" -v ${PWD}/src:/app/src tagging_app:latest

# docker build --rm -f "Dockerfile" -t tagging_app:latest .
 