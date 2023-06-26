---
layout: post
title:  "Pulling an image with a digest: alternatives"
date:   2023-06-26 22:41:45
categories: images
tags: featured
---
>During my image signing endeavors, I realized that there are two ways of pulling an image with a digest. One of these ways might make things easier for some people, however, there are some gotchas. I thought I'd share this.

<h1>Disclaimer</h1>

The purpose of this blog post is not to explain how image signing works, and as a matter of fact, knowing such concept is somewhat of a requirement to understand what I will be talking about. If you are interested on that, please consider taking a look at [this really good explanation by Aqua](https://www.aquasec.com/cloud-native-academy/supply-chain-security/container-image-signing/).

<h1>Background</h1>

While trying to secure a platform, I was tasked with making sure all public images in the helm charts used where pulled/specified using an image digest e.g: `image@digest` instead of the typical tag syntax e.g: `image:tag`. While doing so, I thought I was going to be blocked due to some charts not having a way of letting consumers specify an image with `image@digest` for example, take a look at this [old version of the datadog helm chart.](https://github.com/DataDog/helm-charts/blob/datadog-2.27.3/charts/datadog/templates/_helpers.tpl#L242-L252) This helper function formats the image value for the deployment. There is no way of adding an image digest there, if passed it a digest, it would error out because it would render something like `myimage:@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8` or `myimage:sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8`, et al. All of which are invalid. At least that was what I thought so at the moment, I even made some [pull requests](https://github.com/DataDog/helm-charts/pull/715) that got merged addressing this issue. Then I realized that there is another option (better and correct), let me show this to you.

<h1>This is the *wae*</h1>

First of all, let me start by giving credit to the GitHub user that pointed this out during another PR I had made to solve the issue; sozercan. [This](https://github.com/open-policy-agent/gatekeeper/pull/2224#issuecomment-1217176749) is the comment where he pointed this out if you are interested.

Alright, enough suspence, the syntax is as follows:
`image:tag@digest`.
If you don't believe me, give this a try: `docker pull nginx:alpine3.17-slim@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8` with the container runtime of your choice. You can pull the image from the official Nginx Dockerhub page if you don't trust me: https://hub.docker.com/layers/library/nginx/alpine3.17-slim/images/sha256-668c78547b869678d6be5ba9121b95975eab6a2db78dd722c8fba346d15ed723?context=explore

The trick here is to make the digest part of the tag and not to read it as a different field. This allows greater flexibility and makes creating pull requests like the ones I made above redundant.
However, remember I said there where some gotchas? Let's discuss that next.

<h1>Gotchas</h1>

One thing I realized is that everything prior to the `@` and after the name is ignored when pulling the image. This means that the tag is completely for descriptive purposes. Take a look at the following example:

First we pull the image with the "normal" way of pulling an image with a digest and take a look at the image size:
```
->docker pull nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8 
docker.io/library/nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8: Pulling from library/nginx
f56be85fc22e: Pull complete 
97c80f11709c: Pull complete 
afb503c1f124: Pull complete 
f8c948b732dd: Pull complete 
d021bba29710: Pull complete 
cadcca1af197: Pull complete 
Digest: sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Status: Downloaded newer image for nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
docker.io/library/nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8

->docker image ls
REPOSITORY   TAG            IMAGE ID       CREATED                  SIZE
nginx        <none>         847ca694b10d   Less than a second ago   11.8MB
```
Then we remove the image and pull it with the same image name, a nonexistent tag, and the correct image digest.
```
->docker image rm 847ca694b10d        
Untagged: nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Deleted: sha256:847ca694b10dddf8f35021400889fbf45dade550b223a0cae01d55623026d230
Deleted: sha256:48e01136a4fe25c5cdcc1aa6c5c4bdedfbecc1725ff53972e7327c36c4323c8e
Deleted: sha256:34325996f3c88e4aa749af90c2ae68985ff3ba7e530b07a54f73c6dbfaad2f39
Deleted: sha256:063d62e474734c802a5b3443a8ee8b365cc914771c6ce98f94a8ce003dce96d8
Deleted: sha256:6044cb9ca9f9c6b001c626536bba1d45e96dcd9bff5b35232201c52010047cdf
Deleted: sha256:7e6c041bf6dfaff2f3084f510f9ce4803c5c6916554533816c0b774f48bd563f
Deleted: sha256:f1417ff83b319fbdae6dd9cd6d8c9c88002dcd75ecf6ec201c8c6894681cf2b5
->docker image ls             
REPOSITORY   TAG            IMAGE ID       CREATED         SIZE
->docker pull nginx:imadethistag@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
docker.io/library/nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8: Pulling from library/nginx
f56be85fc22e: Pull complete 
97c80f11709c: Pull complete 
afb503c1f124: Pull complete 
f8c948b732dd: Pull complete 
d021bba29710: Pull complete 
cadcca1af197: Pull complete 
Digest: sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Status: Downloaded newer image for nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
docker.io/library/nginx:imadethistag@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
->docker image ls             
REPOSITORY   TAG            IMAGE ID       CREATED                  SIZE
nginx        <none>         847ca694b10d   Less than a second ago   11.8MB
```
As you can see, we have the same image ID, same image size, and no tag for both scenarios. This is because everything before the tag is being ignored in favor of using the image digest as the source of truth for the authenticity of the image.

Let us remove the image and then take a look at trying to use the correct digest but a random name:
```
->docker image rm 847ca694b10d
Untagged: nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Deleted: sha256:847ca694b10dddf8f35021400889fbf45dade550b223a0cae01d55623026d230
Deleted: sha256:48e01136a4fe25c5cdcc1aa6c5c4bdedfbecc1725ff53972e7327c36c4323c8e
Deleted: sha256:34325996f3c88e4aa749af90c2ae68985ff3ba7e530b07a54f73c6dbfaad2f39
Deleted: sha256:063d62e474734c802a5b3443a8ee8b365cc914771c6ce98f94a8ce003dce96d8
Deleted: sha256:6044cb9ca9f9c6b001c626536bba1d45e96dcd9bff5b35232201c52010047cdf
Deleted: sha256:7e6c041bf6dfaff2f3084f510f9ce4803c5c6916554533816c0b774f48bd563f
Deleted: sha256:f1417ff83b319fbdae6dd9cd6d8c9c88002dcd75ecf6ec201c8c6894681cf2b5

->docker pull imadethisimagename:imadethisimagetag@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Error response from daemon: pull access denied for imadethisimagename, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
```
As you can see, this will not work as docker does not know what image to pull, in fact, it is trying to pull from a registry that I do not have access to, this is because it is not pointing to the nginx image I want.

Now, let us try the same thing but with a random name and the correct digest only:
```
docker pull imadewhateverthisis@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Error response from daemon: pull access denied for imadewhateverthisis, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
```
As you can see we get the same behaviour where it doesn't know what to pull, so we get an access denied.

One thing to note is that if we have the image already stored (by pulling with the correct syntax), and we try one of the two examples presented above, it might be able to pull the image, but produce some erratic behaviour like creating a copy of the image with a different name because it thinks it is a 'newer copy'.
```
->docker pull nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8 
docker.io/library/nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8: Pulling from library/nginx
f56be85fc22e: Pull complete 
97c80f11709c: Pull complete 
afb503c1f124: Pull complete 
f8c948b732dd: Pull complete 
d021bba29710: Pull complete 
cadcca1af197: Pull complete 
Digest: sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Status: Downloaded newer image for nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
docker.io/library/nginx@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
->docker pull a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8    
docker.io/library/a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8: Pulling from library/a
Digest: sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Status: Downloaded newer image for a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
docker.io/library/a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
->docker pull a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8    
docker.io/library/a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8: Pulling from library/a
Digest: sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
Status: Downloaded newer image for a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
docker.io/library/a@sha256:571e8424ffec6d208ae90e6a917b1327c2e352317e09301c982d72031cd52cb8
->docker image ls
REPOSITORY   TAG            IMAGE ID       CREATED                  SIZE
a            <none>         847ca694b10d   Less than a second ago   11.8MB
nginx        <none>         847ca694b10d   Less than a second ago   11.8MB
```
The best thing to do is to avoid this type of syntax as it can be inconsistent and stick to the "correct" ways of pulling the image.

<h1>Conclusion</h1>

There are several ways to pull an image using a digest vs a tag. Both digest and tag can be used at the same time if desired, however, the digest will be for informational purposes only. This (`image:tag@digest`) syntax might be the best way of pulling images if you are using something like GitOps so that you know what image tag the digest belongs to, but again, the source of truth will always be the digest field. If you think having the tag there is redundant, you can always stick to `image@digest`. For helm users, if your helm chart has logic to support tags, stick to the `image:tag@digest` syntax as it will work with the existent implementation and will still use the digest to determine which image to pull/use.