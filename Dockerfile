FROM ruby:2.7.5-buster

WORKDIR /src/app

COPY . .

RUN bundle install

CMD ["bundle", "exec", "jekyll", "serve", "0.0.0.0"]